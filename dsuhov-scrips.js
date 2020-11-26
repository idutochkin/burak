window.document.addEventListener("DOMContentLoaded", function () {
  const photoEL = document.querySelector(".ds_main__img");
  const downlEl = document.querySelector(".ds_download-btn");

  const imgUrl = localStorage.getItem("photoUrl");

  if (imgUrl) {
    photoEL.src = imgUrl;
    downlEl.setAttribute("href", imgUrl);
  }

  var shareItems = document.querySelectorAll(".social_share");
  JSShare.options.url = "https://generous-tuesday.labado.bizml.ru/";
  for (var i = 0; i < shareItems.length; i += 1) {
    shareItems[i].addEventListener("click", function share(e) {
      return JSShare.go(this);
    });
  }
});
