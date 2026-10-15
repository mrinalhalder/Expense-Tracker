const form = document.querySelector("#income-form");
const nameSection = document.querySelector("#name");
const incomeSection = document.querySelector("#income");

const key = "userInfo";
const regex = /^\d+(\.\d{1,2})?$/;

function getNameValidation(name) {
   if (name.length === 0 || name.length > 100) return false;
   if (/\p{L}/u.test(name)) return true;

   return false;
}

function getIncomeValidation(income) {
   if (income === null || income === undefined || String(income).trim() === "")
      return false;

   const num = Number(income);
   if (Number.isNaN(num)) return false;

   if (!Number.isFinite(num)) return false;

   if (num === 0) return false;
   if (num < 0) return false;

   const MAX_LIMIT = 10000000;
   if (num > MAX_LIMIT) return false;

   return true;
}

function storeData(e) {
   e.preventDefault();

   let name = nameSection.value;

   if (!regex.test(incomeSection.value.trim())) {
      alert("Please Enter a valid Income");
      return;
   }

   const income = Number(incomeSection.value);

   name = name.trim();
   if (!getNameValidation(name)) {
      alert("Please Enter a valid Name");
      return;
   }

   if (!getIncomeValidation(income)) {
      alert("Please Enter a valid Income (1-10000000)");
      return;
   }

   const user = {
      userName: name,
      userIncome: income,
   };

   nameSection.value = "";
   incomeSection.value = "";

   console.log(user.userName);
   console.log(user.userIncome);

   localStorage.setItem(key, JSON.stringify(user));
   showSuccessMessage();
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

      <a href="../index.html" class="home-btn">
        Back to Dashboard →
      </a>
    </div>
  `;
}
