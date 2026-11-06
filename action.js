import {
   viewTransaction,
   addTransactionCount,
   getTargetTransaction,
   monthTransaction,
} from "./viewTransaction.js";
import { userData } from "./userInfo.js";
import { showBalanceDetails } from "./script.js";
import { updateChartState } from "./chart.js";
import { updateDonutChart } from "./summary.js";

const TRANSACTION_KEY = "transactionData";
const tableBody = document.querySelector("#transaction-list");

tableBody.addEventListener("click", (e) => {
   if (e.target.classList.contains("delete-btn")) {
      const transactionId = e.target.dataset.id;
      deleteTransaction(transactionId);
   }
});

function deleteTransaction(id) {
   const currentDATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];

   const newData = currentDATA.filter((item) => item.id !== Number(id));
   localStorage.setItem(TRANSACTION_KEY, JSON.stringify(newData));

   const targetRow = document.querySelector(`tr[data-id="${id}"]`);
   if (targetRow) targetRow.remove();

   const monthData = getTargetTransaction();
   monthTransaction(monthData);
   addTransactionCount(monthData.length);
   updateSummary(monthData);
   updateChartState();
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
   updateDonutChart(income, expense);
}
