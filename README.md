# Fresh Prints Tech Challenge!!

## Introduction
Hello fellow coders. Welcome to the Fresh Prints coding challenge!
Here, we will give you what you need to get started.

#### Getting set up
1. Install node
2. git clone https://github.com/adamhpan/FP-Tech-Challenge.git

#### To start the application
1. Run "npm install" to download dependencies
2. Run "npm start" to start the server

## Challenge Specifications
1. You need to get the list of available apparel from our database (the connection is already set up for you, you just have to query the apparel table). The quoting should take in a couple of parameters:
	- The apparel style code
	- The apparel color
	- The apparel size
	- The number of apparel that will be ordered
2. Once all the parameters are passed in through the interface the quoter will reference the apparel provider's api for the pricing (API documentation below)
3. Then you have to add the cost of shipping which if the shipping weight is <= '0.4' then it should be 1.00 per item for quantities under 48 pieces, and $0.75 for quantities 48 items or more. If the shipping weight > '0.4' then it it should be $0.50 for quantities under 48
and $0.25 for quantities 48 or more.
4. It then must make a calculation for the salesman compensation which adds 7% to the final order cost.
5. Then the function takes the calculated cost and marks it up. The mark up percentage should be dependent on the total order cost (quantity*individual cost). If the total cost is $800 or less, markups by 50%. If the total order cost is more than $800 markup by 45%. The interface should show a quote price per item and a total price based on the parameters passed through. Make sure you have a way to list the prices after every mathematical operation for grading/debugging purposes.
6. Remember that this is a full stack test so instead of focusing solely on the backend, you should also make the frontend look nice.

#### Just in case you have some free time after - not required
Sometimes, the manager quoting the prices needs to chat with the quoting team about the price for special types of shirts.
If you want to go above and beyond, try creating a real time chat system they could use.

#### Complete the following files to finish the challenge
1. public/js/controller.js
2. routes/api.js
	You need to complete the two API end points and the Inventory check function.
3. views/index.jade
	You only need one view for this project. Insert HTML code where the comment tag is located.
	Bonus points if you use jade code for this project instead of html.
4. public/css/app.css
	A bootstrap CDN is also imported by default

## We included a few tools to help you
#### MYSQL driver
We have set up a read only connection to a MYSQL database containing apparel and printing cost information.
To query the mysql database, use the connection object that is imported in api.js.
Here is an example:

    db.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;

      console.log('The solution is: ', rows[0].solution);
    });

More examples can be found here: https://github.com/felixge/node-mysql

#### Inventory Check API Documentation
https://docs.google.com/document/d/12ELHIBwOnSleMhXTwceuviE9MY4zQ-VZS2ymO8F0Rpo/edit#

We wish you the best.

## Acknowledgements

The following seed is forked from https://github.com/btford/angular-express-seed and modified.
Outdated imports were updated for simplicity.
