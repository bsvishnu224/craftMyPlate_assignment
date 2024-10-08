Use 'npm install' to install the packages.

Use "npm run dev" to run the server.



API1


    > For user Register
    > Path:"/user/register"
    > method: POST
    > request:
            {
                "username":"anil",
                "email":"anil123@gmail.com",
                "password":"vishnu224"
            }
    NOTE: above request details are reference.you can use your own username,email,password


API2


    > For user Login
    > Path: "/user/Login"
    > method: POST
    > request:
            {

                "email":"anil123@gmail.com",
                "password":"anil123"
            }
    NOTE: above request details are reference.you can use your registered 'email' and 'password'
API3

    > For profile update
    > path: "/user/profile"
    > method: PUT

    NOTE : user's "jwt token" required.
    
API4

    > To get the user's profile
    > path: "/user/profile"
    > method: GET
    
    NOTE : user's "jwt token" required.

API5

    > For vendor register
    > path: "/vendor/register"
    > method: POST
    > request: 
            {
                "username":"vishnu",
                "email":"vishnu@gmail.com",
                "password":"vishnu123"
            }
    > NOTE:above request details are reference

API6 

    > For vendor Login
    > path:"/vendor/login"
    > method : POST
    > request:
            {
                "email":"vishnu@gmail.com",
                "password":"vishnu123"
            }
    > NOTE : above request details are reference

API7

    > For creating a Restaurant
    > path: "/restaurants"

    > method: POST

    >request: 
            {

                "restaurantName":"bawarchi",
                "location":"hydarabad",
                "category":["non-veg"],
                "region":["South-indian","North-indian"],
                "image":"example.jpg"
            }
    NOTE : 1.above request details are reference
           2.vendor's "jwt token" required

API8 

    > For updating restaurant
    > path: "/restaurants/{restaurantId}"
    > method: PUT
    > request : give the details what you want to update

API9

    > For adding Items to restaurant
    > path: "/restaurants/{restaurantId}/menu"
    > method: POST
    > request:
            {
                "itemName":"biryani",
                "price":220,
                "category":["main course"],
                "bestseller":true,
                "image":"example.jpg",
                "description":"teasty_biryani",
                "availability":true
            }

    > NOTE : above request details are reference

API 10 

    > For updating Item
    > path:"/restaurants/{restaurantId}/menu/{itemId}"
    > method :PUT
    > request : give the details what you want to update

API 11

    > For creating order
    > path : "/orders"
    > method : POST
    > request: 
            {
                "orderItems":[
                    {
                    "_id": "6704e50b8d65a817f60ae76e",
                    "itemName": "biryani",
                    "price": 230,
                    "category": [
                        "main course"
                    ],
                    "description": "teasty-biryani",
                    "availability": false,
                    "restaurant": [
                        "6704e1e800fac345b53f56eb"
                    ],
                    "__v": 0
                    }
                ],
                "deliveryAddress":"rachapalli",
                "totalCost":220
            }
    NOTE : 1. above request details are reference
           2. user's "jwt token" required

API 12

    > For getting order by orderId
    > path: "/orders/{orderId}"
    > method : GET

API 13

    > For updating order status
    > path: "/orders/{orderId}/status"
    > method: PUT


    NOTE :1.update status accordingly
          2.vendor's "jwt token" required

API 14

    > For getting orders by login user
    > path: "orders"
    > method : GET
    
    NOTE : user's "jwt token" required



    
