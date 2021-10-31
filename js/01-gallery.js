import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createCardsMarkup(cards) {
  return cards
    .map(({ preview, original, description }, index) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            data-index="${index}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

const options = {
  onShow: () => {
    window.addEventListener("keydown", pressKey);
  },
  onClose: () => {
    window.removeEventListener("keydown", pressKey);
  },
};

let currentIndex = 0;

const instance = basicLightbox.create(
  `
    <img src="" width="800" height="600">
`,
  options
);

function onGalleryContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  currentIndex = Number(event.target.dataset.index);
  setLargeImg(event.target.dataset.source);
  instance.show();
}

function pressKey({ key }) {
  // if (event.key === "Escape") {
  //   instance.close();
  // }
  // if (event.key === "ArrowRight") {
  //   console.log("right");
  //   currentIndex += 1;
  //   if (currentIndex >= galleryItems.length) {
  //     currentIndex = 0;
  //   }
  //   instance.element().querySelector("img").src =
  //     galleryItems[currentIndex].original;
  // }
  // if (event.key === "ArrowLeft") {
  //   console.log("left");
  //   currentIndex -= 1;
  //   if (currentIndex < 0) {
  //     currentIndex = galleryItems.length - 1;
  //   }
  //   instance.element().querySelector("img").src =
  //     galleryItems[currentIndex].original;
  // }

  switch (key) {
    case "ArrowRight":
      currentIndex += 1;
      if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
      }
      setLargeImg(galleryItems[currentIndex].original);
      break;
    case "ArrowLeft":
      currentIndex -= 1;
      if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
      }
      setLargeImg(galleryItems[currentIndex].original);
      break;
    case "Escape":
      instance.close();
      break;
    default:
      alert("Warn");
  }
}

function setLargeImg(src) {
  instance.element().querySelector("img").src = src;
}
