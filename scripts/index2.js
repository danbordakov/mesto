const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonNewItem = document.querySelector('.profile__add-button');
const popupEditInfo = document.querySelector('.popup_type_editinfo');
const popupNewItem = document.querySelector('.popup_type_newitem');
const popupFullview = document.querySelector('.popup_type_fullview');
const buttonCloseEditInfo = popupEditInfo.querySelector('.popup__button-close_type_editinfo');
const buttonCloseNewItem = popupNewItem.querySelector('.popup__button-close_type_newitem');
const buttonCloseFullview = popupFullview.querySelector('.popup__button-close_type_fullview');
const buttonCreateNewItem = popupNewItem.querySelector('.popup__button-submit_type_create');
const buttonSubmit = popupEditInfo.querySelector('.popup__button-submit_type_save');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
const nameMain = document.querySelector('.profile__name');
const jobMain = document.querySelector('.profile__description');

const formEditInfo = popupEditInfo.querySelector('.popup__form');
const inputName = formEditInfo.querySelector('.popup__field_type_name');
const inputJob = formEditInfo.querySelector('.popup__field_type_job');
const formNewItem = popupNewItem.querySelector('.popup__form_type_newitem');
const inputItemName = formNewItem.querySelector('.popup__field_type_newitem-name');
const inputItemLink = formNewItem.querySelector('.popup__field_type_newitem-link');

//вставка первых карточек
initialCards.forEach(function(card) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__description').textContent = card.name;
  element.querySelector('.element__button-like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__button-like_active');
  });
  element.querySelector('.element__button-trash').addEventListener('click', function(){
    element.remove();
  });
  element.querySelector('.element__image').addEventListener('click', () => openFullviewImage(card.name, card.link));
  elements.append(element);
});

// function openFullviewImage(cardname, cardlink){
//   popupFullview.classList.add('popup_opened');
//   popupFullview.querySelector('.popup__image').src = cardlink;
//   popupFullview.querySelector('.popup__image-name').textContent = cardname;
// }

//добавление новых карточек
// function createNewCard(evt) {
//   evt.preventDefault();
//   if ((inputItemLink.value === '') && (inputItemName.value === '')) {
//     closePopup(popupNewItem);
//   } else {
//     const element = elementTemplate.querySelector('.element').cloneNode(true);
//     element.querySelector('.element__image').src = inputItemLink.value;
//     element.querySelector('.element__description').textContent = inputItemName.value;
//     element.querySelector('.element__button-like').addEventListener('click', function(evt){
//       evt.target.classList.toggle('element__button-like_active');
//     });
// deleteCard(element);
//     element.querySelector('.element__image').addEventListener('click', () => openFullviewImage(element.querySelector('.element__description').textContent, element.querySelector('.element__image').src));
//     elements.prepend(element);
//     inputItemLink.value = '';
//     inputItemName.value = '';
//     closePopup(popupNewItem);
//   }
// }
function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  inputName.value = nameMain.textContent;
  inputJob.value = jobMain.textContent;
}
function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
}
function createCard(card, evt) {
  evt.preventDefault();
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
  element.querySelector('.element__image').alt = card.name;
  element.querySelector('.element__description').textContent = cardName;
  likeCard(element);
  deleteCard(element);
  return element;
}
function deleteCard(card){
  card.querySelector('.element__button-trash').addEventListener('click', function(){
    element.remove();
  });
}
function likeCard(card){
  card.querySelector('.element__button-like').addEventListener('click', evt => evt.target.classList.toggle('element__button-like_active'));
}
function addCard(container, card) {
  container.prepend(createCard(card));
}
function handleProfileFormSubmit(ev) {
  ev.preventDefault();
  nameMain.textContent = inputName.value;
  jobMain.textContent = inputJob.value;
  closePopup(popupEditInfo);
}

buttonNewItem.addEventListener('click', () => openPopup(popupNewItem));
buttonCloseNewItem.addEventListener('click', () => closePopup(popupNewItem));
buttonEditInfo.addEventListener('click', () => openPopup(popupEditInfo));
buttonCloseEditInfo.addEventListener('click', () => closePopup(popupEditInfo));
buttonCloseFullview.addEventListener('click', () => closePopup(popupFullview));
formNewItem.addEventListener('submit', createNewCard);
formEditInfo.addEventListener('submit', handleProfileFormSubmit);
