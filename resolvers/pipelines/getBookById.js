import { util } from '@aws-appsync/utils';

export function request(ctx) {
  const { bookId } = ctx.args;
  return dynamoDBGetItemRequest({ bookId });
}

export function response(ctx) {
  if (!ctx.result) return util.error("Book ID Not Found!");
  return ctx.result;
}


function dynamoDBGetItemRequest(key) {
  return {
    operation: 'GetItem',
    key: util.dynamodb.toMapValues(key),
  };
}