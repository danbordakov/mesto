const popupEditInfo = document.querySelector('.popup_type_editinfo');
const formEditInfo = popupEditInfo.querySelector('.popup__form');
const popupNewItem = document.querySelector('.popup_type_newitem');
const formNewItem = popupNewItem.querySelector('.popup__form');
const popupFullview = document.querySelector('.popup_type_fullview');

const buttonEditInfo = document.querySelector('.profile__edit-button'); 
const buttonCloseEditInfo = popupEditInfo.querySelector('.popup__button-close');
const buttonNewItem = document.querySelector('.profile__add-button');
const buttonCloseNewItem = popupNewItem.querySelector('.popup__button-close');  
const buttonCloseFullview = popupFullview.querySelector('.popup__button-close');
const buttonCreateNewItem = document.querySelector('.popup__button-submit_type_create');
const buttonSaveEditedInfo = document.querySelector('.popup__button-submit_type_save');
 
const inputName = formEditInfo.querySelector('.popup__field_type_name'); 
const inputJob = formEditInfo.querySelector('.popup__field_type_job'); 
const nameMain = document.querySelector('.profile__name'); 
const jobMain = document.querySelector('.profile__description');
const inputNewItemName = formNewItem.querySelector('.popup__field_type_newitem-name');
const inputNewItemLink = formNewItem.querySelector('.popup__field_type_newitem-link');

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');
const imageFullview = popupFullview.querySelector('.popup__image');
const nameFullview = popupFullview.querySelector('.popup__image-name');

//открытие форм + слушатели на закрытие окон по esc или щелчку в оверлее
function openPopup(popupType) { 
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popupType.addEventListener('click', closePopupByOverlayClick);
}

function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.currentTarget);
  }
}

//закрытие форм
function closePopup(popupType) { 
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popupType.removeEventListener('click', closePopupByOverlayClick);
}

//открытие формы профиля с заполненными данными
function openPopupEditInfo(){
  openPopup(popupEditInfo);
  inputName.value = nameMain.textContent; 
  inputJob.value = jobMain.textContent;
  buttonSaveEditedInfo.classList.add('popup__button-submit_type_unenabled');
  buttonSaveEditedInfo.disabled = true;
}

//изменение данных пользователя через форму
function handleEditInfoSubmit (evt) { 
  evt.preventDefault(); 
  nameMain.textContent = inputName.value; 
  jobMain.textContent = inputJob.value; 
  closePopup(popupEditInfo); 
}

//функция создания карточки
function createCard(cardName, cardLink){
  const card = elementTemplate.querySelector('.element').cloneNode(true);
  card.querySelector('.element__image').src = cardLink;
  card.querySelector('.element__image').alt = cardName;
  card.querySelector('.element__description').textContent = cardName;
  card.querySelector('.element__button-like').addEventListener('click', likeCard);
  card.querySelector('.element__button-trash').addEventListener('click', () => deleteCard(card));
  card.querySelector('.element__image').addEventListener('click', () => openFullviewImage(cardName, cardLink));
  return card;
}

//функция добавления карточки на страницу
function addCard(cardCreation){
  elements.prepend(cardCreation);
}

//добавление первых карточек по умолчанию
initialCards.forEach(function(card){
  addCard(createCard(card.name, card.link));
});

//добавление новой карточки через форму
function handleNewItemSubmit(evt) {
  evt.preventDefault();
  addCard(createCard(inputNewItemName.value, inputNewItemLink.value));
  closePopup(popupNewItem);
  formNewItem.reset();
  buttonCreateNewItem.classList.add('popup__button-submit_type_unenabled');
  buttonCreateNewItem.disabled = true;
}

//функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

//функция удаления карточки
function deleteCard(card){
  card.remove();
}

//функция открытия полного изображения
function openFullviewImage(cardName, cardLink){
  imageFullview.src = cardLink;
  imageFullview.alt = cardName;
  nameFullview.textContent = cardName;
  openPopup(popupFullview);
}

buttonEditInfo.addEventListener('click', openPopupEditInfo); 
buttonCloseEditInfo.addEventListener('click', ()=>closePopup(popupEditInfo));
buttonNewItem.addEventListener('click', ()=>openPopup(popupNewItem));
buttonCloseNewItem.addEventListener('click', ()=>closePopup(popupNewItem));
buttonCloseFullview.addEventListener('click', ()=>closePopup(popupFullview));
formEditInfo.addEventListener('submit', handleEditInfoSubmit);
formNewItem.addEventListener('submit', handleNewItemSubmit);
enableValidation(config); 