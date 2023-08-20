import initialCards from "./initialcards.js";
import config from "./constants.js";
import Card from "./Cards.js";
import FormValidator from "./FormValidator.js"

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
 
const inputName = formEditInfo.querySelector('.popup__field_type_name'); 
const inputJob = formEditInfo.querySelector('.popup__field_type_job'); 
const nameMain = document.querySelector('.profile__name'); 
const jobMain = document.querySelector('.profile__description');
const inputNewItemName = formNewItem.querySelector('.popup__field_type_newitem-name');
const inputNewItemLink = formNewItem.querySelector('.popup__field_type_newitem-link');

const elements = document.querySelector('.elements');

//открытие форм + слушатели на закрытие окон по esc или щелчку в оверлее
export function openPopup(popupType) { 
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
  validation_editinfo.disabledButtonState();
}

//изменение данных пользователя через форму
function handleEditInfoSubmit (evt) { 
  evt.preventDefault(); 
  nameMain.textContent = inputName.value; 
  jobMain.textContent = inputJob.value; 
  closePopup(popupEditInfo); 
}
//-------------------------------------------------------------------------------------------------------------------------
//функция инстанцирования класса Card
function instantiationCard(cardName, cardLink, templateSelector) {
  const card = new Card(cardName, cardLink, templateSelector);
  return card;
}

//функция добавления первых карточек из массива
initialCards.forEach((item) => {
  elements.append(instantiationCard(item.name, item.link, '#element-template').createCard());
});

//добавление новой карточки через форму
function handleNewItemSubmit(evt) {
  evt.preventDefault();
  elements.prepend(instantiationCard(inputNewItemName.value, inputNewItemLink.value, '#element-template').createCard());
  closePopup(popupNewItem);
  formNewItem.reset();
  validation_newitem.disabledButtonState();
}

buttonEditInfo.addEventListener('click', openPopupEditInfo); 
buttonCloseEditInfo.addEventListener('click', ()=>closePopup(popupEditInfo));
buttonNewItem.addEventListener('click', ()=>openPopup(popupNewItem));
buttonCloseNewItem.addEventListener('click', ()=>closePopup(popupNewItem));
buttonCloseFullview.addEventListener('click', ()=>closePopup(popupFullview));
formEditInfo.addEventListener('submit', handleEditInfoSubmit);
formNewItem.addEventListener('submit', handleNewItemSubmit);

//валидации
const validation_editinfo = new FormValidator(config, '.popup__form_type_editinfo');
validation_editinfo.enableValidation();
const validation_newitem = new FormValidator(config, '.popup__form_type_newitem');
validation_newitem.enableValidation();