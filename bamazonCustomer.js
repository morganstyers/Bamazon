var inquirer = require('inquirer');
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gammaHOTEL911",
    database: "bamazon_DB"
});

inquirer.prompt([
    {
        type: 'input',
        name: 'user',
        message: "Hello! Please enter your username:",
    },

    {
        type: 'input',
        name: 'item_id',
        message: 'Please enter the Item ID which you would like to purchase.',
        filter: Number
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        filter: Number
    }]).then(input => {
        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, data) {
            if (err) throw err;
            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
            }
        })
    })



