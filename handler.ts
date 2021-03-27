import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { solveMaze } from './mazesolver';

export const maze: APIGatewayProxyHandler = async (event, _context) => {
  var requestBody = JSON.parse(event.body);

  try {
    const pathInfo = solveMaze(requestBody);
    return {
      statusCode: 200,
      body: JSON.stringify(pathInfo)
    }
  } catch(error) {
    return {
      statusCode: error.status,
      body: error.message
    }
  }
};