const editButton = document.querySelector(".profile-info__edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__button-close");
const submitButton = popup.querySelector(".popup__button-submit");

function togglePopup(event) {
  event.preventDefault();
  popup.classList.toggle("popup_opened");
  nameInput.value = '';
  jobInput.value = '';
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__field_name");
let jobInput = formElement.querySelector(".popup__field_job");

function handleFormSubmit (evt) {
    evt.preventDefault(); 

let newName = nameInput.value;
let newJob = jobInput.value;
let name = document.querySelector(".profile-info__name");
let job = document.querySelector(".profile-info__description");

    name.textContent = newName;
    job.textContent = newJob;
    popup.classList.toggle("popup_opened");
    nameInput.setAttribute("placeholder", newName);
    jobInput.setAttribute("placeholder", newJob);
    nameInput.value = '';
    jobInput.value = '';
}

formElement.addEventListener('submit', handleFormSubmit);