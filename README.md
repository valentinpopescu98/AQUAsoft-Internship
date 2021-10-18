# aquasoft-internship
Tasks I solved during my AQUAsoft internship:

**Task 1:
This task is to learn / recap some basic notions of JavaScript that are used in our projects.**

1. ES6 methods - go through each one and what each one entails;
2. The difference between var, let, const;
3. Spread operator;
4. Objects - how to iterate an object, deep copy;
5. Arrays - accessor, iteration, mutator methods (go through each one and how to use them);
6. Promise, callback;
7. Async, await;
8. Closures.

**Task 2:
The back-end task consists in creating an Express project with the following requirements:**

1. Install node, npm, express, mysql and all related packages;
2. Creating a database consisting of 1 table (for MySQL), with the below structure;
3. Inserting test data in the database (MySQL Workbench for MySQL);

For the REST API with Express:
4. Creation of the Express project to access the database using the sequelize module (for MySQL);
5. Creation of REST services for the "Employees" table:
* 2 GET routes (extraction of all elements from the table of employees / of a single employee by name),
* 1 POST route (insertion of a new employee),
* 1 PUT route (update of an employee by primary key),
* 1 route DELETE (remove by primary key);

6. Testing of the REST services using Postman.

The "Employees" table will have the following structure:
Name: Employees
Columns / Fields:
* Id
* Name varchar(45)
* Address varchar(45)
* Email varchar(45)
* Hire_date datetime
* Salary int
* Job_Title varchar(45)

**Task 3:
The new back-end task consists in creating an Express project that handles operations with multiple related databases.**

A new "Projects" table will be added to the existing database. Using this table, we will create:
* 1 GET / queries route (extracting all elements from the project table),
* 1 POST / mutation route (insertion of a new project),
* 1 PUT / mutation route (update of a project by primary key),
* 1 DELETE / mutation route (remove by primary key / id).

Also, in the already existing "Employees" table, a new "project_id" column will be added which will represent a FOREIGN KEY to the "Projects" table. Using this new link we will add a new GET / query route through which an employee will be extracted with the project assigned to him (join between the two tables).

The "Projects" table will have the following structure:
Name: Projects
Columns / Fields:
* Id
* Project_name varchar(45)
* Start_date datetime
* Planned_end_date datetime
* Description varchar(45)
* Project_code varchar(45)

**Task 4:
This task involves creating a React (+ Redux) application.**

The application must include 2 pages. The first page will contain a table with all the employees from the database, while the second will contain a table with all the existing projects.
On each table it will be possible to perform the following operations: add, update, delete (either through adjacent dialogs, or directly on the table).
Navigation between pages will be done using a navbar (routing).
CSS will also be added to make the application prettier.
To connect the frontend and the backend, you will use CORS.

**Task 5:
This task combines the previous tasks in a single app.**

1. A new "Accounts" table will be added to the existing database. Using this table, we will create:
* 1 GET / queries route (log into an existing account by the username and the password),
* 1 POST / mutation route (create a new account);

2. There will be 2 new pages in the frontend:
* One for the log in page,
* One for the register;

3. After the backend and the frontend of the app are implemented for the "Accounts" table, the backend and the frontend of the "Employees" and "Projects" tables (from the previous task) will be added to the app;
4. The structure of the frontend will be modified, so the navbar will not be shown in the Log in / Register pages;
5. A new feature will be implemented to block the acces for the "Employees" and "Projects" pages if the user is not logged in both in the frontend as in the backend.

The "Accounts" table will have the following structure:
Name: Accounts
Columns / Fields:
* Id
* Username varchar(45)
* Password varchar(255)
* Email varchar(45)
