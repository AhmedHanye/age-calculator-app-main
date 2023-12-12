function Calculate_age(birth_date) {
  let Birthday = new Date(birth_date);
  let datenow = new Date();

  let years = datenow.getFullYear() - Birthday.getFullYear();
  let months = datenow.getMonth() - Birthday.getMonth();
  let days = datenow.getDate() - Birthday.getDate();

  if (days < 0) {
    months--;
    // Calculate the days remaining in the current month
    let lastMonth = new Date(datenow.getFullYear(), datenow.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { Y: years, M: months, D: days };
}

let age = Calculate_age("2004/10/16");
console.log(age.Y);
console.log(age.M);
console.log(age.D);
