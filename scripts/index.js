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

const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');
const imageFullview = popupFullview.querySelector('.popup__image');
const nameFullview = popupFullview.querySelector('.popup__image-name');

function openPopup(popupType) { 
  popupType.classList.add('popup_opened'); 
  inputName.value = nameMain.textContent; 
  inputJob.value = jobMain.textContent; 
} 

function closePopup(popupType) { 
  popupType.classList.remove('popup_opened'); 
} 

//изменение данных пользователя через форму
function handleFormSubmit (evt) { 
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
  likeCard(card);
  deleteCard(card);
  openFullviewImage(card);
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
function addCardSubmit(evt) {
  evt.preventDefault();
  addCard(createCard(inputNewItemName.value, inputNewItemLink.value));
  closePopup(popupNewItem);
}

//функция лайка карточки
function likeCard(card){
  card.querySelector('.element__button-like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__button-like_active');
  });
}

//функция удаления карточки
function deleteCard(card){
  card.querySelector('.element__button-trash').addEventListener('click', function(){
    card.remove();
  });
}

//функция открытия полного изображения
function openFullviewImage(card){
  card.querySelector('.element__image').addEventListener('click', ()=>{
    openPopup(popupFullview);
    imageFullview.src = card.querySelector('.element__image').src;
    imageFullview.alt = card.querySelector('.element__image').src;
    nameFullview.textContent = card.querySelector('.element__description').textContent;
  });
}

buttonEditInfo.addEventListener('click', ()=>openPopup(popupEditInfo)); 
buttonCloseEditInfo.addEventListener('click', ()=>closePopup(popupEditInfo));
buttonNewItem.addEventListener('click', ()=>openPopup(popupNewItem));
buttonCloseNewItem.addEventListener('click', ()=>closePopup(popupNewItem));
buttonCloseFullview.addEventListener('click', ()=>closePopup(popupFullview));
formEditInfo.addEventListener('submit', handleFormSubmit);
formNewItem.addEventListener('submit', addCardSubmit);