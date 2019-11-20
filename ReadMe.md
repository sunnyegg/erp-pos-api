# ERP POS

## Installation

```bash
$ git clone https://github.com/sunnyegg/erp-pos-api
$ cd [folder]
$ npm install
```

## Environment Variables

```bash
$ nano .env
```

Example:

```
SERVER_PORT = 3333 // Port where your server is listen to

DB_HOST = localhost // Host of your MySQL DB
DB_USER = root // User of your MySQL DB
DB_PASSWORD = root // Password of your user in MySQL DB
DB_DATABASE = erp-pos // Name of your database in MySQL DB

SECRET_KEY = thisissecretkey // Secret key for JWT
```

## Start

```bash
$ npm start
```

## Features

- CRUD Menu (+Search by name)
- CRUD Order
- CRUD User (Staff)
- CRUD Customer
- CRUD Transaction
