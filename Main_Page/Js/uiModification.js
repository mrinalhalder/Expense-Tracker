const home = document.querySelector('.nav-link[href="#overview"]');
const transactions = document.querySelector("#transactionsLink");
const reports = document.querySelector("#reportsLink");
const login = document.querySelector("#login");

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
});

expenseBtn.addEventListener("click", () => {
   expenseBtn.classList.add("selected");
   incomeBtn.classList.remove("selected");
});
