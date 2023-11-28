/*
This is an example snippet - you should consider tailoring it
to your service.
*/
import * as dotenv from 'dotenv';

dotenv.config();

export async function fetchGraphQL(operationsDoc:any, operationName: any, variables: any) {
  const result = await fetch(
    process.env.DGRAPH_ENDPOINT || "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": process.env.X_AUTH_TOKEN || "",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}


