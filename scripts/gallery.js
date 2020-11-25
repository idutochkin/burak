const galleryItems = [
  {
    id: new Date().toISOString(),
    fullName: "Александр",
    photoUrl: "img/gal-1.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр2",
    photoUrl: "img/gal-2.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр3",
    photoUrl: "img/gal-3.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр4",
    photoUrl: "img/gal-4.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр5",
    photoUrl: "img/gal-5.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр6",
    photoUrl: "img/gal-6.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр7",
    photoUrl: "img/gal-7.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр8",
    photoUrl: "img/gal-8.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр9",
    photoUrl: "img/gal-9.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр10",
    photoUrl: "img/gal-1.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр11",
    photoUrl: "img/gal-1.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр12",
    photoUrl: "img/gal-1.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр13",
    photoUrl: "img/gal-1.jpeg"
  },
  {
    id: new Date().toISOString(),
    fullName: "Александр14",
    photoUrl: "img/gal-1.jpeg"
  },
];

const galleryContent = document.querySelector(".gallery__content");

const galleryBoxes = chunk(galleryItems, 9);

galleryBoxes.forEach(function(gItems, index){
   let rowNum = 1;
   if(gItems.length >= 3){
     rowNum = 2
   }

   if(gItems.length >= 4 ){
     rowNum = 3
   }

   if(gItems.length >= 7){
     rowNum = 4
   }

   const galleryBox = document.createElement('div');
   galleryBox.classList.add("gallery__box");
   galleryBox.style.gridTemplateRows = `repeat(${rowNum}, 295px)`;
   galleryBox.accessKey = index.toString();

   gItems.forEach(function (gItem, index) {
     let itemTextClass = "item__text--sm";

     if((index + 1) === 3 || (index + 1) === 4){
        itemTextClass = "item__text--lg";
     }

     if((index + 1) === 7 || (index + 1) === 8 || (index + 1) === 9){
        itemTextClass = "item__text--md";
     }

     const galleryItem = `
        <figure class="gallery__item gallery__item--${index + 1}">
            <div class="item__text ${itemTextClass}">
                <span>${gItem.fullName}</span>
            </div>
            <img src=${gItem.photoUrl} alt="Gallery image ${index + 1}" class="gallery__img">
        </figure>
     `;

     galleryBox.innerHTML += galleryItem;
   })

   galleryContent.appendChild(galleryBox);
});


function chunk(arr, size) {
  if (size < 1) return [];

  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

