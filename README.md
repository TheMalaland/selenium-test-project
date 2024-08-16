# Selenium Test Project

This project is an automated testing framework using **Selenium** with **Node.js** and **Mocha** as the test runner. It includes parallel testing, advanced reporting with **Mochawesome** and **Allure**, and is designed to be scalable for testing various scenarios on `https://the-internet.herokuapp.com/`.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
  - [With Mochawesome Reporter](#with-mochawesome-reporter)
  - [With Allure Reporter](#with-allure-reporter)
- [Project Structure](#project-structure)
- [Git Workflow](#git-workflow)
- [Contributing](#contributing)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js**: >= v14.x
- **npm**: Node package manager
- **ChromeDriver**: Ensure ChromeDriver is installed and set up correctly for Selenium
- **Allure Commandline**: For generating Allure reports

To install Allure globally:

```bash

npm install -g allure-commandline

Installation

Clone the repository and install the dependencies:

bash

git clone https://github.com/your-username/selenium-test-project.git
cd selenium-test-project
npm install

Running Tests
With Mochawesome Reporter

To run the tests with the Mochawesome reporter and generate HTML reports:

bash

npm test

The reports will be saved in the mochawesome-report folder.
With Allure Reporter

To run the tests with the Allure reporter:

bash

npm test

Then, generate and view the Allure report:

bash

allure generate allure-results --clean -o allure-report
allure open allure-report

Project Structure

bash

.
├── tests/                   # Test files
│   ├── test1.js
│   ├── test2.js
│   └── test3.js
├── reports/                 # Test reports (generated)
│   ├── mochawesome-report/
│   └── allure-report/
├── node_modules/            # Node.js packages
├── package.json             # Project metadata and scripts
├── mocha.config.js          # Mocha configuration for reporters
└── README.md                # Project documentation
