const editButton = document.querySelector('.profile__edit-button');
const newItemButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const newItemPopup = document.querySelector('.popup_type_newitem');
const fullviewPopup = document.querySelector('.popup_type_fullview');
const closeButton = popup.querySelector('.popup__button-close');
const closeNewItemButton = newItemPopup.querySelector('.popup__button-close_type_newitem');
const closeFullviewButton = fullviewPopup.querySelector('.popup__button-close_type_fullview');
const createButton = newItemPopup.querySelector('.popup__button-submit_type_create');
const submitButton = popup.querySelector('.popup__button-submit');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;
const nameMain = document.querySelector('.profile__name');
const jobMain = document.querySelector('.profile__description');

let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_job');
let formNewItem = newItemPopup.querySelector('.popup__form_type_newitem');
let itemNameInput = formNewItem.querySelector('.popup__field_type_newitem-name');
let itemLinkInput = formNewItem.querySelector('.popup__field_type_newitem-link');

//вставка первых карточек
initialCards.forEach(function(card) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = card.link;
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

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameMain.textContent;
  jobInput.value = jobMain.textContent;
}

function openNewItemPopup() {
  newItemPopup.classList.add('popup_opened');
}

function openNewItemPopup() {
  newItemPopup.classList.add('popup_opened');
}

function openFullviewImage(cardname, cardlink){
  fullviewPopup.classList.add('popup_opened');
  fullviewPopup.querySelector('.popup__image').src = cardlink;
  fullviewPopup.querySelector('.popup__image-name').textContent = cardname;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function closeNewItemPopup() {
  newItemPopup.classList.remove('popup_opened');
}

function closeFullviewImage(){
  fullviewPopup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
    nameMain.textContent = nameInput.value;
    jobMain.textContent = jobInput.value;
    closePopup();
}

//добавление новых карточек
function createNewCard(evt) {
  evt.preventDefault();
  if ((itemLinkInput.value === '') && (itemNameInput.value === '')) {
    closeNewItemPopup();
  } else {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = itemLinkInput.value;
    element.querySelector('.element__description').textContent = itemNameInput.value;
    element.querySelector('.element__button-like').addEventListener('click', function(evt){
      evt.target.classList.toggle('element__button-like_active');
    });
    element.querySelector('.element__button-trash').addEventListener('click', function(){
      element.remove();
    });
    element.querySelector('.element__image').addEventListener('click', () => openFullviewImage(element.querySelector('.element__description').textContent, element.querySelector('.element__image').src));
    elements.prepend(element);
    itemLinkInput.value = '';
    itemNameInput.value = '';
    closeNewItemPopup();
  }
}

newItemButton.addEventListener('click', openNewItemPopup);
closeNewItemButton.addEventListener('click', closeNewItemPopup);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
closeFullviewButton.addEventListener('click', closeFullviewImage);
formNewItem.addEventListener('submit', createNewCard);
formElement.addEventListener('submit', handleFormSubmit);
