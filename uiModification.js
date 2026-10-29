import {
   addTransactionRow,
   addTransactionCount,
   getBalanceSummary,
} from "./viewTransaction.js";
import { showBalanceDetails } from "./script.js";
import { userData } from "./userInfo.js";

const home = document.querySelector('.nav-link[href="#overview"]');
const transactions = document.querySelector("#transactionsLink");
const reports = document.querySelector("#reportsLink");
const login = document.querySelector("#login");
const tableBody = document.querySelector("#transaction-list");

export let clickBtn = "income";
const TRANSACTION_KEY = "transactionData";

function removeActiveAttribute() {
   home.classList.remove("active");
}

transactions.addEventListener("click", removeActiveAttribute);
reports.addEventListener("click", removeActiveAttribute);
login.addEventListener("click", removeActiveAttribute);

const incomeBtn = document.querySelector("#incomeBtn");
const expenseBtn = document.querySelector("#expenseBtn");

incomeBtn.addEventListener("click", () => {
   incomeBtn.classList.add("selected");
   expenseBtn.classList.remove("selected");
   clickBtn = "income";
});

expenseBtn.addEventListener("click", () => {
   expenseBtn.classList.add("selected");
   incomeBtn.classList.remove("selected");
   clickBtn = "expense";
});

const editModel = document.querySelector("#edit-modal");
const app = document.querySelector(".app-shell");
const form = document.querySelector("#edit-form");
console.log(app);
console.log(editModel);

tableBody.addEventListener("click", (e) => {
   if (e.target.classList.contains("edit-btn")) {
      const transactionID = e.target.dataset.id;
      const DATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];
      const transactionRow = DATA.find(
         (item) => item.id === Number(transactionID),
      );

      if (transactionRow === null) {
         alert("Sorry unable to update this row!");
         return;
      }

      const amount = document.querySelector("#edit-amount");
      const category = document.querySelector("#edit-category");
      const date = document.querySelector("#edit-date");
      const description = document.querySelector("#edit-description");

      console.log(amount);
      console.log(transactionRow);
      console.log(transactionID);
      console.log(DATA);

      updateTransaction(
         amount,
         category,
         date,
         description,
         DATA,
         transactionRow,
         transactionID,
      );
   }
});

function updateTransaction(
   amountInput,
   categoryInput,
   dateInput,
   descriptionInput,
   DATA,
   transactionRow,
   transactionID,
) {
   editModel.classList.remove("hidden");
   app.classList.add("hidden");

   amountInput.value = transactionRow.amount;
   categoryInput.value = transactionRow.category;
   dateInput.value = transactionRow.date;
   descriptionInput.value = transactionRow.description;

   const cancelBtn = document.querySelector("#cancel-edit-btn");
   const closeBtn = document.querySelector("#close-modal-btn");

   console.log(cancelBtn);
   console.log(closeBtn);

   cancelBtn.onclick = backMainFeature;
   closeBtn.onclick = backMainFeature;

   form.onsubmit = (e) => {
      e.preventDefault();

      const index = DATA.findIndex((item) => item.id === Number(transactionID));

      if (index !== -1) {
         DATA[index] = {
            ...DATA[index],
            amount: Number(amountInput.value),
            category: categoryInput.value,
            date: dateInput.value,
            description: descriptionInput.value,
         };
      }

      localStorage.setItem(TRANSACTION_KEY, JSON.stringify(DATA));
      backMainFeature();

      let totalIncome = userData.userIncome || 0;
      let totalExpense = 0;
      tableBody.innerHTML = "";

      DATA.forEach((item) => {
         console.log("Type:", item.type, "Amount:", item.amount);
         if (item.type === "income") {
            totalIncome += Number(item.amount);
         } else if (item.type === "expense") {
            totalExpense += Number(item.amount);
         }
         addTransactionRow(item);
      });

      const currentBalance = totalIncome - totalExpense;

      showBalanceDetails(totalIncome, totalExpense, currentBalance);
   };
}

function backMainFeature() {
   editModel.classList.add("hidden");
   app.classList.remove("hidden");
   return;
}
