import { updateDonutChart } from "./summary.js";
import { userData } from "./userInfo.js";
import { showBalanceDetails } from "./script.js";

const monthFilter = document.querySelector("#month-filter");
const now = new Date();
const thisYear = now.getFullYear();
const TRANSACTION_KEY = "transactionData";

const orderType = document.querySelector("#sort-order");
const category = document.querySelector("#category-filter");
const searchItem = document.querySelector("#search");
const tableBody = document.querySelector("#transaction-list");
const transactionCount = document.querySelector("#transaction-count");

// Dropdown populate kora
monthFilter.innerHTML = `
   <option value="${thisYear}-01">January ${thisYear}</option> 
   <option value="${thisYear}-02">February ${thisYear}</option> 
   <option value="${thisYear}-03">March ${thisYear}</option>
   <option value="${thisYear}-04">April ${thisYear}</option>
   <option value="${thisYear}-05">May ${thisYear}</option> 
   <option value="${thisYear}-06">June ${thisYear}</option>
   <option value="${thisYear}-07">July ${thisYear}</option>
   <option value="${thisYear}-08">August ${thisYear}</option> 
   <option value="${thisYear}-09">September ${thisYear}</option>
   <option value="${thisYear}-10">October ${thisYear}</option> 
   <option value="${thisYear}-11">November ${thisYear}</option> 
   <option value="${thisYear}-12">December ${thisYear}</option>
`;

monthFilter.value = `${thisYear}-${String(now.getMonth() + 1).padStart(2, "0")}`;

export function getTargetTransaction(TRANSACTION_KEY = "transactionData") {
   if (!monthFilter) {
      return [];
   }

   const DATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];
   const selectedMonthValue = monthFilter.value;

   return DATA.filter((item) => {
      return item.date.startsWith(selectedMonthValue);
   });
}

// export let expenseSum = 0;
// export let incomeSum = 0;
export let count = 0;

export function viewTransaction(type) {
   const data = getTargetTransaction(TRANSACTION_KEY);
   if (!data || data.length === 0) {
      tableBody.innerHTML = "";
      addTransactionCount(0);
      return;
   }

   orderSort(type, data);
   if (orderType) orderType.value = type;
   if (category) category.value = "all";

   tableBody.innerHTML = "";
   data.forEach((item) => {
      addTransactionRow(item);
   });

   addTransactionCount(data.length);
}

export function addTransactionRow(item) {
   const isIncome = item.type === "income";
   const sign = isIncome ? "+" : "-";
   const amountClass = isIncome ? "text-green" : "text-red";

   tableBody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${item.date}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>
        <td class="${amountClass}">${sign} ₹${item.amount}</td>
        <td class="action-buttons">
          <button type="button" class="edit-btn" data-id="${item.id}">✏️</button>
          <button type="button" class="delete-btn" data-id="${item.id}">🗑️</button>
        </td>
      </tr>
    `,
   );
}

export function addTransactionCount(countVal) {
   if (transactionCount) {
      transactionCount.innerText = `${countVal}`;
   }
}

export function orderSort(type, DATA) {
   if (type === "newest") {
      DATA.sort((a, b) => new Date(b.date) - new Date(a.date));
   } else if (type === "oldest") {
      DATA.sort((a, b) => new Date(a.date) - new Date(b.date));
   } else if (type === "highest") {
      DATA.sort((a, b) => {
         const amountA =
            a.type === "expense" ? -Number(a.amount) : Number(a.amount);
         const amountB =
            b.type === "expense" ? -Number(b.amount) : Number(b.amount);
         return amountB - amountA;
      });
   } else if (type === "lowest") {
      DATA.sort((a, b) => {
         const amountA =
            a.type === "expense" ? -Number(a.amount) : Number(a.amount);
         const amountB =
            b.type === "expense" ? -Number(b.amount) : Number(b.amount);
         return amountA - amountB;
      });
   }
}

if (orderType) {
   orderType.addEventListener("change", (e) => {
      const value = orderType.value;
      if (category) category.value = "all";
      viewTransaction(value);
   });
}

if (category) {
   category.addEventListener("change", (e) => {
      const DATA = getTargetTransaction();
      const value = category.value;
      if (value === "all") {
         viewTransaction("newest");
         return;
      }
      const targetData = DATA.filter((item) => item.category === value);
      orderSort("newest", targetData);

      tableBody.innerHTML = "";
      targetData.forEach((item) => addTransactionRow(item));
      addTransactionCount(targetData.length);
   });
}

if (monthFilter) {
   monthFilter.addEventListener("change", (e) => {
      const targetData = getTargetTransaction();
      let expense = 0;
      let income = userData.userIncome || 0;

      targetData.forEach((item) => {
         if (item.type === "expense") expense += Number(item.amount);
         if (item.type === "income") income += Number(item.amount);
      });

      monthTransaction(targetData);
      addTransactionCount(targetData.length);
      updateDonutChart(income, expense);
      showBalanceDetails(income, expense, income - expense);

      const event = new CustomEvent("monthDataChanged", {
         detail: { income, expense, balance: income - expense },
      });

      document.dispatchEvent(event);
   });
}

export function getBalanceSummary(income = 0, expense = 0, currentBalance = 0) {
   const data = getTargetTransaction();

   data.forEach((item) => {
      if (item.type === "income") {
         income += Number(item.amount);
      }
      if (item.type === "expense") {
         expense += Number(item.amount);
      }
   });

   currentBalance = income - expense;
   return { income, expense, currentBalance };
}

export function monthTransaction(data) {
   orderSort("newest", data);
   tableBody.innerHTML = "";
   data.forEach((item) => {
      addTransactionRow(item);
   });
}

const data = getTargetTransaction();
let expense = 0;
let income = userData.userIncome || 0;

data.forEach((item) => {
   if (item.type === "expense") expense += Number(item.amount);
   if (item.type === "income") income += Number(item.amount);
});

showBalanceDetails(income, expense, income - expense);
updateDonutChart(income, expense);
monthTransaction(data);
addTransactionCount(data.length);

searchItem.addEventListener("input", (e) => {
   const query = e.target.value.toLowerCase().trim();
   const currentData = getTargetTransaction();

   const filteredData = currentData.filter((item) => {
      return (
         item.description.toLowerCase().includes(query) ||
         item.category.toLowerCase().includes(query)
      );
   });

   tableBody.innerHTML = "";
   filteredData.forEach((item) => addTransactionRow(item));
   addTransactionCount(filteredData.length);
});
