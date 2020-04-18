# maze-solver-server

maze-solver-server is a node.js based application, that calculates a path based on a
given API request. The application is designed for AWS lambda. The application is
written in TypeScript.

## Installation

### Dependencies

Install dependencies with

```npm install```

### Unit test

Unit tests are written with mocha chai. Run unit tests with

```npm test```

## CI environment

The project uses GitHub actions to automatically test the application.

## Deploy with serverless

The function can be deployed to ASW with serverless. Follow these steps to deploy the
software.

1. Install serverless with `npm install -g serverless`
2. Create an AWS IAM user with the AWS management console. Template is in the repository.
   Template created with Yeoman generator template.
3. Configure the created user with `serverless config credentials...`
4. Deploy the software with `serverless deploy`