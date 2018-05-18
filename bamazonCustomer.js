var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require('chalk');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Goodluck#1",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        return console.log(err);
    }
    querybamazon();
});

function querybamazon() {
    console.log(chalk.blue(`
    ____  ___    __  ______ _____   ____  _   __
   / __ )/   |  /  |/  /   /__  /  / __ \/ | / /
  / __  / /| | / /|_/ / /| | / /  / / / /  |/ /
 / /_/ / ___ |/ /  / / ___ |/ /__/ /_/ / /|  /
/_____/_/  |_/_/  /_/_/  |_/____/\____/_/ |_/
`));
    console.log(chalk.yellowBright.bold('Items up for sale'));
    console.log("------------------");
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | Unit Price: $" + res[i].price + " | Units Remaining: " + res[i].stock_quantity);
            console.log(chalk.blue("------------------"));
        }
        buyItem();
    });
}

var buyItem = function() {
    inquirer.prompt([{
        type: "input",
        message: "Enter the ID of the product you would like to buy",
        name: "item"
    }, {
        type: "number",
        message: "How many units would you like to buy?",
        name: "stock_quantity"
    }]).then(function(argument) {
        connection.query("SELECT stock_quantity, price, product_name FROM products WHERE item_id = ?", [argument.item], function(err, res) {
            var numSold = argument.stock_quantity;
            var totalCost = res[0].price * numSold;
            var newQuantity = parseInt(res[0].stock_quantity - numSold);
            if (err) {
                return console.log(err);
            }
            if (res[0].stock_quantity < argument.stock_quantity) {
                return console.log("ERROR: Insufficient store quantity.");
            }
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, argument.item]);
            console.log("Your order for " + numSold + " units of " + res[0].product_name + " has been placed.");
            console.log("You spent $" + totalCost + " on your purchase.");
            console.log("Thank you for shopping with Bamazon. Logging you out now. Please come again.");
            connection.end();
        });
    });
};