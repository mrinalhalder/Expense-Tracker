import { incomeSum, expenseSum } from "./viewTransaction.js";

const key = "userInfo";
export const userData = JSON.parse(localStorage.getItem(key));

console.log(userData);
console.log(expenseSum);

export let hasUserData = false;
export let getIncome;
export let getCurrentBalance;
export const getExpenses = () => expenseSum;
export let getName;

if (userData) {
   hasUserData = true;
   getName = () => userData.userName;

   getIncome = () => userData.userIncome + incomeSum;
   getCurrentBalance = () => getIncome() - getExpenses();
}
