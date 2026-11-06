import { clickBtn } from "./uiModification.js";
import {
   viewTransaction,
   addTransactionCount,
   getTargetTransaction,
} from "./viewTransaction.js";
import {
   verifyIncome,
   verifyDate,
   verifyCategory,
   verifyDescription,
} from "./validation.js";
import { showBalanceDetails } from "./script.js";
import { userData } from "./userInfo.js";
import { updateChartState } from "./chart.js";
import { updateDonutChart } from "./summary.js";

const form = document.querySelector("#transaction-form");
const amount = document.querySelector("#amount");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const description = document.querySelector("#description");
const TRANSACTION_KEY = "transactionData";

const pastData = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];

function validationProcess() {
   const amountData = verifyIncome(amount.value);
   const categoryData = verifyCategory(category.value);
   const dateData = verifyDate(date.value);
   const descriptionData = verifyDescription(description.value);

   const failed = [amountData, categoryData, dateData, descriptionData].find(
      (item) => !item.valid,
   );

   if (failed) {
      alert(failed.error);
      return;
   }

   saveData(
      amountData.value,
      categoryData.value,
      dateData.value,
      descriptionData.value,
   );
}

function saveData(amount, category, date, description) {
   const transaction = {
      id: Date.now(),
      type: clickBtn,
      amount,
      category,
      description,
      date,
   };

   try {
      const list = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];

      const insertIndex = list.findIndex(
         (item) => new Date(item.date) > new Date(transaction.date),
      );

      if (insertIndex === -1) {
         list.push(transaction);
      } else {
         list.splice(insertIndex, 0, transaction);
      }

      localStorage.setItem(TRANSACTION_KEY, JSON.stringify(list));
      form.reset();

      const newData = getTargetTransaction();

      let totalIncome = userData.userIncome;
      let totalExpense = 0;

      newData.forEach((item) => {
         if (item.type === "income") {
            totalIncome += Number(item.amount);
         } else if (item.type === "expense") {
            totalExpense += Number(item.amount);
         }
      });

      const currentBalance = totalIncome - totalExpense;

      showBalanceDetails(totalIncome, totalExpense, currentBalance);
      updateDonutChart(totalIncome, totalExpense);

      viewTransaction("newest");
      addTransactionCount(newData.length);
      updateChartState();
   } catch (err) {
      alert("Could not save data");
   }
}

form.addEventListener("submit", (eve) => {
   eve.preventDefault();
   validationProcess();
});
