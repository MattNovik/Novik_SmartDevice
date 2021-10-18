'use strict';
const page = document.querySelector('.globe-page');
const popup = document.querySelector('.form--modal');
const openPopup = document.querySelector('.header-contacts__call');
const pageHover = document.querySelector('.wrapper-page-module-hover')
const popupClose = document.querySelector('.form__close');
const smoothLinks = document.querySelectorAll('a[href^="#"]');
const formQuestions = document.querySelector('.form_form--questions');

const nameFormPopup = popup.querySelector('.wrapper-name-tel__name');
const telFormPopup = popup.querySelector('.wrapper-name-tel__telephone');

const nameForm = formQuestions.querySelector('.wrapper-name-tel__name');
const telForm = formQuestions.querySelector('.wrapper-name-tel__telephone');

const siteMapOpener = document.querySelector('.site-map');
const siteMap = document.querySelector('.wrapper-top-footer__second-block');

const placeOpener = document.querySelector('.place');
const place = document.querySelector('.wrapper-top-footer__third-block');

siteMap.classList.remove("no-js");
place.classList.remove("no-js");

siteMapOpener.addEventListener('click', ()=> {
  siteMap.classList.toggle('wrapper-top-footer__second-block--open');
})

placeOpener.addEventListener('click', ()=> {
  place.classList.toggle('wrapper-top-footer__third-block--open');
})

nameFormPopup.addEventListener('input', () => {
  const valueLength = nameFormPopup.value.length;
  if (valueLength < 2) {
    nameFormPopup.setCustomValidity(`Eщё ${2 - valueLength} сим.`);
  } else {
    nameFormPopup.setCustomValidity('');
  }

  nameFormPopup.reportValidity();
});

telFormPopup.addEventListener('focus', ()=> {
  if (telFormPopup.value.length === 0) {
    telFormPopup.value = '+7(';
  }
});

telFormPopup.addEventListener('input', () => {
  const tel = telFormPopup;
  let number = tel.value;
  const MAX_LENGTH = 14;
  const valueLength = tel.value.length;
  let reg = /[^0-9\-\(\)\+\ ]/gi;
  let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  let k = 0;
  if (k == 0 && valueLength == 6) {
    number = number.replace(/(\d{3})/, '$1)');
    k++;
  }
  number = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1)$2$3');
  tel.value = number;

  if (reg.test(number)) {
    number = number.replace(reg, '');
    tel.value = number;
    tel.setCustomValidity(`только цифры`);
  } else if (valueLength < MAX_LENGTH) {
    tel.setCustomValidity(`Eщё мин.${MAX_LENGTH - valueLength} сим.`);
  } else {
    tel.setCustomValidity('');
  }
  tel.reportValidity();
});

nameForm.addEventListener('input', () => {
  const valueLength = nameForm.value.length;
  if (valueLength < 2) {
    nameForm.setCustomValidity(`Eщё ${2 - valueLength} сим.`);
  } else {
    nameForm.setCustomValidity('');
  }

  nameForm.reportValidity();
});

telForm.addEventListener('focus', ()=> {
  if (telForm.value.length === 0) {
    telForm.value = '+7(';
  }
});

telForm.addEventListener('input', () => {
  const tel = telForm;
  let number = tel.value;
  const MAX_LENGTH = 14;
  const valueLength = tel.value.length;
  let reg = /[^0-9\-\(\)\+\ ]/gi;
  let regexp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  let k = 0;
  if (k == 0 && valueLength == 6) {
    number = number.replace(/(\d{3})/, '$1)');
    k++;
  }
  number = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1)$2$3');
  tel.value = number;

  if (reg.test(number)) {
    number = number.replace(reg, '');
    tel.value = number;
    tel.setCustomValidity(`только цифры`);
  } else if (valueLength < MAX_LENGTH) {
    tel.setCustomValidity(`Eщё мин.${MAX_LENGTH - valueLength} сим.`);
  } else {
    tel.setCustomValidity('');
  }
  tel.reportValidity();
});

for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
      e.preventDefault();
      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  });
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const onPopupEscKeydown = (evt) => {
	if (isEscEvent(evt)) {
		evt.preventDefault();
		popup.classList.add('form--close');
		pageHover.classList.add('wrapper-page-module-hover--closed');
    page.classList.remove('globe-page--hidden');
	}
};

openPopup.addEventListener('click', () => {
  if (popup.classList.contains('form--close')) {
    popup.classList.remove('form--close');
    pageHover.classList.remove('wrapper-page-module-hover--closed');
    document.addEventListener('keydown', onPopupEscKeydown);
    popup.querySelector('.wrapper-name-tel__name').focus();
    page.classList.add('globe-page--hidden');
  }
})

pageHover.addEventListener('click', () => {
  popup.classList.add('form--close');
	pageHover.classList.add('wrapper-page-module-hover--closed');
  document.removeEventListener('keydown', onPopupEscKeydown);
});

popupClose.addEventListener('click', () => {
  popup.classList.add('form--close');
	pageHover.classList.add('wrapper-page-module-hover--closed');
  page.classList.remove('globe-page--hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
});

popup.addEventListener("submit", (evt) => {
	evt.preventDefault();
  popup.classList.add('form--close');
	pageHover.classList.add('wrapper-page-module-hover--closed');
  page.classList.remove('globe-page--hidden');
	document.addEventListener("keydown", onPopupEscKeydown);
	localStorage.setItem("telephone", popup.querySelector(".wrapper-name-tel__telephone").value);
	localStorage.setItem("name", popup.querySelector(".wrapper-name-tel__name").value);
  alert('succesfull send');
});

formQuestions.addEventListener('submit', (evt) => {
  evt.preventDefault();
  localStorage.setItem('telephone', formQuestions.querySelector('.wrapper-name-tel__telephone').value);
	localStorage.setItem('name', formQuestions.querySelector('.wrapper-name-tel__name').value);
  formQuestions.reset();
  alert('succesfull send');
})

