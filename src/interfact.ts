import { AttributeValue } from "@aws-sdk/client-dynamodb";

export interface Environment {
  environment: string;
  stack: string;
  config: {[key: string]: string};
}

export interface AttributeValueObjectMap {
  [key: string]: AttributeValue
}

export interface Dictionary {
  [key: string]: string
}

