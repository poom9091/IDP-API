import { AttributeValue, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb";
import { Environment, AttributeValueObjectMap, Dictionary } from "./interfact";

export function formatEnvironmentForDynamoDB(environment: Environment) {
  return {
    "Environment": {
      S: environment.environment,
    },
    "Stack": {
      S: environment.stack,
    },
    "Config": {
      M: convertDictionaryToAttributeValueObjectMap(environment.config),
    }    
  }    
}

export function convertDictionaryToAttributeValueObjectMap(dictionary?: Dictionary): AttributeValueObjectMap {     
  const output: AttributeValueObjectMap = {};
  if (typeof dictionary === "object" && dictionary !== null) {
    Object.entries(dictionary).map(([key, val]) => {
      output[key] = {
        S: val
      }
    })
  }
  return output; 
}
