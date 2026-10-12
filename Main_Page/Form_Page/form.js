const form = document.querySelector("#income-form");
const name = document.querySelector("#name");
const income = document.querySelector("#income");
const key = "userInfo";

function storeData(e) {
   e.preventDefault();

   const user = {
      userName: name.value,
      userIncome: Number(income.value),
   };

   name.value = "";
   income.value = "";

   console.log(user.userName);
   console.log(user.userIncome);

   localStorage.setItem(key, JSON.stringify(user));
}

form.addEventListener("submit", storeData);
