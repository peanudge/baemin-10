import checkRegex from "/javascripts/utils/checkRegex.js";

const EMAIL_CHECK_URL = "/api/account/id";

const BIRTHDAY_FIRST_DIVISION_INDEX = 5;
const BIRTHDAY_SECOND_DIVISION_INDEX = 8;
const BIRTHDAY_MAX_LENGTH = 10;

const state = {
  validate: function () {
    return (
      this?._isEmailValidate &&
      this?._isNicknameValidate &&
      this?._isPasswordValidate &&
      this?._isBirthdayValidate
    );
  },
  get isEmailValidate() {
    return this._isEmailValidate;
  },
  get isNicknameValidate() {
    return this._isNicknameValidate;
  },
  get isPasswordValidate() {
    return this._isPasswordValidate;
  },
  get isBirthdayValidate() {
    return this._isBirthdayValidate;
  },
  set isEmailValidate(value) {
    this._isEmailValidate = Boolean(value);
    if (this.validate()) {
      enableNextStep();
    } else {
      disableNextStep();
    }
  },
  set isNicknameValidate(value) {
    this._isNicknameValidate = Boolean(value);
    if (this.validate()) {
      enableNextStep();
    } else {
      disableNextStep();
    }
  },
  set isPasswordValidate(value) {
    this._isPasswordValidate = Boolean(value);
    if (this.validate()) {
      enableNextStep();
    } else {
      disableNextStep();
    }
  },
  set isBirthdayValidate(value) {
    this._isBirthdayValidate = Boolean(value);
    if (this.validate()) {
      enableNextStep();
    } else {
      disableNextStep();
    }
  },
};

function handleSubmit() {
  const $form = document.querySelector("form");

  const $emailInput = document.querySelector("#email");
  $emailInput.removeAttribute("disabled");

  if (state.validate()) {
    $form.submit();
  }
}

function enableNextStep() {
  const $headerNextButton = document.querySelector("header .right");
  $headerNextButton.classList.remove("disabled");
  $headerNextButton.addEventListener("click", handleSubmit);
}

function disableNextStep() {
  const $headerNextButton = document.querySelector("header .right");
  $headerNextButton.classList.add("disabled");
  $headerNextButton.removeEventListener("click", handleSubmit);
}

function displayValidationMark($parentElement) {
  const $validationMark = document.createElement("i");
  $validationMark.classList.add("fas", "fa-check", "check-icon");

  const $inputFloatButtonWrapper = $parentElement.querySelector(
    ".input-float-button-wrapper"
  );

  if (!$inputFloatButtonWrapper.querySelector(".check-icon")) {
    $inputFloatButtonWrapper.append($validationMark);
  }
}

function undisplayValidationMark($parentElement) {
  const $checkIcon = $parentElement.querySelector(
    ".input-float-button-wrapper .check-icon"
  );

  if ($checkIcon) {
    $checkIcon.remove();
  }
}

function addDot(target) {
  const index = target.value.length - 1;
  if (target.value[index] === ".") {
    return;
  }
  if (target.value.match(/\./g)?.length > 1) {
    return;
  }

  const stringArray = target.value.split("");
  const joinedString = [
    ...stringArray.slice(0, index),
    ".",
    ...stringArray.splice(index),
  ].join("");
  target.value = joinedString;
}

function createInput({
  id,
  labelText,
  type,
  name,
  placeholder,
  maxlength,
  events,
}) {
  const $inputContainer = document.createElement("div");
  $inputContainer.classList.add("input-container");

  const $label = document.createElement("label");
  $label.setAttribute("for", id);
  $label.insertAdjacentHTML("afterbegin", labelText);

  const $inputWrapper = document.createElement("div");
  $inputWrapper.classList.add("input-wrapper");

  const $input = document.createElement("input");
  $input.id = id;
  $input.setAttribute("type", type);
  $input.setAttribute("name", name);
  if (placeholder) {
    $input.setAttribute("placeholder", placeholder);
  }
  if (maxlength) {
    $input.setAttribute("maxlength", maxlength);
  }

  const $inputFloatButton = document.createElement("div");
  $inputFloatButton.classList.add("input-float-button-wrapper");

  $inputWrapper.append($input, $inputFloatButton);
  $label.append($inputWrapper);
  $inputContainer.append($label);

  if (events.length > 0) {
    events.forEach(({ type, handler }) => {
      $input.addEventListener(type, handler);
    });
  }

  return $inputContainer;
}

function displayErrorMessage($inputWrapper, text) {
  const $parentElement = $inputWrapper.parentElement;

  if (!$parentElement.querySelector(".error-message")) {
    const $errorMessage = document.createElement("div");
    $errorMessage.classList.add("error-message");
    $errorMessage.insertAdjacentText("beforeend", text);

    const $inputElement = $inputWrapper.querySelector("input");
    $inputElement.classList.add("input--error");
    $inputWrapper.after($errorMessage);
  }
}

function undisplayErrorMessage($inputWrapper) {
  const $parentElement = $inputWrapper.parentElement;

  const $errorMessage = $parentElement.querySelector(".error-message");
  if ($errorMessage) {
    $errorMessage.remove();
    const $inputElement = $inputWrapper.querySelector("input");
    $inputElement.classList.remove("input--error");
  }
}

function handleNicknameInput({ target }) {
  const nickname = target.value;

  if (nickname.length >= 2 && !state.isNicknameValidate) {
    state.isNicknameValidate = true;
    displayValidationMark(target.parentElement);
  } else if (nickname.length < 2 && state.isNicknameValidate) {
    state.isNicknameValidate = false;
    undisplayValidationMark(target.parentElement);
  }
}

function handlePasswordInput({ target }) {
  const password = target.value;
  const isValidate = checkRegex.password(password);

  if (isValidate && !state.isPasswordValidate) {
    state.isPasswordValidate = true;
    displayValidationMark(target.parentElement);
    undisplayErrorMessage(target.parentElement);
  } else if (!isValidate) {
    state.isPasswordValidate = false;
    undisplayValidationMark(target.parentElement);
    displayErrorMessage(
      target.parentElement,
      "10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야 합니다"
    );
  }
}

function handleBirthdayInput({ target }) {
  const inputValue = target.value;

  const key = inputValue[inputValue.length - 1];
  if (!/\d/.test(key)) {
    target.value = target.value.slice(0, target.value.length - 1);
    return;
  }

  const divisionIndex = [
    BIRTHDAY_FIRST_DIVISION_INDEX,
    BIRTHDAY_SECOND_DIVISION_INDEX,
  ];
  if (divisionIndex.includes(inputValue.length)) {
    addDot(target);
  }

  if (inputValue.length !== BIRTHDAY_MAX_LENGTH && state.isBirthdayValidate) {
    state.isBirthdayValidate = false;
    undisplayValidationMark(target.parentElement);
    displayErrorMessage(target.parentElement, "생년월일 형식을 확인해주세요");
  }
  if (inputValue.length === BIRTHDAY_MAX_LENGTH) {
    const isValid = checkRegex.birthday(inputValue);
    if (isValid) {
      state.isBirthdayValidate = true;
      displayValidationMark(target.parentElement);
      undisplayErrorMessage(target.parentElement);
    } else {
      displayErrorMessage(target.parentElement, "생년월일 형식을 확인해주세요");
    }
  }
}

function displayInfoInputUI() {
  const $form = document.querySelector("form");

  if ($form.querySelector("#nickname")) {
    return;
  }

  const $nicknameInput = createInput({
    labelText: "닉네임",
    id: "nickname",
    type: "text",
    name: "nickname",
    events: [
      {
        type: "input",
        handler: handleNicknameInput,
      },
    ],
  });
  const $passwordInput = createInput({
    labelText: "비밀번호",
    id: "password",
    type: "password",
    name: "password",
    events: [
      {
        type: "input",
        handler: handlePasswordInput,
      },
    ],
  });
  const $birthdayInput = createInput({
    labelText: "생년월일",
    id: "birthday",
    type: "text",
    name: "birthday",
    placeholder: "예) 2000.01.01",
    maxlength: 10,
    events: [
      {
        type: "input",
        handler: handleBirthdayInput,
      },
    ],
  });

  $form.append($nicknameInput, $passwordInput, $birthdayInput);
}

async function validateEmail({ target }) {
  const $emailInput = document.querySelector("#email");
  const email = $emailInput.value;
  const emailFormatValidity = checkRegex.email(email);

  if (!state.isEmailValidate && emailFormatValidity) {
    const $emailValidationButton = document.querySelector("#validate-email");
    $emailValidationButton.removeEventListener("click", validateEmail);

    const res = await fetch(EMAIL_CHECK_URL + `?id=${email}`, {
      method: "HEAD",
    });

    state.isEmailValidate = !res.ok;

    if (!res.ok) {
      $emailInput.setAttribute("disabled", true);
      undisplayErrorMessage($emailInput.parentElement);
      displayValidationMark(
        target.parentElement.querySelector(".input-wrapper")
      );

      displayInfoInputUI();
    } else {
      displayErrorMessage(
        $emailInput.parentElement,
        "이미 가입된 이메일입니다."
      );
    }

    $emailValidationButton.addEventListener("click", validateEmail);
  }
}

function clearEmailInput() {
  const $emailInput = document.querySelector("#email");
  $emailInput.value = "";
  $emailInput.removeAttribute("disabled");
  state.isEmailValidate = false;
  undisplayValidationMark($emailInput.parentElement);
}

function bindEvents() {
  const $emailValidationButton = document.querySelector("#validate-email");
  $emailValidationButton.addEventListener("click", validateEmail);

  const $emailInputClearButton = document.querySelector("#email-clear");
  $emailInputClearButton.addEventListener("click", clearEmailInput);
}

window.addEventListener("DOMContentLoaded", () => {
  state.isEmailValidate = false;
  state.isNicknameValidate = false;
  state.isPasswordValidate = false;
  state.isBirthdayValidate = false;

  bindEvents();
});
