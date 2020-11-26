function  loadFiles () {
  const formThanks = document.querySelector("#thanks");
  const fileThanks = formThanks.querySelector('[type="file"]');

  fileThanks.addEventListener("change", async function(e) {
    const body = new FormData();
    body.append('photo', e.target.files[0]);
    const response = await fetch('https://generous-tuesday.labado.bizml.ru/api/v1/photos', {
      method: 'POST',
      body,
    });
    const myJson = await response.json();
    console.log(myJson)
    const r = await fetch(
      `https://generous-tuesday.labado.bizml.ru/api/v1/donations/${localStorage.getItem('generousId')}/photo`,
      {
        method: "POST",
        body: JSON.stringify({
          photoUrl: myJson.url,
          key: localStorage.getItem('generousKey') ,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((err) => console.log(err));
    console.log(r);
    window.location.href = "photo-share.html";
  });
}
 
loadFiles();
