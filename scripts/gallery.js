

fetchGalleryItems();

function renderGallery(galleryItems){
  const galleryContent = document.querySelector(".gallery__content");

  if(!galleryItems.length){
    const noDataText = document.createElement('div');
    noDataText.innerHTML = `
      <div class="gallery--empty">
        <h4>Нет данных для отображения...</h4>
      </div>
    `;


   galleryContent.appendChild(noDataText);

   return;
  }

  const galleryBoxes = getGalleryBoxes(galleryItems);
  
  galleryBoxes.forEach(function(gItems, index){
    let rowNum = getRowNum(gItems);
    let rowHeight = getRowHeight();


    const galleryBox = document.createElement('div');
    galleryBox.classList.add("gallery__box");
    galleryBox.style.gridTemplateRows = `repeat(${rowNum}, ${rowHeight})`;
    galleryBox.accessKey = index.toString();

    gItems.forEach(function (gItem, index) {
      let itemTextClass = getGalleryItemTextClass(index);

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
}

function getRowNum(galleryItems) {
  if(document.documentElement.clientWidth <= 767){
    return Math.ceil(galleryItems.length / 2)
  }

  let rowNum = 1;
  if(galleryItems.length >= 3){
    rowNum = 2
  }

  if(galleryItems.length >= 4 ){
    rowNum = 3
  }

  if(galleryItems.length >= 7){
    rowNum = 4
  }

  return rowNum
}

function getGalleryItemTextClass(index) {
  let itemTextClass = "item__text--sm";

  if(document.documentElement.clientWidth <= 767){
    return itemTextClass
  }

  if((index + 1) === 3 || (index + 1) === 4){
    itemTextClass = "item__text--lg";
  }

  if((index + 1) === 7 || (index + 1) === 8 || (index + 1) === 9){
    itemTextClass = "item__text--md";
  }

  return itemTextClass;
}


function getRowHeight() {
  if(document.documentElement.clientWidth <= 767){
    return '139px'
  }

  return '295px'
}

function getGalleryBoxes(galleryItems) {
  let galleryBoxes = []
  if(document.documentElement.clientWidth <= 767){
    galleryBoxes = chunk(galleryItems, 8);
  } else {
    galleryBoxes = chunk(galleryItems, 9);
  }

  return galleryBoxes;
}


function chunk(arr, size) {
  if (size < 1) return [];

  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

function fetchGalleryItems(){
    request("donations")
      .then(function(response){
        renderGallery(response)
      }).catch(function (error) {
        console.log(error);
      });
}