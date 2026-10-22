import { verifyName, verifyIncome } from "./validation.js";

const form = document.querySelector("#income-form");
const nameSection = document.querySelector("#name");
const incomeSection = document.querySelector("#income");

const key = "userInfo";

function storeData(e) {
   e.preventDefault();

   let name = nameSection.value;
   let income = incomeSection.value;

   if (!verifyName(name)) {
      alert("Please Enter a valid Name");
      return;
   }

   if (!verifyIncome(income)) {
      alert("Please Enter a valid Income (1-10000000)");
      return;
   }

   const user = {
      userName: name,
      userIncome: Number(income),
   };

   nameSection.value = "";
   incomeSection.value = "";

   localStorage.setItem(key, JSON.stringify(user));
   showSuccessMessage();
   console.log("form submitted");
}

form.addEventListener("submit", storeData);
const formContainer = document.querySelector(".page-container");

function showSuccessMessage() {
   formContainer.innerHTML = `
    <div class="success-card">
      <div class="success-icon">✓</div>

      <h1>You're all set!</h1>

      <p>
        Your income details have been saved successfully.
        You're ready to manage your expenses.
      </p>

      <a href="./index.html" class="home-btn">
        Back to Dashboard →
      </a>
    </div>
  `;
}
