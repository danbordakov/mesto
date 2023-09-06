import initialCards from "./initialcards.js";
import config from "./constants.js";
import Card from "./components/Cards.js";
import FormValidator from "./components/FormValidator.js"
import Section from "./components/Section.js"; 
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import '../pages/index.css';

const buttonEditInfo = document.querySelector('.profile__edit-button'); 
const buttonNewItem = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__field_type_name');
const inputJob = document.querySelector('.popup__field_type_job'); 
const inputNewItemName = document.querySelector('.popup__field_type_newitem-name');
const inputNewItemLink = document.querySelector('.popup__field_type_newitem-link');
const nameMain = document.querySelector('.profile__name'); 
const jobMain = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');

//форма правки профиля через прослойку PopupWithForm
const popupEditInfo = new PopupWithForm('.popup_type_editinfo', () => {
  const editInfo = new UserInfo(inputName.value, inputJob.value);
  editInfo.setUserInfo();
});

buttonEditInfo.addEventListener('click', () => {
  popupEditInfo.open();
  const editInfo = new UserInfo(nameMain.textContent, jobMain.textContent);
  inputName.value = editInfo.getUserInfo().name;
  inputJob.value = editInfo.getUserInfo().job;
  console.log(inputName.value);
  validation_editinfo.disabledButtonState();
});

popupEditInfo.setEventListeners();

//форма новой карточки через прослойку PopupWithForm
const popupNewItem = new PopupWithForm('.popup_type_newitem', () => {
  elements
  .prepend(instantiationCard(inputNewItemName.value, inputNewItemLink.value, '#element-template')
  .createCard());
});

buttonNewItem.addEventListener('click', () => {
  popupNewItem.open();
  validation_newitem.disabledButtonState();
});

popupNewItem.setEventListeners();

//инстанцирование класса Card
function instantiationCard(cardName, cardLink, templateSelector) {
  const card = new Card(cardName, cardLink, templateSelector, () => {
    const popupFullView = new PopupWithImage('.popup_type_fullview');
    popupFullView.setEventListeners();
    popupFullView.open(cardLink, cardName);
  });
  return card;
}

//добавление первых карточек из массива через прослойку Section
const cardsList = new Section({
  items: initialCards,
  renderer: ((card) => {
    cardsList.setItem(instantiationCard(card.name, card.link, '#element-template').createCard());
  })
}, '.elements');
cardsList.addItem();

//валидации
const validation_editinfo = new FormValidator(config, '.popup__form_type_editinfo');
validation_editinfo.enableValidation();
const validation_newitem = new FormValidator(config, '.popup__form_type_newitem');
validation_newitem.enableValidation();