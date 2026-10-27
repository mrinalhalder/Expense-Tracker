const TRANSACTION_KEY = "transactionData";
const orderType = document.querySelector("#sort-order");
const category = document.querySelector("#category-filter");
const searchItem = document.querySelector("#search");
const tableBody = document.querySelector("#transaction-list");

const DATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];

export let expenseSum = 0;
export let incomeSum = 0;

const expenses = DATA.filter((item) => item.type === "expense");
const incomes = DATA.filter((item) => item.type === "income");

expenses.forEach((item) => {
   expenseSum += item.amount;
});

incomes.forEach((item) => {
   incomeSum += item.amount;
});

const transactionCount = document.querySelector("#transaction-count");

export let count = DATA.length;

export function viewTransaction(DATA, tableBody) {
   tableBody.innerHTML = "";
   DATA.forEach((item) => {
      addTransactionRow(item);
   });
}

viewTransaction(DATA, tableBody);
addTransactionCount(count);

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
          <button
            type="button"
            class="edit-btn"
            data-id="${item.id}">
              ✏️
          </button>

          <button
            type="button"
            class="delete-btn"
            data-id="${item.id}">
            🗑️
          </button>
        </td>
      </tr>
    `,
   );
}

export function addTransactionCount(count) {
   transactionCount.innerText = `${count}`;
}

export function getBalanceSummary(income, expense, currentBalance) {
   const data = JSON.parse(localStorage.getItem(TRANSACTION_KEY));

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

   currentBalance = income - expense;
}
