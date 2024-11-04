9 assignment
| Number | Order DTO Checklist | Status |
| :----: | ------------------------------------------------------------------------------------------------- | :----: |
| 1 | GET request. Retrieve order data with the provided valid ID should receive code 200 | PASS |
| 2 | GET request. The order with the provided incorrect ID should receive code 400 | PASS |
| 3 | POST request. Create an order with provided correct data should receive code 200 | PASS |
| 4 | POST request. Create an order with provided incorrect data should receive code 400 | PASS |
| 5 | PUT request. Update an order by providing correct data should receive code 200 | PASS |
| 6 | PUT request. Update an order by providing correct data but for the unauthorized user receives 401 | PASS |
| 7 | PUT request. Update an order with incorrect ID but the for the authorized user receives 400 | PASS |
| 8 | DELETE request. Delete an order by providing correct data should receive code 204 | PASS |
| 9 | DELETE request. Delete order by providing an invalid order ID should receive code 400 | PASS |
| 10 | GET request. Login with a valid username and password should receive code 200 and API key | PASS |
| 11 | GET request. Login with missing username and password data should receive code 500 | PASS |

10 assignment
| Number | Loan Application Checklist | Status |
| :----: | --------------------------------------------------------------------------------------------------------------------- | :----: |
| 1 | POST request. Calculate LOW RISK score with valid random data should return code 200 | PASS |
| 2 | POST request. Calculate MEDIUM RISK score with valid random data should return code 200 | PASS |
| 3 | POST request. Calculate HIGH RISK score with valid random data should return code 200 | PASS |
| 4 | POST request. A negative scenario where incomes that do not meet the requirements are below 1, should return 400 | PASS |
| 5 | POST request. A negative scenario where a large loan with a huge debt, is not comparable to income, should return 400 | PASS |
| 6 | POST request. A negative scenario where debt with negative value, should return code 400 | PASS |

11 assignment
| Number | Login Checklist | Status |
| :----: | ----------------------------------------------------------------------------------------------- | :----: |
| 1 | POST request. Incorrect username and password returns code 401 | PASS |
| 2 | POST request. Successful authorization flow with correct username and password returns code 200 | PASS |
| 3 | POST request. Successful authorization returns code 200 and valid JWT | PASS |
| 4 | GET request. Unsuccessful authorization with incorrect HTTP GET method returns code 405 | PASS |

12 assignment
| Number | API Client Checklist | Status |
|:------:|---------------------------------------------------------------------------------------------|:------:|
| 1 | POST request. Authorization without API Client and getting order by provided ID returns 200 | PASS |
| 2 | DELETE request. Authorization without API Client and deleting the order by ID returns 200 | PASS |
| 3 | POST request. Authorization with API Client and getting order by provided ID returns 200 | PASS |
| 4 | DELETE request. Authorization with API Client and deleting the order by ID returns 200 | PASS |
