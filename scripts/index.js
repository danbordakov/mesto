const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__button-close');
const submitButton = popup.querySelector('.popup__button-submit');

let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_job');

const nameMain = document.querySelector('.profile__name');
const jobMain = document.querySelector('.profile__description');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameMain.textContent;
  jobInput.value = jobMain.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
    nameMain.textContent = nameInput.value;
    jobMain.textContent = jobInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);