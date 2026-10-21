const MAX_NAME_LENGTH = 100;
const MAX_NAME_LENGTH = 100;
const MAX_INCOME = 10000000;
const MAX_DESCRIPTION_LENGTH = 200;
const CATEGORIES = [
   "Salary",
   "Freelance",
   "Food & Dining",
   "Shopping",
   "Transport",
   "Bills & Utilities",
   "Entertainment",
   "Health",
   "Education",
   "Other",
];

export function verifyName(name) {
   // Check name as a string
   if (typeof name !== "string") {
      return { valid: false, error: "Name must be a string" };
   }

   const trimmedName = name.trim();

   // Check empty string
   if (trimmedName.length === 0) {
      return { valid: false, error: "Please enter a name" };
   }

   // Check name is grater than 100
   if (trimmedName.length > MAX_NAME_LENGTH) {
      return {
         valid: false,
         error: `Name must be ${MAX_NAME_LENGTH} characters or less`,
      };
   }

   // Check invalid character
   if (!/^[\p{L}\p{N} ]+$/u.test(trimmedName)) {
      return { valid: false, error: "Name contains invalid characters" };
   }

   // Check string must be contained as a character
   if (!/\p{L}/u.test(trimmedName)) {
      return { valid: false, error: "Name must contain at least one letter" };
   }

   return { valid: true, value: trimmedName, error: null };
}

export function verifyIncome(income) {
   // Check income as a string
   if (typeof income !== "string") {
      return { valid: false, error: "Income must be a string" };
   }

   const trimmedIncome = income.trim();

   // Check empty string
   if (trimmedIncome === "") {
      return { valid: false, error: "Please enter an amount" };
   }

   const regex = /^\d+(\.\d{1,2})?$/;

   // Check income must be a 2 decimal point number
   if (!regex.test(trimmedIncome)) {
      return {
         valid: false,
         error: "Enter a valid amount (max 2 decimal places)",
      };
   }

   const num = Number(trimmedIncome);

   // Check zero & negetive number
   if (num <= 0) {
      return { valid: false, error: "Amount must be greater than 0" };
   }

   // Check incom is greater then max income
   if (num > MAX_INCOME) {
      return { valid: false, error: `Amount cannot exceed ${MAX_INCOME}` };
   }

   return { valid: true, value: num, error: null };
}

export function verifyDate(input, { minYear = 2000 } = {}) {
   // Check input as a string
   if (typeof input !== "string") {
      return { valid: false, error: "Date must be a string" };
   }

   const trimmedDate = input.trim();

   // Check empty string
   if (trimmedDate.length === 0) {
      return { valid: false, error: "Please enter a Date" };
   }

   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

   // Check date format
   if (!dateRegex.test(trimmedDate)) {
      return { valid: false, error: "Use format YYYY-MM-DD" };
   }

   const [year, month, day] = trimmedDate.split("-").map(Number);
   const date = new Date(year, month - 1, day);

   // Check date actually exists
   if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
   ) {
      return { valid: false, error: "This date does not exist" };
   }

   // Check year is less than 2000
   if (year < minYear) {
      return { valid: false, error: `Year must be ${minYear} or later` };
   }

   const now = new Date();
   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

   // Check future date
   if (date > today) {
      return { valid: false, error: "Date cannot be in the future" };
   }

   return { valid: true, value: trimmedDate, error: null };
}

export function verifyDescription(description) {
   if (typeof description !== "string") {
      return { valid: false, error: "Description must be a string" };
   }

   const value = description.trim();

   if (value.length === 0) {
      return { valid: false, error: "Please enter a Description" };
   }

   if (value.length > MAX_DESCRIPTION_LENGTH) {
      return {
         valid: false,
         error: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`,
      };
   }

   if (/\p{Cc}/u.test(value)) {
      return { valid: false, error: "Description contains invalid characters" };
   }

   return { valid: true, value: value, error: null };
}

export function verifyCategory(input) {
   if (typeof input !== "string" || !CATEGORIES.includes(input)) {
      return { valid: false, error: "Please choose a valid category" };
   }

   return { valid: true, value: input, error: null };
}
