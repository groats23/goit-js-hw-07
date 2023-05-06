import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const picturesMarkup = createPicturesMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', picturesMarkup);
galleryContainer.addEventListener('click', onPictureClick);

function createPicturesMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<ul class="gallery__item">
            <a class="gallery__link" href="${original}">
               <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
            </a>
        </ul>`;
    })
    .join('');
}

function onPictureClick(evt) {
  evt.preventDefault();
  const isPicture = evt.target.classList.contains('gallery__image');
  if (!isPicture) {
    return;
  }

  const originalImg = evt.target.dataset.source;
  modalInteraction(originalImg);
}

function modalInteraction(image) {
  const instance = basicLightbox.create(
    `<img src="${image}" width="800" height="600" />`,
    {
      onShow: instance => {
        window.addEventListener('keydown', closeModal);
      },
      onClose: instance => {
        window.removeEventListener('keydown', closeModal);
      },
    }
  );
  instance.show();

  function closeModal(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }
}
