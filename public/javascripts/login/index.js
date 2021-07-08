const tag = "[LoginPage]";

const isEmptyText = (text) => {
  return text.length == 0;
};

const validateLoginForm = () => {
  const $idInput = document.querySelector("#login-id-input");
  const $pwInput = document.querySelector("#login-pw-input");
  const $idWarningMsg = document.querySelector(
    ".login-form--id-warning-message"
  );
  const $pwWarningMsg = document.querySelector(
    ".login-form--pw-warning-message"
  );

  if ($idInput && $pwInput) {
    const { value: id } = $idInput;
    const { value: pw } = $pwInput;

    if (isEmptyText(id)) {
      $idInput.classList.add("error");
      $idWarningMsg.classList.add("show");
      return false;
    } else {
      $idInput.classList.remove("error");
      $idWarningMsg.classList.remove("show");
    }

    if (isEmptyText(pw)) {
      $pwInput.classList.add("error");
      $pwWarningMsg.classList.add("show");
      return false;
    } else {
      $pwInput.classList.remove("error");
      $idWarningMsg.classList.remove("show");
    }
    return true;
  }
};

const handleLoginBtnClick = (event) => {
  if (!validateLoginForm()) {
    // Prevent submit event;
    event.preventDefault();
  }
};

function bindEvents() {
  const $loginBtn = document.querySelector("#login-btn");
  $loginBtn.addEventListener("click", handleLoginBtnClick);
}

window.addEventListener("DOMContentLoaded", () => {
  bindEvents();
});
