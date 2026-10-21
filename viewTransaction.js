const TRANSACTION_KEY = "transactionData";
const orderType = document.querySelector("#sort-order");
const category = document.querySelector("#category-filter");
const searchItem = document.querySelector("#search");
const tableBody = document.querySelector("#transaction-list");

const DATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];
const transactionCount = document.querySelector("#transaction-count");
export let count = DATA.length;

console.log(DATA);
console.log(orderType);
console.log(category);
console.log(searchItem);
console.log(transactionCount);
console.log(count);

function viewTransaction() {
   tableBody.innerHTML = "";
   DATA.forEach((item) => {
      addTransactionRow(item);
      addTransactionCount(count);
   });
}

viewTransaction();

export function addTransactionRow(item) {
   tableBody.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
        <td>${item.date}</td>
        <td>${item.description}</td>
        <td>${item.category}</td>
        <td>${item.amount}</td>
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
