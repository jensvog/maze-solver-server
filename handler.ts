import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { solveMaze } from './mazesolver';

export const maze: APIGatewayProxyHandler = async (event, _context) => {
  var apiRequest = JSON.parse(event.body);

  try {
    var pathInfo = solveMaze(apiRequest);
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