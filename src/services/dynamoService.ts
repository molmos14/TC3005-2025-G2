import { DynamoDB } from "@aws-sdk/client-dynamodb";
import {
    AWS_REGION,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_SESSION_TOKEN}
    from "../config";

// Inicializa el cliente de DynamoDB
const dynamoDBClient = new DynamoDB({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN,
    }
});

export default dynamoDBClient;