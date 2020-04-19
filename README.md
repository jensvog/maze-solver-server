# maze-solver-server

maze-solver-server is a node.js based application, that calculates a path based on a
given API request. The application is designed for AWS lambda. The application is
written in TypeScript.

## Usage

The API can be used by sending HTTP Post request to the API endpoint. The application
expects the request in a specific format. It can be seen in the models/maze.json. The
application uses a request validator to check if the sent data is correct.

## Installation

### Dependencies

Install dependencies with

```npm install```

### Unit test

Unit tests are written with mocha chai. Run unit tests with

```npm test```

## CI environment

The project uses GitHub actions to automatically test and deploy the application. The
repository needs some secrets to work:
```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

## Deploy with serverless

The function can be deployed to ASW with serverless. Follow these steps to deploy the
software.

1. Install serverless with `npm install -g serverless`
2. Create an AWS IAM user with the AWS management console. Template is in the repository.
   Template created with Yeoman generator template.
3. Configure the created user with `serverless config credentials...`
4. Deploy the software with `serverless deploy`