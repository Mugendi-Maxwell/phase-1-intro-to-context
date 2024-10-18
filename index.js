// Your code here

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
  };
}


function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}


function createTimeInEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour)
  });
  return employeeRecord;
}


function createTimeOutEvent(employeeRecord, dateTime) {
  const [date, hour] = dateTime.split(' ');
  employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour)
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}


function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  return hoursWorked * employeeRecord.payPerHour;
}


function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
}


const employeeData = [
  ["John", "Doe", "Software Engineer", 25],
  ["Jane", "Smith", "Product Manager", 30]
];

const employees = createEmployeeRecords(employeeData);
createTimeInEvent(employees[0], "2024-10-18 0900");
createTimeOutEvent(employees[0], "2024-10-18 1700");
createTimeInEvent(employees[1], "2024-10-18 1000");
createTimeOutEvent(employees[1], "2024-10-18 1800");

console.log("Employee 1 wages on 2024-10-18:", wagesEarnedOnDate(employees[0], "2024-10-18"));
console.log("Employee 2 wages on 2024-10-18:", wagesEarnedOnDate(employees[1], "2024-10-18"));
console.log("Total payroll:", calculatePayroll(employees));

  
  