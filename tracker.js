let transactions = [];

// Store the initial balance
let currentBalance = 0;

// Function to set the initial balance
function setInitialBalance() {
  const initialBalanceInput = document.getElementById("initial-balance");
  const initialBalance = parseFloat(initialBalanceInput.value);

  if (!isNaN(initialBalance)) {
    currentBalance = initialBalance;
    initialBalanceInput.value = "";
    updateBalance();
  } else {
    alert("Please enter a valid initial balance.");
  }
}

// Function to add a new transaction
function addTransaction() {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");
  const dateInput = document.getElementById("transaction-date");

  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;
  const date = new Date(dateInput.value);

  if (
    description.trim() === "" ||
    isNaN(amount) ||
    isNaN(date.getTime())
  ) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const transaction = {
    id: Date.now(),
    description,
    amount,
    type,
    date,
  };

  transactions.push(transaction);
  updateBalance();
  updateTransactionTable();

  // Clear the form fields
  descriptionInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
}

// Function to update the balance
function updateBalance() {
  const balanceElement = document.getElementById("balance");
  let total = currentBalance;

  transactions.forEach((transaction) => {
    total += transaction.type === "income" ? transaction.amount : -transaction.amount;
  });

  const currency = document.getElementById("currency").value;
  balanceElement.textContent = formatCurrency(total, currency);
}

// Function to format currency
function formatCurrency(amount, currencyCode) {
  const currencySymbols = { USD: "$", EUR: "€", INR: "₹" };
  const symbol = currencySymbols[currencyCode] || "";
  return `${symbol}${amount.toFixed(2)}`;

}

// Function to update the transaction table
function updateTransactionTable() {
  const table = document.getElementById("transaction-table");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  transactions.forEach((transaction) => {
    const row = table.insertRow();

    const dateCell = row.insertCell();
    dateCell.textContent = transaction.date.toLocaleDateString();

    const descriptionCell = row.insertCell();
    descriptionCell.textContent = transaction.description;

    const amountCell = row.insertCell();
    const currency = document.getElementById("currency").value;
    amountCell.textContent = formatCurrency(transaction.amount, currency);

    const typeCell = row.insertCell();
    typeCell.textContent = transaction.type;

    const actionCell = row.insertCell();
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editTransaction(transaction.id);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteTransaction(transaction.id);

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
  });
}

// Function to edit a transaction
function editTransaction(id) {
  const transaction = transactions.find((t) => t.id === id);
  if (!transaction) return;

  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const typeInput = document.getElementById("type");
  const dateInput = document.getElementById("transaction-date");

  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;
  typeInput.value = transaction.type;
  dateInput.value = transaction.date.toISOString().split("T")[0];

  deleteTransaction(id);
}

// Function to delete a transaction
function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  updateBalance();
  updateTransactionTable();
}

// Function to export transactions to CSV
function exportToCSV() {
    const csvContent = transactions
    .map((t) =>
      `${t.date.toLocaleDateString()},${t.description},${t.amount},${t.type}`
    )
    .join("\n");
  

  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transactions.csv";
  link.click();
}

// Initial update of the table and balance
updateBalance();
updateTransactionTable();
