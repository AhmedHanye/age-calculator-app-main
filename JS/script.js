// Selecting elements from the DOM
let dateLabels = document.querySelectorAll(".date-label");
let dateInputs = document.querySelectorAll(".date-input");
let boxes = document.querySelectorAll(".box");
let calculateButton = document.querySelector("#button");
let outputElements = document.querySelectorAll(".output");

// Function to handle error messages for date input fields
function handleErrorMessage(setError, index, errorClass) {
  if (setError) {
    dateInputs[index].style.borderColor = "var(--color-primary-light)";
    dateLabels[index].style.color = "var(--color-primary-light)";
    boxes[index].classList.add(errorClass);
  } else {
    dateInputs[index].style.borderColor = "";
    dateLabels[index].style.color = "";
    boxes[index].classList.remove(errorClass);
  }
  // Reset output elements
  for (let element of outputElements) {
    element.innerHTML = "- -";
  }
}

// Function to check if any input field is empty
function checkEmptyFields(...values) {
  let result = true;
  for (let i = 0; i < 3; i++) {
    if (values[i].trim().length === 0) {
      // Use parseInt to convert the input to a number for isNaN check
      result = false;
      handleErrorMessage(true, i, "error1");
    } else {
      handleErrorMessage(false, i, "error1");
    }
  }
  return result;
}

// Function to check the validation of the input date
function checkDateValidation(...dateComponents) {
  let result = true;
  let currentDate = new Date();
  const lastYear = new Date(0);

  // Year validation
  if (
    parseInt(dateComponents[2]) !== parseFloat(dateComponents[2]) ||
    parseInt(dateComponents[2]) < lastYear.getFullYear() ||
    parseInt(dateComponents[2]) > currentDate.getFullYear() ||
    isNaN(parseInt(dateComponents[2]))
  ) {
    result = false;
    handleErrorMessage(true, 2, "error2");
  } else {
    handleErrorMessage(false, 2, "error2");
  }

  // Month validation
  if (
    parseInt(dateComponents[2]) === currentDate.getFullYear() ||
    parseInt(dateComponents[1]) !== parseFloat(dateComponents[1]) ||
    parseInt(dateComponents[1]) > currentDate.getMonth() + 1 ||
    parseInt(dateComponents[1]) < 1 ||
    !(12 >= parseInt(dateComponents[1]) && parseInt(dateComponents[1]) >= 1) ||
    isNaN(parseInt(dateComponents[1]))
  ) {
    result = false;
    handleErrorMessage(true, 1, "error3");
  } else {
    handleErrorMessage(false, 1, "error3");
  }

  // Day validation
  const lastDayOfMonth = new Date(
    parseInt(dateComponents[2]),
    parseInt(dateComponents[1]),
    0
  ).getDate();
  if (
    parseInt(dateComponents[0]) !== parseFloat(dateComponents[0]) ||
    !(
      lastDayOfMonth >= parseInt(dateComponents[0]) &&
      parseInt(dateComponents[0]) >= 1
    ) ||
    isNaN(parseInt(dateComponents[0]))
  ) {
    result = false;
    handleErrorMessage(true, 0, "error4");
  } else {
    handleErrorMessage(false, 0, "error4");
  }

  return result;
}

// Function to calculate age based on the provided birth date
function calculateAge(birthDate) {
  let birthday = new Date(birthDate);
  let currentDate = new Date();

  let years = currentDate.getFullYear() - birthday.getFullYear();
  let months = currentDate.getMonth() - birthday.getMonth();
  let days = currentDate.getDate() - birthday.getDate();

  if (days < 0) {
    months--;
    // Calculate the days remaining in the current month
    let lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: years ?? 0,
    months: months ?? 0,
    days: days ?? 0,
  };
}

// Event handler for the calculate button
calculateButton.onclick = () => {
  let dayInput = dateInputs[0].value;
  let monthInput = dateInputs[1].value;
  let yearInput = dateInputs[2].value;

  // Check if any input field is empty
  if (!checkEmptyFields(dayInput, monthInput, yearInput)) {
    return false;
  }

  // Check date validation
  if (!checkDateValidation(dayInput, monthInput, yearInput)) {
    return false;
  }

  // Calculate and display age
  let ageResult = calculateAge(`${yearInput}/${monthInput}/${dayInput}`);
  outputElements[0].innerHTML = ageResult.years;
  outputElements[1].innerHTML = ageResult.months;
  outputElements[2].innerHTML = ageResult.days;
};
