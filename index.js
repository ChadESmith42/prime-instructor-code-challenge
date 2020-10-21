// Starting dataset;
// Notice the money values are based on CENTS, not dollars. This makes more sense (no pun intended) for
// larger apps. I did it out of habit. It adds some complexity, especially as the wire frames require special
// formatting. In a "modern" framework (like Angular), there are built-in functions to transform numbers into currency.
const employees = new Array(
    {
        FirstName: "Jen",
        LastName: "Barber",
        Id: 4521,
        Title: "Team Lead",
        AnnualSalary: 8000000
    },
    {
        FirstName: "Maurice",
        LastName: "Moss",
        Id: 8724,
        Title: "Support Team",
        AnnualSalary: 5800000
    },
    {
        FirstName: "Roy",
        LastName: "Smith",
        Id: "9623",
        Title: "Quality Assurance",
        AnnualSalary: 4800000
    }
);

// Set some 'global' constants for document:
const table = document.getElementById("employeeTable");
const tableBody = document.getElementById("tableBody");
const totalSalary = document.getElementById("monthlyTotal");
const warning = document.getElementById("warning");
const maxSalary = 2000000; // $20,000.00 as pennies!

// execute main function on load;
window.onload = () => {
    DisplayPage();
}


// This function displays or refreshes the page. It's sole purpose is to
// ensure the page displays correctly. To do that, it must call several
// functions.
function DisplayPage() {
    tableBody.innerHTML = ""; // Reset table for data refresh!
    DisplayTable();
    FormatAnnualSalary();
    DisplayTotalSalary(employees);
}

//#region Handle Employee Data

// Add new employee to employees array (data);
function SubmitEmployee() {
    const data = NewEmployeeFromForm();
    AddEmployeeToList(data);
   DisplayPage();
}

// Create employee object from form values;
function NewEmployeeFromForm() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const annualSalary = LaunderMoney(document.getElementById("annualSalary").value);

    return new Employee(firstName, lastName, id, title, annualSalary);
}

// Add employee object to employees array;
function AddEmployeeToList(employee) {
    if (employee.Id) {
        employees.push(employee);
    }
}

// Remove employee from records
function DeleteEmployeeRecord(employeeId) {
    let index = employees.findIndex(employee => employee.Id === employeeId);
    employees.splice(index, 1);
}

//#endregion Handle Employee Data

//#region Inject Table Data into DOM

// Create the rows for the table;
function DisplayTable() {
    for (const employee of employees) {
        const newRow = tableBody.insertRow();
        newRow.className = "employee";
        const data = Object.values(employee);
        for (const datum of data) {
            const cell = newRow.insertCell();
            cell.innerHTML = datum;
        }
        const deleteButton = newRow.insertCell();
        deleteButton.appendChild(AddDeleteButton(employee.Id));
    }
}

// Format the annual salary in the table as US currency;
function FormatAnnualSalary() {
    const employees = document.getElementsByClassName("employee"); // Get rows with employee data;
    let salary; // holder variable for table cell;
    for (const employee of employees) {
        salary = employee.childNodes[4]; // Cell reference by index;
        const amount = salary.innerText;
        if (amount.toString().indexOf("$") === -1) { // If the salary is not already formatted ...
            salary.innerText = FormatUSDollars(amount);
        }
    }
}

// Just in case a user decides to get fancy with the input, this function
// filters the amount and only returns the numeric characters.
function LaunderMoney(amount) {
    const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
   for (i = 0; i < amount.length, i++;) {
        let check = amount[i]; // Get the character
        if (!numbers.includes(check)) { // If it's not a number ...
            amount.splice(i, 1); // Remove it from the value
        }
   }
   return Math.floor(amount); // Revert amount from array to number;
}

// Create delete button that references the employee record by employeeId
function AddDeleteButton(employeeId) {
    const button = document.createElement("input");
    button.type = "button";
    button.className = "delete-button";
    button.id = `deleteEmployee-${employeeId}`;
    button.value = "Delete";
    button.onclick = () => { // Notice this doesn't appear in the HTML, unlike the "Submit" button
        DeleteEmployeeRecord(employeeId);
        DisplayPage();
    }
    return button;
}

//#endregion Inject Table Data into DOM

//#region Total Salaries

// Core function for calculator
function DisplayTotalSalary(employees) {
    let salary = TotalMonthlySalary(employees);
    DisplayWarning(salary);
    salary = FormatUSDollars(salary);
    document.getElementById("monthlyTotal").innerText = salary;
}

// Display the warning message that the maximum monthly salary has been exceeded.
function DisplayWarning(totalSalary) {
    warning.innerHTML = "";
    if (maxSalary <= totalSalary) {
        AddWarningMessage();
    }
}

// Total all salaries from employee array;
function TotalMonthlySalary(employees) {
    let total = 0;
    for (let employee of employees) {
        total += employee.AnnualSalary;
    }
    return (total / 12);
}

// Inject the Warning Message into the DOM;
function AddWarningMessage() {
    const warning = document.getElementById("warning");
    warning.innerHTML = `
    <h3 class="warning-header">Monthly Salary of $20,000 Exceeded!</h3>
    <p class="warning-text">
        The total monthly salary exceeds the limit of $20,000.
    </p>
    `;
}

// Format salary into dollar format.
function FormatUSDollars(salary) {
    return `$${(salary / 100).toLocaleString("en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    )}`;
}

//#endregion Total Salaries

// Employee class for creating new records. (It's a habit from too much Typescript!)
class Employee {
    constructor(firstName, lastName, id, title, annualSalary) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Id = id;
        this.Title = title;
        this.AnnualSalary = annualSalary;
    }
}
