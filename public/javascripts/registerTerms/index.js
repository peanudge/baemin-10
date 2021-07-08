import { delegate } from "../utils/eventHelper.js";

const tag = "[registerTerms]";

const isCheckedAllEssentialTerms = () => {
  const nodeList = document.querySelectorAll(".essential-terms");

  const termsCheckBoxList = Array.from(nodeList);

  const checkedTermsCheckBoxes = termsCheckBoxList.filter(
    ($checkbox) => $checkbox.checked
  );

  return termsCheckBoxList.length === checkedTermsCheckBoxes.length;
};

const validateActivatableNextButton = () => {
  const $submitBtn = document.querySelector("#terms-submit-btn");
  if (isCheckedAllEssentialTerms()) {
    $submitBtn.removeAttribute("disabled");
  } else {
    $submitBtn.setAttribute("disabled", false);
  }
};

const checkAllTerms = () => {
  const allCheckBoxes = document.querySelectorAll("input[type='checkbox']");
  Array.from(allCheckBoxes).forEach((checkbox) => {
    checkbox.checked = true;
  });
  validateActivatableNextButton();
};

const uncheckAllTerms = () => {
  const allCheckBoxes = document.querySelectorAll("input[type='checkbox']");
  Array.from(allCheckBoxes).forEach((checkbox) => {
    checkbox.checked = false;
  });
  validateActivatableNextButton();
};

const handleCheckTermInput = (e) => {
  validateActivatableNextButton();
};

const handleCheckAllAgreeInput = (e) => {
  if (e.target.checked) {
    checkAllTerms();
  } else {
    uncheckAllTerms();
  }
};

function bindEvents() {
  const $termsContainer = document.querySelector("#terms-container");
  delegate($termsContainer, "input", ".essential-terms", handleCheckTermInput);

  const $allAgreeCheckBox = document.querySelector("#all-agree-checkbox");
  $allAgreeCheckBox.addEventListener("input", handleCheckAllAgreeInput);
}

window.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  uncheckAllTerms();
});
