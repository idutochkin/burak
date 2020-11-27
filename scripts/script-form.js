// form-page script

const form = document.querySelector("#form");
const name = form.querySelector('[type="text"]');
const amount = form.querySelectorAll('[type="radio"]');
const otherAmount = form.querySelector('[type="number"]');
const email = form.querySelector('[type="email"]');
const submit = form.querySelector('[type="submit"]');
const check = form.querySelector('[type="checkbox"]');

function clearText(node) {
  const text = node.nextElementSibling;
  text.style.display = "none";
}

function visibleText(node) {
  const text = node.nextElementSibling;
  if (!node.value) text.style.display = "block";
}

function handleForm() {
  amount.forEach((item) => {
    item.addEventListener("change", function () {
      if (item.checked) {
        otherAmount.value = "";
        clearText(otherAmount);
        otherAmount.removeAttribute('required')
      }
    });
  });

  otherAmount.addEventListener("input", function () {
    clearText(otherAmount);
    amount.forEach((item) => {
      item.checked = false;
    });
  });

  email.addEventListener("input", () => clearText(email));
  name.addEventListener("input", () => clearText(name));
  email.addEventListener("focus", () => clearText(email));
  name.addEventListener("focus", () => clearText(name));
  otherAmount.addEventListener("focus", () => clearText(otherAmount));
  email.addEventListener("focusout", () => visibleText(email));
  name.addEventListener("focusout", () => visibleText(name));
  otherAmount.addEventListener("focusout", () => visibleText(otherAmount));

  function getAmount() {
    return [...amount].find((item) => item.checked)?.value;
  }

  submit.addEventListener("click", function (e) {
    
    if(!otherAmount.value && !getAmount()){
      otherAmount.setAttribute('required', true)
    }
    if (email.value && name.value && check.checked && (otherAmount.value || !!getAmount())) {
      e.preventDefault();
      pay();
    }
  });

  const pay = async function () {
    const donation = await fetch(
      "https://generous-tuesday.labado.bizml.ru/api/v1/donations",
      {
        method: "POST",
        body: JSON.stringify({
          fullName: name.value,
          email: email.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((err) => console.log(err));
      
    localStorage.setItem('generousId', donation.cloudPaymentsInvoiceId) 
    localStorage.setItem('generousKey', donation.key) 

    const widget = new cp.CloudPayments();
    widget.pay(
      "auth", // или 'charge'
      {
        //options
        publicId: "pk_5571843ab94c9ab9adcf23ff59560", //id из личного кабинета
        description: "Пожертвование в благотворительный фонд 'Дорога Жизни'", //назначение
        amount: getAmount() ? +getAmount() : parseFloat(+otherAmount.value), //сумма
        currency: "RUB", //валюта
        invoiceId: donation.cloudPaymentsInvoiceId, //номер заказа  (необязательно)
        accountId: email.value, //идентификатор плательщика (необязательно)
        skin: "mini", //дизайн виджета (необязательно)
        data: {},
      },
      {
        onSuccess: async function (options) {
          // success
          console.log("onSuccess", options);
          const r = await fetch(
            `https://generous-tuesday.labado.bizml.ru/api/v1/donations/${donation.cloudPaymentsInvoiceId}/is-complete`,
            {
              method: "POST",
              body: JSON.stringify({
                key: donation.key,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .catch((err) => console.log(err));
          console.log(r);
          window.location.href = "thanks.html";
        },
        onFail: async function (reason, options) {
          // fail
          console.log("onFail", reason, options);
          const r = await fetch(
            `https://generous-tuesday.labado.bizml.ru/api/v1/donations/${donation.cloudPaymentsInvoiceId}/is-complete`,
            {
              method: "POST",
              body: JSON.stringify({
                key: donation.key,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .catch((err) => console.log(err));
          console.log(r);
          window.location.href = "form.html";
        },
        onComplete: function (paymentResult, options) {
          console.log("onComplete", paymentResult, options);
        },
      }
    );
  };
}

handleForm();
