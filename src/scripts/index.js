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

//форма правки профиля через прослойки PopupWithForm и UserInfo
const userInfo = new UserInfo({
  nameSelector: 'profile__name',
  jobSelector: 'profile__description'
});

const popupEditInfo = new PopupWithForm('.popup_type_editinfo', () => {
  userInfo.setUserInfo(inputName.value, inputJob.value);
});

buttonEditInfo.addEventListener('click', () => {
  popupEditInfo.open();
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().job;
  validationEditInfo.disabledButtonState();
});

popupEditInfo.setEventListeners();

//форма новой карточки через прослойку PopupWithForm
const popupNewItem = new PopupWithForm('.popup_type_newitem', () => {
  cardsList
  .setItem(instantiateCard(inputNewItemName.value, inputNewItemLink.value, '#element-template')
  .createCard());
});

buttonNewItem.addEventListener('click', () => {
  popupNewItem.open();
  validationNewItem.disabledButtonState();
});

popupNewItem.setEventListeners();

//открытие полного изображения по клику на картинку
const popupFullView = new PopupWithImage('.popup_type_fullview');
popupFullView.setEventListeners();

//инстанцирование класса Card
function instantiateCard(cardName, cardLink, templateSelector) {
  const card = new Card(cardName, cardLink, templateSelector, () => popupFullView.open(cardLink, cardName));
  return card;
}

//добавление первых карточек из массива через прослойку Section
const cardsList = new Section({
  items: initialCards,
  renderer: ((card) => {
    cardsList
    .setItem(instantiateCard(card.name, card.link, '#element-template')
    .createCard());
  })
}, '.elements');
cardsList.addItem();

//валидации
const validationEditInfo = new FormValidator(config, '.popup__form_type_editinfo');
validationEditInfo.enableValidation();
const validationNewItem = new FormValidator(config, '.popup__form_type_newitem');
validationNewItem.enableValidation();