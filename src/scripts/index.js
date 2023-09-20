import config from "./constants.js";
import Card from "./components/Cards.js";
import FormValidator from "./components/FormValidator.js"
import Section from "./components/Section.js"; 
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithSubmit from "./components/PopupWithSubmit.js";
import API from "./components/API.js";
import '../pages/index.css';

const buttonEditInfo = document.querySelector('.profile__edit-button'); 
const buttonNewItem = document.querySelector('.profile__add-button');
const buttonChangeAvatar = document.querySelector('.profile__change-avatar-button');
const inputName = document.querySelector('.popup__field_type_name');
const inputJob = document.querySelector('.popup__field_type_job');
const inputAvatar = document.querySelector('.popup__field_type_avatar-link') 
const inputNewItemName = document.querySelector('.popup__field_type_newitem-name');
const inputNewItemLink = document.querySelector('.popup__field_type_newitem-link');

//подключение API
const optionsAPI = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-75',
  headers: {
    'Content-Type': "application/json",
    authorization: 'a2a69ffd-e2c7-4fe8-af8e-6275c8369475'
  }
}
const api = new API(optionsAPI);

//форма правки профиля через прослойки PopupWithForm и UserInfo
const userInfo = new UserInfo({
  nameSelector: 'profile__name',
  jobSelector: 'profile__description',
  avatarSelector: 'profile__avatar'
});

//стартовая выгрузка данных пользователя из БД
api.getUserInfo()
  .then((user) => {
userInfo.setUserInfo(user.name, user.about, user._id);
userInfo.setAvatar(user.avatar);
  })
  .catch((err) => {
    console.log(err);
  }); 

const popupEditInfo = new PopupWithForm('.popup_type_editinfo', () => {
  //отображение новых данных пользователя на странице
  userInfo.setUserInfo(inputName.value, inputJob.value);
  //загрузка новых данных пользователя в БД
  popupEditInfo.renderLoading(true, 'Сохранить', 'Сохранение...');
  api.setUserInfo({
    newName: inputName.value,
    newJob: inputJob.value
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupEditInfo.renderLoading(false, 'Сохранить', 'Сохранение...');
  })
  });

buttonEditInfo.addEventListener('click', () => {
  popupEditInfo.open();
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().job;
  validationEditInfo.disabledButtonState();
});

popupEditInfo.setEventListeners();

//форма редактирования аватара
const popupChangeAvatar = new PopupWithForm('.popup_type_avatar', () => {
  userInfo.setAvatar(inputAvatar.value);
  popupChangeAvatar.renderLoading(true, 'Сохранить', 'Сохранение...');
  api.setAvatar({
    newAvatar: inputAvatar.value
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupChangeAvatar.renderLoading(false, 'Сохранить', 'Сохранение...');
  })
});

buttonChangeAvatar.addEventListener('click', () => {
  popupChangeAvatar.open();
  validationChangeAvatar.disabledButtonState();
})

popupChangeAvatar.setEventListeners();

//форма новой карточки через прослойку PopupWithForm и отправка в БД
const popupNewItem = new PopupWithForm('.popup_type_newitem', () => {
  popupNewItem.renderLoading(true, 'Создать', 'Создание...');
  api.postNewCard({
    cardName: inputNewItemName.value,
    cardLink: inputNewItemLink.value
  })
  .then((card) => {
    cardsList
    .setNewItem(instantiateCard(card.name, card.link, card.likes.length, card._id, card.owner._id, userInfo.getUserInfo().id, card.likes.map(likes => likes._id), '#element-template')
    .createCard());
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupNewItem.renderLoading(false, 'Создать', 'Создание...');
  })
});

buttonNewItem.addEventListener('click', () => {
  popupNewItem.open();
  validationNewItem.disabledButtonState();
});

popupNewItem.setEventListeners();

//открытие полного изображения по клику на картинку
const popupFullView = new PopupWithImage('.popup_type_fullview');
popupFullView.setEventListeners();

const popupWithSubmit = new PopupWithSubmit('.popup_type_delete-confirm');
popupWithSubmit.setEventListeners();

//инстанцирование класса Card
function instantiateCard(cardName, cardLink, cardLikes, cardID, ownerID, myID, cardLikeID, templateSelector) {
  const card = new Card(
    cardName, cardLink, cardLikes, cardID, ownerID, myID, cardLikeID, templateSelector,
    () => popupFullView.open(cardLink, cardName),
    //--------handleDeleteCardClick------------
    () => {
      popupWithSubmit.detectCardID(cardID);
      popupWithSubmit.open();
      popupWithSubmit.formSubmitCallback(
        //--------link (formSubmit) ----------
        (id) => {
        api.deleteCard(id)
        .then(() => {
          card.delete();
        })
        .catch((err) => {
          console.log(err);
        }); 
      }
      //--------link (formSubmit) ----------
      )
    },
    //--------handleDeleteCardClick------------

    cardID => api.likeCard(cardID),
    cardID => api.dislikeCard(cardID),
);
  return card;
}


const cardsList = new Section({
  renderer: ((card) => {
    cardsList
    .setItem(instantiateCard(card.name, card.link, card.likes.length, card._id, card.owner._id, userInfo.getUserInfo().id, card.likes.map(likes => likes._id), '#element-template')
    .createCard());
  })
}, '.elements');

// добавление всех карточек из БД через прослойку Section
api.getAllCards()
  .then((cards) => {
    cardsList.addItem(cards)
  })
  .catch((err) => {
    console.log(err);
  }); 

//валидации
const validationEditInfo = new FormValidator(config, '.popup__form_type_editinfo');
validationEditInfo.enableValidation();
const validationNewItem = new FormValidator(config, '.popup__form_type_newitem');
validationNewItem.enableValidation();
const validationChangeAvatar = new FormValidator(config, '.popup__form_type_avatar');
validationChangeAvatar.enableValidation();