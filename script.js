import {
   hasUserData,
   getName,
   getIncome,
   getCurrentBalance,
   getExpenses,
} from "./userInfo.js";
import { getBalanceSummary } from "./viewTransaction.js";

const greetingText = document.querySelector("#greetingText");
const subTotalIncome = document.querySelector("#total_income");
const subTotalExpenses = document.querySelector("#total_expenses");

export const totalBalance = document.querySelector("#total-balance");
export const totalIncome = document.querySelector("#total-income");
export const totalExpenses = document.querySelector("#total-expenses");

const now = new Date();
const hours = now.getHours();

export let income = 0;
export let expense = 0;
let currentBalance = 0;

if (hasUserData) {
   const name = getName();
   income = getIncome();
   expense = getExpenses();
   currentBalance = getCurrentBalance();

   showGreeting(name);
   showBalanceDetails(income, expense, currentBalance);
}

function showGreeting(name) {
   if (hours >= 22 || hours <= 2) {
      greetingText.textContent = `Good Night, ${name} 👋`;
   } else if (hours >= 3 && hours < 12) {
      greetingText.textContent = `Good Morning, ${name} 👋`;
   } else if (hours >= 12 && hours < 18) {
      greetingText.textContent = `Good Afternoon, ${name} 👋`;
   } else if (hours >= 18 && hours < 22) {
      greetingText.textContent = `Good Evening, ${name} 👋`;
   }
}

export function showBalanceDetails(income, expense, currentBalance) {
   totalBalance.textContent = `₹ ${currentBalance}`;
   subTotalIncome.textContent = `₹ ${income}`;
   subTotalExpenses.textContent = `₹ ${expense}`;

   totalIncome.textContent = `₹ ${income}`;
   totalExpenses.textContent = `₹ ${expense}`;
}
