const key = "userInfo";
export const userData = JSON.parse(localStorage.getItem(key));

export let hasUserData = false;
export let getName = "";

if (userData) {
   hasUserData = true;
   getName = userData.userName;
}
