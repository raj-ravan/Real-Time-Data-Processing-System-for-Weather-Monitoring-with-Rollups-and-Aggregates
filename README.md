Rule Engine Application

Overview
This application is a rule engine that determines user eligibility based on attributes such as age, department, salary, and experience. It uses an Abstract Syntax Tree (AST) to represent and manage conditional rules, allowing for dynamic rule creation, combination, and evaluation.

Features
Create Rules: Define rules using a string format that gets converted into an AST.
Combine Rules: Combine multiple rules into a single AST for more complex evaluations.
Evaluate Rules: Check if the given data meets the criteria defined by the AST.
Tree Visualization: Define or Combine Rule would should show Tree Representation.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Getting Started
Prerequisites
Node.js and npm installed
MongoDB installed and running
Installation
Clone the Repository

git clone "https://github.com/Santosh-2003-sahoo/App1-Rule-Engine-with-AST.git"
cd rule-engine
Install Backend Dependencies

npm install
Start MongoDB

Ensure that MongoDB is running on your local machine:

mongod
Start the Backend Server

nodemon server.js
API Endpoints
Create a Rule
Endpoint: /api/create_rule

Method: POST

Body:

{
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
  "ruleName": "Rule1"
}
use appropriate spaces in Rules for correct results.

Rule should be in follow format: variable operator value

Response:

{
  "_id": "605c72ef1f4e3a001f4d2e9a",
  "rule_name": "Rule1",
  "rule_ast": { ... }
}
Combine Rules

Endpoint: /api/rules/combine_rules

Method: POST

Body:

{
  "ruleIds": ["605c72ef1f4e3a001f4d2e9a", "605c730f1f4e3a001f4d2e9b"]
  "operators: op
}
Response:

{
  "type": "operator",
  "value": operator,
  "left": { ... },
  "right": { ... }
}
Evaluate a Rule

Endpoint: /api/rules/evaluate_rule

Method: POST

Body:

{
  "rule": { ... },
  "data": {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  }
}
Response:

{
  "result": true
}
