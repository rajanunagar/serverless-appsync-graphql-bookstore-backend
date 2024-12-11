"use strict";
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
const dynamoDBClient = new DynamoDBClient({
  region: "us-west-1",
});
const documentClient = DynamoDBDocumentClient.from(dynamoDBClient);
const { BOOKS_TABLE } = process.env;

module.exports.handler = async (event) => {
  if (event.field === "getBookById") {
    var { bookId } = event.arguments;
    try {
      const params = {
        TableName: BOOKS_TABLE,
        Key: { bookId: bookId },
      };
      const result = await documentClient.send(new GetCommand(params));
      return result.Item;
    } catch (err) {
      return err;
    }
  } else {
    return null;
  }
};
