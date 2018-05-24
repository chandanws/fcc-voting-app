# REST API 
API written in Express and postgreSQL, JWT for authentication.


## API routes

  * [Get list of polls](#get-list-of-polls)
  * [Create a new poll](#create-a-new-poll)
  * [Get single poll](#get-single-poll)
  * [Delete a poll](#delete-a-poll)
  * [Update polls options](#update-polls-options)
  * [Vote](#vote)
  * [Login](#login)
  * [Register](#register)


### Get list of polls
----

[go back to Top](#rest-api)

  Returns JSON data about all polls.

* **URL**

  /polls

* **Method:**
  
  GET

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `[{ id : 1, title: "Poll1" }, {id: 2, title: "Poll2"}, ... ]`

* **Sample Call:**

  ```
  fetch("/polls", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  ```

### Create a new poll
----

[go back to Top](#rest-api)

  Creates a new poll

* **URL**

  /polls

* **Method:**
  
  `POST`
  
*  **URL Params**

   NONE

* **Data Params**

  * title: string, example: "Best Movie"
  * options: array of strings, example: ["Jurassic Park", "Saw 1", "Random Movie", ...] minimum 2 values

* **Authentication Params**

  `Authorization: Bearer JWT`

* **Success Response:**
  
  Returns URL location of the newly created poll in the Headers Location.

  * **Code:** 201 <br />
    **Content:** `{ }`
    **Headers:** `Location: /polls/{id}
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ status: "fail", data: {authorization: "Missing or Invalid Token}}`

* **Sample Call:**

  ```
  fetch("/polls", {
    method: "POST",
    body: JSON.stringify({title: "Best Movie", options: ["Movie1", "Movie2", "Movie3"]}),
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1Qi...",
      "Content-Type": "application/json"
    }
  });
  ```


### Get single poll
----

[go back to Top](#rest-api)

  Returns JSON data about all polls.

* **URL**

  /polls/:id

* **Method:**
  
  GET

*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 

    ```
    { 
      title: "Poll1", 
      options: 
        [ 
          {option_id: 1, name: "Option1", value: 1}, 
          {option_id: 2, name: "Option2", value: 3},
          {option_id: 3, name: "Option3", value: 0}
        ] 
    } 
    ```

* **Sample Call:**

  ```
  fetch("/polls/4", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  ```

### Delete a poll
----

[go back to Top](#rest-api)

  You must be the creator of the poll to DELETE it.

* **URL**

  /polls/:id

* **Method:**
  
  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  NONE

* **Success Response:**
  
  * **Code:** 204 <br />
    **Content:** NO CONTENT
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
          status: "fail",
          data: { poll: "Poll doesn't exist or invalid token" }
        }`

* **Sample Call:**

  ```
  fetch("/polls/1", {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1Qi...",
    }
  });
  ```

### Update polls options

[go back to Top](#rest-api)

  Authorized users can remove remove or add new options to a poll, even if they did not create the poll.

* **URL**

  /polls/:id

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  **Optional:**

  * **deletedOptions:** array of integer IDs of options  
    example: deletedOptions = [1, 2, 6]

  * **addedOptions:** array of string names for new options  
    example: addedOptions = ["newOption1", "newOption2"]

* **Success Response:**
  
  * **Code:** 204 NO CONTENT <br />
    **Content:** NONE
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ status: "fail", data: {authorization: "Missing or Invalid Token}}`

* **Sample Call:**

  ```
  fetch("/polls/1", {
    method: "PUT",
    body: JSON.stringify({addedOptions: ["NewOption1"], deletedOptions: [ 1,2,3 ] }),
    headers: {
      "Authorization": "Bearer eyJ0eXAiOiJKV1Qi...",
      "Content-Type": "application/json"
    }
  });
  ```


### Vote 
----

[go back to Top](#rest-api)

  Authorized and unauthorized users can vote.

* **URL**

  /polls/:id/vote

* **Method:**
  
  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  **Required:**

  * **option_id:** integer
    example: 2

* **Success Response:**
  
  * **Code:** 204 NO CONTENT <br />
    **Content:** NONE
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      status: "fail",
      data: "Missing option"
    }`

* **Sample Call:**

  ```
  fetch("/polls/1/vote", {
    method: "PUT",
    body: JSON.stringify({option_id: 1}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  ```


### Login
----

[go back to Top](#rest-api)

  Login for already registered users. Returns JWT in authorization header.

* **URL**

  /auth/login

* **Method:**
  
  `POST`
  
*  **URL Params**

   NONE

* **Data Params**

  **Required:**

  * **username:** string
    example: "test"

  * **password:** string
    example: "password"
    

* **Success Response:**
  
  * **Code:** 204 NO CONTENT <br />
    **Content:** NONE
    **Headers:** Authorization: Bearer JWT
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      status: "fail",
      data: {password: "Password is missing."}
    }`

  OR 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      status: "fail",
      data: {username: "Username is missing."}
    }`

  OR

  * **Code:** 404 NOT FOUNT <br />
    **Content:** `{
      status: "fail",
      data: {authorization: "Wrong username or password."}
    }`

* **Sample Call:**

  ```
  fetch("auth/login", {
    method: "POST",
    body: JSON.stringify({username: "user1", password: "pass1"}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  ```

### Register
----

[go back to Top](#rest-api)

  Returns JWT in authorization header.

* **URL**

  /auth/register

* **Method:**
  
  `POST`
  
*  **URL Params**

   NONE

* **Data Params**

  **Required:**

  * **username:** string
    example: "test"

  * **password:** string
    example: "password"
    

* **Success Response:**
  
  * **Code:** 201 CREATED <br />
    **Content:** NONE
    **Headers:** Authorization: Bearer JWT
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      status: "fail",
      data: {password: "Password is missing."}
    }`

  OR 

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      status: "fail",
      data: {username: "Username is missing."}
    }`

  OR

  * **Code:** 409 CONFLICT <br />
    **Content:** `{
      status: "fail",
      data: {username: "Username already taken."}
    }`

* **Sample Call:**

  ```
  fetch("auth/register", {
    method: "POST",
    body: JSON.stringify({username: "user1", password: "pass1"}),
    headers: {
      "Content-Type": "application/json"
    }
  });
  ```
