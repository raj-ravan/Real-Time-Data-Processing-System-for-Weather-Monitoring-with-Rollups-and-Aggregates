# Rule Engine with AST

A powerful rule engine that leverages Abstract Syntax Trees (AST) for dynamic rule creation, combination, and evaluation. Perfect for implementing complex business logic and eligibility criteria in applications.

## Overview

This application serves as a flexible rule engine that determines user eligibility based on various attributes such as age, department, salary, and experience. By utilizing Abstract Syntax Trees (AST), the system provides a robust foundation for representing and managing conditional rules, enabling dynamic rule creation and complex evaluations.

## Features

- **Dynamic Rule Creation**: Define rules using an intuitive string format that automatically converts to AST
- **Rule Combination**: Merge multiple rules into a single AST for complex evaluations
- **Rule Evaluation**: Efficiently process data against defined rule sets
- **Tree Visualization**: Visual representation of rule structures and combinations
- **Flexible Architecture**: Easy integration with existing systems

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Documentation**: OpenAPI/Swagger

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm package manager
- MongoDB (v4.4 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/raj-ravan/Rule-Engine-with-AST.git
cd Rule-Engine-with-AST
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB:
```bash
mongod
```

4. Launch the application:
```bash
nodemon server.js
```

## API Reference

### Create Rule

Create a new rule using a string format.

```http
POST /api/create_rule
```

#### Request Body
```json
{
  "ruleString": "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)",
  "ruleName": "Rule1"
}
```

#### Response
```json
{
  "_id": "605c72ef1f4e3a001f4d2e9a",
  "rule_name": "Rule1",
  "rule_ast": {
    // AST structure
  }
}
```

### Combine Rules

Merge multiple rules into a single evaluation tree.

```http
POST /api/rules/combine_rules
```

#### Request Body
```json
{
  "ruleIds": [
    "605c72ef1f4e3a001f4d2e9a",
    "605c730f1f4e3a001f4d2e9b"
  ],
  "operator": "AND"
}
```

#### Response
```json
{
  "type": "operator",
  "value": "AND",
  "left": {
    // First rule AST
  },
  "right": {
    // Second rule AST
  }
}
```

### Evaluate Rule

Process data against defined rules.

```http
POST /api/rules/evaluate_rule
```

#### Request Body
```json
{
  "rule": {
    // Rule AST structure
  },
  "data": {
    "age": 35,
    "department": "Sales",
    "salary": 60000,
    "experience": 3
  }
}
```

#### Response
```json
{
  "result": true
}
```

## Rule Format Guidelines

### Basic Syntax
- Rules must follow the format: `variable operator value`
- Use appropriate spacing for accurate parsing
- Complex conditions should be enclosed in parentheses

### Supported Operators
- Comparison: `>, <, =, >=, <=`
- Logical: `AND, OR`

### Example Rules
```
"age > 25 AND department = 'Engineering'"
"(salary >= 50000 OR experience > 3) AND department = 'Sales'"
```

## Best Practices

1. **Rule Naming**
   - Use descriptive names for rules
   - Follow a consistent naming convention
   - Include version or date if applicable

2. **Rule Structure**
   - Keep rules modular and focused
   - Break complex rules into smaller, reusable components
   - Use parentheses to clearly define operation precedence

3. **Testing**
   - Test rules with edge cases
   - Validate rule syntax before creation
   - Maintain a test suite for critical rules

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Contact

Raj Ravan - [@raj_ravan](https://twitter.com/raj_ravan) - raj.ravan@example.com

Project Link: [https://github.com/raj-ravan/Rule-Engine-with-AST](https://github.com/raj-ravan/Rule-Engine-with-AST)
