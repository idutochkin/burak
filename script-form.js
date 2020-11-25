// form-page script

const form = document.querySelector("#form");
const name = form.querySelector('[type="text"]');
const amount = form.querySelectorAll('[type="radio"]');
const otherAmount = form.querySelector('[type="number"]');
const email = form.querySelector('[type="email"]');
const submit = form.querySelector('[type="submit"]');

function clearText(node) {
  const text = node.nextElementSibling;
  if (node.value) {
    text.style.display = "none";
  } else {
    text.style.display = "block";
  }
}

function handleForm() {
  amount.forEach((item) => {
    item.addEventListener("change", function () {
      if (item.checked) {
        otherAmount.value = "";
        clearText(otherAmount);
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

  function getAmount() {
    return [...amount].find((item) => item.checked)?.value;
  }

  submit.addEventListener("click", function (e) {
    if (email.value && name.value && (otherAmount.value || getAmount())) {
      e.preventDefault();
      pay();
    }
  });

  this.pay = async function () {
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

    var widget = new cp.CloudPayments();
    widget.pay(
      "auth", // или 'charge'
      {
        //options
        publicId: donation.id, //id из личного кабинета
        description: "Оплата товаров в example.com", //назначение
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
          console.log("success");
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
          window.location.href = "URL2";
        },
        onFail: async function (reason, options) {
          // fail
          console.log("fail");
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
          window.location.href = "/pages/form.html";
        },
        onComplete: function (paymentResult, options) {
          console.log("complete");
        },
      }
    );
  };
}

handleForm();
