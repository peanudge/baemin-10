function handleNextPageClick() {
  location.href = "/auth/registerPhone";
}

function bindingEvents() {
  console.log("event binding");
  const nextButtonDOM = document.querySelector(".next-step-btn");
  nextButtonDOM.addEventListener("click", handleNextPageClick);
}

window.onload = () => {
  bindingEvents();
};
