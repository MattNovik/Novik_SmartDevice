'use strict';
(function () {
  const page = document.querySelector('.globe-page');
  const popup = document.querySelector('.form--modal');
  const openPopup = document.querySelector('.header-contacts__call');
  const pageHover = document.querySelector('.wrapper-page-module-hover')
  const popupClose = document.querySelector('.form__close');
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  const formQuestions = document.querySelector('.form__form--questions');
  const agreementPopup = popup.querySelector('.agreement-call');

  const nameFormPopup = popup.querySelector('.wrapper-name-tel__name');
  const telFormPopup = popup.querySelector('.wrapper-name-tel__telephone');

  const nameForm = formQuestions.querySelector('.wrapper-name-tel__name');
  const telForm = formQuestions.querySelector('.wrapper-name-tel__telephone');

  const siteMapOpener = document.querySelector('.site-map');
  const siteMap = document.querySelector('.wrapper-top-footer__second-block');

  const placeOpener = document.querySelector('.place');
  const place = document.querySelector('.wrapper-top-footer__third-block');

  siteMap.classList.remove('without-js');
  place.classList.remove('without-js');

  siteMapOpener.addEventListener('click', ()=> {
    if (place.classList.contains('wrapper-top-footer__third-block--open')) {
      place.classList.toggle('wrapper-top-footer__third-block--open')
    }
    siteMap.classList.toggle('wrapper-top-footer__second-block--open');
  })

  placeOpener.addEventListener('click', ()=> {
    if (siteMap.classList.contains('wrapper-top-footer__second-block--open')) {
      siteMap.classList.toggle('wrapper-top-footer__second-block--open')
    }
    place.classList.toggle('wrapper-top-footer__third-block--open');
  })

  const createTelFormError = (e) => {
    const tel = e;
    let number = tel.value;
    const valueLength = tel.value.length;
    let reg = /[^0-9\-\(\)\+\ ]/gi;
    if (valueLength == 6) {
      number = number.replace(/(\d{3})/, '$1)');
    }
    number = number.replace(/(\d{3})(\d{3})(\d{4})/, '$1)$2$3');
    tel.value = number;

    if (reg.test(number)) {
      number = number.replace(reg, '');
      tel.value = number;
    } else {
      tel.setCustomValidity('');
    }
    tel.reportValidity();
  }

  const createTelFormStartValue = (e) => {
    if (e.value.length === 0) {
      e.value = '+7(';
    }
  };

  telFormPopup.addEventListener('focus', (evt) => {
    createTelFormStartValue(evt.target);
  });
  telFormPopup.addEventListener('input', (evt) => {
    createTelFormError(evt.target);
  });

  telForm.addEventListener('focus', (evt) => {
    createTelFormStartValue(evt.target)
  });
  telForm.addEventListener('input', (evt) => {
    createTelFormError(evt.target)
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
    page.classList.remove('globe-page--hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  popupClose.addEventListener('click', () => {
    popup.classList.add('form--close');
    pageHover.classList.add('wrapper-page-module-hover--closed');
    page.classList.remove('globe-page--hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  popup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    popup.classList.add('form--close');
    pageHover.classList.add('wrapper-page-module-hover--closed');
    page.classList.remove('globe-page--hidden');
    document.addEventListener('keydown', onPopupEscKeydown);
    localStorage.setItem('telephone', popup.querySelector('.wrapper-name-tel__telephone').value);
    localStorage.setItem('name', popup.querySelector('.wrapper-name-tel__name').value);
    alert('succesfull send');
  });

  formQuestions.addEventListener('submit', (evt) => {
    evt.preventDefault();
    localStorage.setItem('telephone', formQuestions.querySelector('.wrapper-name-tel__telephone').value);
    localStorage.setItem('name', formQuestions.querySelector('.wrapper-name-tel__name').value);
    formQuestions.reset();
    alert('succesfull send');
  })

  agreementPopup.addEventListener('blur', (evt) => {
    popup.querySelector('.wrapper-name-tel__name').focus();
  });
})();
