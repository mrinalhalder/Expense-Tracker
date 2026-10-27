import {
   viewTransaction,
   addTransactionCount,
   count,
} from "./viewTransaction.js";
import { userData } from "./userInfo.js";
import { showBalanceDetails } from "./script.js";

const TRANSACTION_KEY = "transactionData";
const tableBody = document.querySelector("#transaction-list");

tableBody.addEventListener("click", (e) => {
   if (e.target.classList.contains("delete-btn")) {
      const transactionId = e.target.dataset.id;

      console.log("Clicked transaction ID:", transactionId);
      deleteTransaction(transactionId);
   }
});

function deleteTransaction(id) {
   const currentDATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY));
   const newData = currentDATA.filter((item) => item.id !== Number(id));
   localStorage.setItem(TRANSACTION_KEY, JSON.stringify(newData));

   const targetRow = document.querySelector(`tr[data-id="${id}"]`);
   if (targetRow) targetRow.remove();

   viewTransaction(newData, tableBody);
   addTransactionCount(newData.length);
   updateSummary(newData);
}

function updateSummary(data) {
   let income = userData.userIncome;
   let expense = 0;

   data.forEach((item) => {
      if (item.type === "income") {
         income += item.amount;
      }
   });

   data.forEach((item) => {
      if (item.type === "expense") {
         expense += item.amount;
      }
   });

   const currentBalance = income - expense;
   showBalanceDetails(income, expense, currentBalance);
}
