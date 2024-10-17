| Number | Checklist                                                                                                    | Status |
| :----: | ------------------------------------------------------------------------------------------------------------ | ------ |
|   1    | GET request. Retrieve order data with the provided valid ID should receive code 200                          | PASS   |
|   2    | GET request. The order with the provided incorrect ID should receive code 400                                | PASS   |
|   3    | POST request. Create an order with provided correct data should receive code 200                             | PASS   |
|   4    | POST request. Create an order with provided incorrect data should receive code 400                           | PASS   |
|   5    | PUT request. Update an order by providing correct data should receive code 200                               | PASS   |
|   6    | PUT request. Update an order by providing correct data but for the unauthorized user should receive code 401 | PASS   |
|   7    | PUT request. Update an order with incorrect ID but the for the authorized user should receive code 400       | PASS   |
|   8    | DELETE request. Delete an order by providing correct data should receive code 204                            | PASS   |
|   9    | DELETE request. Delete order by providing an invalid order ID should receive code 400                        | PASS   |
|   10   | GET request. Login with a valid username and password should receive code 200 and API key                    | PASS   |
|   11   | GET request. Login with missing username and password data should receive code 500                           | PASS   |
