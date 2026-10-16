import { clickBtn } from "./uiModification.js";

const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const description = document.querySelector("#description");

function amountVarification() {}

const transaction = {
   id: Date.now(),
   type: clickBtn,
   amount: amount.value,
   category: category.value,
   description: description.value,
   date: date.value,
};
