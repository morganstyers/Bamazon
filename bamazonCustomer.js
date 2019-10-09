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
    }]).then(name => {
        const user = name.user;

        inquirer.prompt([
            {
                name: "invent",
                message: "hit enter when you are ready to proceed" + inventory()
            },

            {
                type: 'input',
                name: 'item_id',
                message: name.user + " ," + " please enter the Item ID which you would like to purchase.",
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

    })
function inventory() {
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function (err, data) {
        if (err) throw err;
        var pin = '';
        for (var i = 0; i < data.length; i++) {
            pin = '';
            pin += 'Item ID: ' + data[i].item_id + '  //  ';
            pin += 'Product Name: ' + data[i].product_name + '  //  ';
            pin += 'Department: ' + data[i].department_name + '  //  ';
            pin += 'Price: $' + data[i].price + '\n';

            console.log(pin);

        }
    })
}
