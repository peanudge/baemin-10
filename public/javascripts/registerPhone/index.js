import checkRegex from '/javascripts/utils/checkRegex.js';

const PHONE_NUMBER_FIRST_DIVISION_INDEX = 4;
const PHONE_NUMBER_SECOND_DIVISION_INDEX = 9;
const PHONE_NUMBER_MAX_LENGTH = 13;

const state = {
  get isPhoneNumberValidate() {
    return this._isPhoneNumberValidate;
  },
  get hasRequestedConfirmNumber() {
    return this._hasRequestedConfirmNumber;
  },
  get gotConfirmNumber() {
    return this._gotConfirmNumber;
  },
  get isConfirmNumberValid() {
    return this._isConfirmNumberValid;
  },
  get confirmNumber() {
    return this._confirmNumber;
  },
  set isConfirmNumberValid(value) {
    this._isConfirmNumberValid = Boolean(value);
    if (this._isPhoneNumberValidate && this._isConfirmNumberValid) {
      enableNextStep();
    } else {
      disableNextStep();
    }
  },
  set confirmNumber(value) {
    this._confirmNumber = value;
  },
  set isPhoneNumberValidate(value) {
    this._isPhoneNumberValidate = Boolean(value);
    if (this._isPhoneNumberValidate && this._isConfirmNumberValid) {
      enableNextStep();
    } else {
      disableNextStep();
    }
  },
  set hasRequestedConfirmNumber(value) {
    this._hasRequestedConfirmNumber = Boolean(value);
  },
  set gotConfirmNumber(value) {
    this._gotConfirmNumber = Boolean(value);
  },
}

function handleSubmit() {
  const $form = document.querySelector('form');

  if (state.isPhoneNumberValidate && state.isConfirmNumberValid) {
    $form.submit();
  }
}

function enableNextStep() {
  const $headerNextButton = document.querySelector('header .right');
  $headerNextButton.classList.remove('disabled');
  $headerNextButton.addEventListener('click', handleSubmit);
}

function disableNextStep() {
  const $headerNextButton = document.querySelector('header .right');
  $headerNextButton.classList.add('disabled');
  $headerNextButton.removeEventListener('click', handleSubmit);
}

function displayValidationMark($parentElement) {
  const $validationMark = document.createElement('i');
  $validationMark.classList.add('fas', 'fa-check', 'check-icon');

  const $inputFloatButtonWrapper = $parentElement.querySelector('.input-float-button-wrapper');
  $inputFloatButtonWrapper.append($validationMark);
}

function undisplayValidationMark($parentElement) {
  if (state.isPhoneNumberValidate) {
    const $checkIcon = $parentElement.querySelector('.input-float-button-wrapper .check-icon');
    $checkIcon.remove();
  }
}

function resetValidation() {
  state.isPhoneNumberValidate = false;
}

function validatePhoneNumber() {
  const $phoneNumberInput = document.querySelector('#phone');
  const phoneNumber = $phoneNumberInput.value;
  const result = checkRegex.phone(phoneNumber);

  return result;
}

function addHyphen(target) {
  const index = target.value.length - 1;
  if (target.value[index] === '-') {
    return;
  }
  const stringArray = target.value.split('');
  const joinedString = [
    ...stringArray.slice(0, index),
    '-',
    ...stringArray.splice(index),
  ].join('');
  target.value = joinedString;
}

function handlePhoneNumberInput({target}) {
  const inputValue = target.value;

  const divisionIndex = [
    PHONE_NUMBER_FIRST_DIVISION_INDEX,
    PHONE_NUMBER_SECOND_DIVISION_INDEX
  ];
  if (divisionIndex.includes(inputValue.length)) {
    addHyphen(target);
  }

  if (inputValue.length !== PHONE_NUMBER_MAX_LENGTH) {
    undisplayValidationMark(target.parentElement);
    resetValidation();
  }
  if (inputValue.length === PHONE_NUMBER_MAX_LENGTH) {
    const isValid = validatePhoneNumber();
    if (isValid) {
      state.isPhoneNumberValidate = true;
      displayValidationMark(target.parentElement);
    }
  }
}

function clearPhoneNumberInput() {
  const $phoneNumberInput = document.querySelector('#phone');
  $phoneNumberInput.value = '';

  undisplayValidationMark($phoneNumberInput.parentElement);
  state.isPhoneNumberValidate = false;
}

function getConfirmNumber() {
  return String(Math.floor(Math.random() * 8999) + 1000);
}

function initConfirmNumber(confirmNumber) {
  const $confirmNumberInput = document.querySelector('#confirm-number');
  $confirmNumberInput.value = confirmNumber;
}

function removeConfirmNumberRequestButton() {
  const $confirmNumberRequestButton = document.querySelector('#confirm-number-request');
  $confirmNumberRequestButton.remove();
}

function createConfirmNumberInput() {
  const $confirmNumberInput = document.createElement('div');
  $confirmNumberInput.classList.add('input-container');

  const $label = document.createElement('label');
  $label.setAttribute('for', 'confirm-number');
  $label.insertAdjacentHTML('afterbegin', '인증번호');

  const $inputWrapper = document.createElement('div');
  $inputWrapper.classList.add('input-wrapper');

  const $input = document.createElement('input');
  $input.id = 'confirm-number';
  $input.setAttribute('type', 'text');

  $inputWrapper.append($input);
  $label.append($inputWrapper);
  $confirmNumberInput.append($label);

  $input.addEventListener('input', handleConfirmNumberInput);

  return $confirmNumberInput;
}

function checkConfirmNumber(value) {
  if (value === state.confirmNumber) {
    state.isConfirmNumberValid = true;
  } else {
    state.isConfirmNumberValid = false;
  }
}

function handleConfirmNumberInput({target}) {
  checkConfirmNumber(target.value);
}

function createConfirmNumberReRequestButton() {
  const $confirmNumberReRequestButton = document.createElement('button');
  $confirmNumberReRequestButton.classList.add('right-button', 'text-button');
  $confirmNumberReRequestButton.id = 'confirm-number-re-request';
  $confirmNumberReRequestButton.insertAdjacentHTML('afterbegin', '인증번호 다시받기');

  $confirmNumberReRequestButton.addEventListener('click', requestConfirmNumber);

  return $confirmNumberReRequestButton;
}

function requestConfirmNumber(e) {
  if (!state.isPhoneNumberValidate) {
    return;
  }

  e.target.removeEventListener('click', requestConfirmNumber);
  state.gotConfirmNumber = false;

  if (!state.hasRequestedConfirmNumber) {
    state.hasRequestedConfirmNumber = true;
    const $confirmNumberInput = createConfirmNumberInput();
    const $confirmNumberReRequestButton = createConfirmNumberReRequestButton();
    
    const $form = document.querySelector('form');
    $form.append($confirmNumberInput);
    e.target.after($confirmNumberReRequestButton);
    removeConfirmNumberRequestButton();
  }

  setTimeout(() => {
    const confirmNumber = getConfirmNumber();
    state.confirmNumber = confirmNumber;
    initConfirmNumber(confirmNumber);
    checkConfirmNumber(confirmNumber);
    state.gotConfirmNumber = true;

    e.target.addEventListener('click', requestConfirmNumber);
  }, 2000);
}

function bindEvents() {
  const $phoneNumberInput = document.querySelector('#phone');
  $phoneNumberInput.addEventListener('input', handlePhoneNumberInput);

  const $phoneNumberInputClearButton = document.querySelector('#phone-clear');
  $phoneNumberInputClearButton.addEventListener('click', clearPhoneNumberInput);

  const $confirmNumberRequestButton = document.querySelector('#confirm-number-request');
  $confirmNumberRequestButton.addEventListener('click', requestConfirmNumber);
}

window.addEventListener('DOMContentLoaded', () => {
  state.isPhoneNumberValidate = false;
  state.hasRequestedConfirmNumber = false;
  state.gotConfirmNumber = false;
  state.isConfirmNumberValid = false;
  state.confirmNumber = '';

  bindEvents();
});
