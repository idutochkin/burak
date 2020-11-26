window.document.addEventListener("DOMContentLoaded", function () {
  const photoEL = document.querySelector(".ds_main__img");
  const downlEl = document.querySelector(".ds_download-btn");

  const imgUrl = localStorage.getItem("photoUrl");

  if (imgUrl) {
    photoEL.src = imgUrl;
    downlEl.setAttribute("href", imgUrl);
  }
});
