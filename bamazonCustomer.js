var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "gammaHOTEL911",
    database: "bamazon_DB"
});

function app() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'user',
            message: '\n'+ "Hello! Please enter your username:",

        }]).then(name => {
            const user = name.user;

            console.log("\n" + "Hello, " + user + '\n' );
            console.log("\n"+" lets show you the inventory, just press enter when you're done looking and ready to check out!" + "\n" + "\n");

            function start() {
                inquirer.prompt([
                    {
                        name: 'continue',
                        message: '\n' 
                    },
                    {
                        name: "ready for checkout? hit enter",
                        message: inventory()
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

                    }]).then(answers => {

                        var item = answers.item_id;
                        var quantity = answers.quantity;

                        var queryStr = 'SELECT * FROM products WHERE ?';


                        connection.query(queryStr, { item_id: item }, function (err, data) {
                            if (err) {
                                return (err)
                            }

                            else if (data.length === 0) {
                                console.log('ERROR: Invalid Item ID. Please review the inventory and select a valid Item ID.');
                                inventory();
                            } else {
                                var products = data[0];
                                var total= Math.round(products.price * quantity).toFixed(2);

                            }
                            if (quantity <= products.stock_quantity) {
                                console.log("---------------------------------------------------------------------\n" + '\n');
                                console.log("Excellent choice, " + user + "! Proceeding to checkout." + '\n');
                                console.log("---------------------------------------------------------------------\n" + '\n');


                                var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (products.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                                connection.query(updateQueryStr, function (err, data) {
                                    if (err) throw err;
                                    console.log('Your order has been sucessfully placed!' + '\n' + '\n' + 'Your total is $' + total);
                                    console.log('\n');

                                    console.log("thank you, " + user + "!!")
                                    console.log("---------------------------------------------------------------------\n");

                                    connection.end();
                                });
                            } else {
                                console.log('Sorry, that item is all out of stock!' + '\n');
                                
                                start();
                                name.item_id;
                            }
                        })
                    })

            }
            start();

        })
}




function inventory() {
    setTimeout(function () {
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
    }, 2000)
    console.log("\n");
}

app();

