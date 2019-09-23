# Wunderlist2.0 Back-End




###

**/--------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**/ ----------------------------------------------- /**
**/ -----           USER Request's           ------ /**
**/ ----------------------------------------------- /**

**Register a User**
_method url_: `/api/users/register`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description    |
| ------------ | ------ | -------- | -------------- |
| `username`   | String | Yes      | Must be unique |
| `password`   | String | Yes      |                |

#### Example of the body

```
  {
    "username": "joeYoung",
    "password": "password",
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "user": {
        "id": 3,
        "username": "joeYoung",
        "password": "password",
        "role": "admin",
        "created_at": "2019-09-22 23:08:06"
    }
}
```

##### 412 (Preconditon Failed)

```
  {
    "message": "One or more inputs missing... username, password"
  }
```

##### 500 (Preconditon Failed)

```
  {
    "message": "Error registering User."
  }
```

**/----------------------------------------/**

### **Login a user**

_method url_: `/api/users/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      |                         |

#### Example of the Body

```
  {
    "username": "joeYoung",
    "password": "password",
  }
```

#### Response

##### 200 (ok)

> no issues logging in

###### Example response

```
{
    "message": "Welcome joeYoung!",
    "user": {
        "id": 1,
        "username": "joeYoung",
        "password": "$2a$10$w3ISacmbCI0Rg9tGfJH2Rel/RYsjHbYLVXNXdAhwR4ji58qGA2bWW",
        "role": "admin",
        "created_at": "2019-09-23 02:47:39"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiam9lWW91bmciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NjkyMDY5NzMsImV4cCI6MTU2OTI5MzM3M30.OqfjKK3v4wROSiF29UKicEP5BejhaZ0v0a2UFTp3jYQ"
}
```

##### 405 (Method Not Allowed)

```
  {
    message: "Missing an important input.. either the username or the password, please try again"
  }
```

##### 401 (UnAuthorized)

```
{
  message: 'User credentials invalid, please register...'
}
```

##### 500 (Bad Request)

```
{
  message: "Error Logging in User"
}
```

**/--------------------------------------------/ USER ROUTES /-----------------------------------/**

### **Get all Users ('admin' only)**

_method url_: `/api/users/`

_http method_: **[GET]**

#### Headers

| name            | type    | required | description                   |
|  -------------- | ------  | -------- | ------------------------      |
| `Authorization` | token   | Yes      | Must have a 'role' of 'admin' |

#### Response

##### 200 (ok)

###### Example response

```
[
    {
        "id": 1,
        "username": "joeYoung",
        "password": "$2a$10$w3ISacmbCI0Rg9tGfJH2Rel/RYsjHbYLVXNXdAhwR4ji58qGA2bWW",
        "role": "admin",
        "created_at": "2019-09-23 02:47:39"
    },
    {
        "id": 2,
        "username": "PistolPete",
        "password": "$2a$10$DZ.9yeACZUqdwAcnahMcWe1clPNuALcvYlK7EZ0PRUBvoPPhr7IsG",
        "role": "user",
        "created_at": "2019-09-23 03:36:56"
    }
]
```

**/----------------------------------------/**

### **Get a single User  ('admin' only)**

_method url_: `/api/users/:user_id`

_http method_: **[GET]**

#### Headers

| name            | type    | required | description                   |
|  -------------- | ------  | -------- | ------------------------      |
| `Authorization` | token   | Yes      | Must have a 'role' of 'admin' |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 1,
    "username": "joeYoung",
    "password": "$2a$10$w3ISacmbCI0Rg9tGfJH2Rel/RYsjHbYLVXNXdAhwR4ji58qGA2bWW",
    "role": "admin",
    "created_at": "2019-09-23 02:47:39"
}
```
**/----------------------------------------/**


**/ ----------------------------------------------- /**
**/ -----        TO-DO ITEM Request's        ------ /**
**/ ----------------------------------------------- /**

### **Get a User with all TO-DO Items**

_method url_: `/api/users/:user_id/items (restricted)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 2,
    "username": "PistolPete",
    "password": "$2a$10$DZ.9yeACZUqdwAcnahMcWe1clPNuALcvYlK7EZ0PRUBvoPPhr7IsG",
    "role": "user",
    "created_at": "2019-09-23 03:36:56",
    "toDoItems": [
        {
            "id": 1,
            "item_name": "gym",
            "item_description": "Go to the gym after work"
        },
        {
            "id": 2,
            "item_name": "meal prep",
            "item_description": "prepare meals for the week"
        },
        {
            "id": 3,
            "item_name": "nightly journal",
            "item_description": "write about how the day went and how you can improve for the next day"
        }
    ]
}
```

##### 400 (Forbidden)

###### Example Response

```
{
    "message": "No token provided, must be set on the Authorization Header"
}
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the User with that given id."
}
```
**/----------------------------------------/**

### **Add a To-Do Item**

_method url_: `/api/users/:user_id/items (restricted)`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name               | type   | required | description             |
| ----------         | ------ | -------- | ----------------------- |
| `item_name`        | String | Yes      | Must be unique          |
| `item_description` | String | Yes      |                         |

#### Example of the Body

```
{
    "item_name": "nightly journal",
    "item_description": "Write about how the day went and how you can improve for the next day"
}
```

#### Response

##### 201 (Created)

###### Example response

```
{
    "id": 3,
    "user_id": 2,
    "item_name": "nightly journal",
    "item_description": "write about how the day went and how you can improve for the next day",
    "created_at": "2019-09-23 06:40:18"
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the User with that given id."
}
```

##### 417 (Expectation Unmet)

###### Example Response

```
{
  message: "Required information has not been met."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to create new to-do Item."
}
```

**/----------------------------------------/**

### **get a single To-Do Item**

_method url_: `/api/users/:user_id/items/:item_id (restricted)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 2,
    "user_id": 2,
    "item_name": "meal prep",
    "item_description": "prepare meals for the week",
    "created_at": "2019-09-23 06:39:13"
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the to-do Item with that given id."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to get to-do Item."
}
```

**/----------------------------------------/**

### **Update a To-Do Item**

_method url_: `/api/users/:user_id/items/:item_id (restricted)`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name               | type   | required | description             |
| ----------         | ------ | -------- | ----------------------- |
| `item_name`        | String | Yes      | Must be unique          |
| `item_description` | String | Yes      |                         |

#### Example of the Body

```
{
    "item_name": "nightly journal",
    "item_description": "Write about how the day went and how you can improve for the next day"
}
```

#### Response

##### 200 (OK)

###### Example response

```
{
    "updatedItem": 1
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the to-do Item with that given id."
}
```

##### 417 (Expectation Unmet)

###### Example Response

```
{
  message: "Required information has not been met."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to Update to-do Item."
}
```

**/----------------------------------------/**

### **Delete a To-Do Item**

_method url_: `/api/users/:user_id/items/:item_id (restricted)`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (OK)

###### Example response

```
{
    "removed": 1
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the to-do Item with that given id."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to delete to-do Item."
}
```

**/----------------------------------------/**


**/ ----------------------------------------------- /**
**/ -----        TO-DO ITEM Request's        ------ /**
**/ ----------------------------------------------- /**

### **Get a User with all To-Do Dates**

_method url_: `/api/users/:user_id/dates (restricted)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (OK)

###### Example response

```
{
    "id": 2,
    "username": "PistolPete",
    "password": "$2a$10$DZ.9yeACZUqdwAcnahMcWe1clPNuALcvYlK7EZ0PRUBvoPPhr7IsG",
    "role": "user",
    "created_at": "2019-09-23 03:36:56",
    "doDates": [
        {
            "id": 1,
            "item_name": "gym",
            "item_description": "Go to the gym after work",
            "do_date": "2019-09-24",
            "do_time": "03:33:35",
            "completed": 0,
            "created_at": "2019-09-23 06:38:35"
        },
        {
            "id": 2,
            "item_name": "nightly journal",
            "item_description": "write about how the day went and how you can improve for the next day",
            "do_date": "2019-09-25",
            "do_time": "03:33:35",
            "completed": 0,
            "created_at": "2019-09-23 06:40:18"
        },
        {
            "id": 3,
            "item_name": "nightly journal",
            "item_description": "write about how the day went and how you can improve for the next day",
            "do_date": "2019-09-26",
            "do_time": "03:33:35",
            "completed": 0,
            "created_at": "2019-09-23 06:40:18"
        },
        {
            "id": 4,
            "item_name": "nightly journal",
            "item_description": "write about how the day went and how you can improve for the next day",
            "do_date": "2019-09-27",
            "do_time": "03:33:35",
            "completed": 0,
            "created_at": "2019-09-23 06:40:18"
        }
    ]
}
```

##### 400 (Forbidden)

###### Example Response

```
{
    "message": "No token provided, must be set on the Authorization Header"
}
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the User with that given id."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to get Do Dates."
}
```

**/----------------------------------------/**

### **Add a To-Do Date**

_method url_: `/api/users/:user_id/items/:item_id/dates (restricted)`

_http method_: **[POST]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name        | type    | required | description                                             |
| ----------  | ------  | -------- | -----------------------                                 |
| `do_date`   | String  | Yes      | Must be unique                                          |
| `do_time`   | String  | Yes      |                                                         |
| `completed` | boolean | Yes      | defaults to false, and it returns binary, so 0 = false  |
|             |         |          | and 1 = true                                            |

#### Example of the Body

```
{
	"do_date": "2019-09-27",
	"do_time": "03:33:35",
    "completed": true
}
```

#### Response

##### 201 (Created)

###### Example response

```
{
    "id": 4,
    "list_item_id": 3,
    "do_date": "2019-09-27",
    "do_time": "03:33:35",
    "completed": 0
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the User with that given id."
}
```

##### 417 (Expectation Unmet)

###### Example Response

```
{
  message: "Required information has not been met, or the to-do item with that id does not exist."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to add Item to Date."
}
```

**/----------------------------------------/**

### **get a single To-Do Date**

_method url_: `/api/users/:user_id/dates/:date_id (restricted)`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (ok)

###### Example response

```
{
    "id": 2,
    "list_item_id": 3,
    "do_date": "2019-09-25",
    "do_time": "03:33:35",
    "completed": 0
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the do Date with that given id."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to get do Date."
}
```

**/----------------------------------------/**

### **Update a To-Do Date**

_method url_: `/api/users/:user_id/dates/:date_id (restricted)`

_http method_: **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `authorization` | String | Yes      | token to Authorize user  |

#### Body

| name        | type    | required | description                                             |
| ----------  | ------  | -------- | -----------------------                                 |
| `do_date`   | String  | Yes      | Must be unique                                          |
| `do_time`   | String  | Yes      |                                                         |
| `completed` | boolean | Yes      | defaults to false, and it returns binary, so 0 = false  |
|             |         |          | and 1 = true                                            |

#### Example of the Body

```
{
	"do_date": "2019-09-26",
	"do_time": "03:33:35",
    "completed": false
}
```

#### Response

##### 200 (OK)

###### Example response

```
{
    "updatedDate": 1
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the do Date with that given id."
}
```

##### 417 (Expectation Unmet)

###### Example Response

```
{
  message: "Required information has not been met."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to Update do date."
}
```

**/----------------------------------------/**

### **Delete a To-Do Date**

_method url_: `/api/users/:user_id/dates/:date_id (restricted)`

_http method_: **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `authorization` | String | Yes      | token to Authorize user  |

#### Response

##### 200 (OK)

###### Example response

```
{
    "removed": 1
}
```

##### 400 (UnAuthorized)

###### Example Response

```
  {
    message: 'No token provided, must be set on the Authorization Header'
  }
```

##### 401 (Forbidden)

###### Example Response

```
{
    "message": "User not verified"
}
```

##### 404 (Not Found)

###### Example Response

```
{
    "message": "Could not find the do Date with that given id."
}
```

##### 500 (Server Error)

###### Example Response

```
{
  message: "Failed to delete do Date."
}
```

**/----------------------------------------/**