const tag = "[LoginPage]";

// TODO: move utils javascript folder.
const isEmptyText = (text) => {
  return text.length == 0;
};

const handleLoginInputEvent = (_) => {
  const $idInput = document.querySelector("#login-id-input");
  const $pwInput = document.querySelector("#login-pw-input");
  const $loginButton = document.querySelector("#login-btn");

  if ($idInput && $pwInput) {
    const { value: id } = $idInput;
    const { value: pw } = $pwInput;

    if (!isEmptyText(id) && !isEmptyText(pw)) {
      console.log(tag, "Activate Login Button.");
      $loginButton.removeAttribute("disabled");
    } else {
      console.log(tag, "InActivate Login Button.");
      $loginButton.setAttribute("disabled", true);
    }
  }
};

function bindEvents() {
  const $idInput = document.querySelector("#login-id-input");
  const $pwInput = document.querySelector("#login-pw-input");

  $idInput.addEventListener("input", handleLoginInputEvent);
  $pwInput.addEventListener("input", handleLoginInputEvent);
}

function main() {
  bindEvents();
}

window.onload = () => {
  main();
};
