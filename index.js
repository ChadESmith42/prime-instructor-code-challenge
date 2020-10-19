// Starting dataset - would come via API call in prod;
const employees = [
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
];

// Set some 'global' constants for document:
const table = document.getElementById('employeeTable');
const tableBody = document.getElementById('tableBody');
const totalSalary = document.getElementById('monthlyTotal');

const maxSalary = 2000000; // $20,000.00 as pennies!

// execute main function on load;
main();

function main() {
    DrawTable();
    DisplayTotalSalary(employees);
}

// Create a new Employee object in the table;
function SubmitEmployee() {
    const data = GetFormData();
    AddEmployeeToList(data);
    DrawTable();
}

function GetFormData() {
    const firstName = document.getElementById("firstName").value;
    console.log("First Name: ", firstName);
    const lastName = document.getElementById("lastName").value;
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const annualSalary = document.getElementById("annualSalary").value;

    const employee = new Employee(firstName, lastName, id, title, annualSalary);
    return employee;
}

function AddEmployeeToList(employee) {
    if (employee.Id) {
        employees.push(employee);
    }
}

function DrawTable() {

}

function DrawEmployeeList(employeeList) {
}

function DrawEmployeeRow(employee, index) {}

function DisplayTotalSalary(employees) {
    let salary = TotalMonthlySalary(employees);
    salary = FormatSalary(salary);
    document.getElementById('monthlyTotal').innerText = salary;
}

// Total all salaries.
function TotalMonthlySalary(employeeList) {
    let total = 0;
    for (let employee of employeeList) {
        total += employee.AnnualSalary;
    }
    // Returns precise average, can have more than 2 decimal places!
    return (total / 12);
}

// Format salary into dollar format. Works in evergreen browsers.
function FormatSalary(salary) {
    return '$' + (salary / 100).toLocaleString('en-US',
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );
}


// // Create the table from employee data
// function DrawTable() {
//     const table = document.getElementById('employeeTable');
//     const rows = table.rows;
//     console.log(rows);
//     console.log(table);
//     table.remove(rows);
//     for (let index = 0; index < employees.length; index++) {
//         // Don't redraw existing rows
//         let createNewRow = document.getElementById(`row-${index}`) ? false : true;
//         if (createNewRow) {
//             table.insertRow(index);
//             let newRow = DrawRow(employees[index], index);
//             newRow.setAttribute("id", `row-${index}`);
//             table.appendChild(newRow);
//         }
//     }
// }

// function DrawRow(employee, index) {
//     let row = document.createElement("tr");
//     row.setAttribute("id", `employee-${employee.Id}`)
//     let emps = new Map(Object.entries(employee));
//     for (let e of emps) {
//         const cell = row.insertCell();
//         cell.innerHTML = e[1];
//     }
//     let deleteCell = row.insertCell();
//     deleteCell.id = "delete-button-cell";
//     const button = document.createElement("input");
//     button.type = "button";
//     button.className = "delete-button";
//     button.id = `deleteEmployee-${index}`;
//     button.value = "Delete";
//     button.onclick = () => {
//         return DeleteTableRow(index);
//     }
//     deleteCell.append(button);
//     return row;
// }

// function DeleteTableRow(index) {
//    let row = document.getElementById(`row-${index}`);
//    if (row) {
//        const table = document.getElementById("employeeTable");
//        table.removeChild(row);
//    }
//    const fired = employees.indexOf(emp => { `employee-${emp.Id}` === row.id });
//    employees.splice(fired, 1);
//    console.log(employees);
// }

// function totalSalary() {
//     let salaries = (employees) => {
//         const s = [];
//         employees.map((key, value) => {
//             if (key === "annualSalary") {
//                 s.push(value);
//             }
//         });
//     }
//     return salaries.s;
// }

class Employee {
    constructor(firstName, lastName, id, title, annualSalary) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Id = id;
        this.Title = title;
        this.AnnualSalary = annualSalary;
    }
}
