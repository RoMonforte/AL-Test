
# You can interact with the API REST in the next link:
https://al-test-production.up.railway.app/

# AL-Test

An API Rest from a Test:

We run a physical store which sells (only) 3 products:


| Code     | Name   | Price |                          
| :---:   | :---: | :---: |
| PANTS   | Pants   | $5.00 |
| TSHIRT  | T-Shirt   | $20.00     |
| HAT    | Hat | $7.50    |


Various departments have insisted on the following discounts:
The marketing department believes in 2-for-1 promotions (buy two of the same product, get one
free), and would like for there to be a 2-for-1 special on PANTS items.

The CFO insists that the best way to increase sales is with discounts on bulk purchases (buying
x or more of a product, the price of that product is reduced), and demands that if you buy 3 or
more TSHIRT items, the price per unit should be $19.00.

The checkout process allows for items to be scanned in any order, and should return the total
amount to be paid.

### Examples:
- Items: PANTS, TSHIRT, HAT
 Total: $32.50
- Items: PANTS, TSHIRT, PANTS
  Total: $25.00
- Items: TSHIRT, TSHIRT, TSHIRT, PANTS, TSHIRT
  Total: $81.00
- Items: PANTS, TSHIRT, PANTS, PANTS, HAT, TSHIRT, TSHIRT
  Total: $74.50


### INSTRUCTIONS:
Implement a basic API for our store.
Testing: Unit (chai, jest).
API: Express, Authentication (passport.js)
DB: ORM (Sequelize) Postgresql.
Plus: Graphql, Docker Setup


# Login Endpoints
  https://al-test-production.up.railway.app/api/v1/auth/login  
### For admin login:   
username: admin  
password: admin  

# For create an order:
https://al-test-production.up.railway.app/api/v1/orders  
POST  a JSON with the userId from the user you want a create the order(admin is userId= 1)  
{  
	"userId": 1  
}   

# Add an item to your order:
https://al-test-production.up.railway.app/api/v1/orders/add-item  
POST a JSON with the item you want to add:  
{  
	"orderId": 1,  
	"productCode": "TSHIRT",  
	"amount": 7  
}  

# Remove an item to your order:
https://al-test-production.up.railway.app/api/v1/orders/remove-item  
DEL a JSON with the item you want to remove:  
{  
	"orderId": 1,  
	"productCode": "TSHIRT",  
	"amount": 7  
}  

# Check your order

Check your order and totals:
https://al-test-production.up.railway.app/api/v1/orders/my-orders
