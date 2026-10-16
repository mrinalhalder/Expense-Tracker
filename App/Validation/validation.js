export function verifyName(name) {
   if (typeof name !== "string") return false;

   const trimmedName = name.trim();
   if (trimmedName.length === 0 || trimmedName.length > 100) return false;

   if (!/^[\p{L}\p{N} ]+$/u.test(trimmedName)) return false;
   if (!/\p{L}/u.test(trimmedName)) return false;

   return true;
}

export function verifyIncome(income) {
   if (typeof income !== "string") return false;

   const trimmedIncome = income.trim();
   const regex = /^\d+(\.\d{1,2})?$/;

   if (trimmedIncome === "") return false;
   if (!regex.test(trimmedIncome)) {
      return false;
   }

   const num = Number(trimmedIncome);

   if (Number.isNaN(num)) return false;
   if (!Number.isFinite(num)) return false;
   if (num <= 0) return false;

   const MAX_LIMIT = 10000000;
   if (num > MAX_LIMIT) return false;

   return true;
}

/**
export function verifyDate(date) {
  if (typeof date !== "string") return false;
  if (date.length === 0) return false;
  
  const rawDate = new Date();
  const year = rawDate.getFullYear();
  let month = rawDate.getMonth() + 1;
  let day = rawDate.getDate();
  
  month = String(month).padStart(2, "0");
  day = String(day).padStart(2, "0");
  
  const todayDate = `${year}-${month}-${day}`;
  
  if (date > todayDate) return false;
  const dateObj = new Date(date);
  
  if (Number.isNaN(dateObj.getTime()))
    return false;
  
  return true;
}
**/
