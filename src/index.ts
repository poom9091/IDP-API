import { formatEnvironmentForDynamoDB } from './utils';
import { DynamoDBClient, BatchExecuteStatementCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import express,{ Express, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express();
const port = 3000
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
process.stdin.resume()

const client = new DynamoDBClient({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: "AKIAYRQWG3S7KAZCWHYL",
    secretAccessKey: "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"
  },
});  

app.get("/",(req: Request,res: Response) => { 
  res.status(200);
  res.send("Hello world");
})

app.get("/healthz",(req: Request,res: Response) => { 
  res.status(200);
  res.send("Health check");
})

app.get("/environments",(req: Request,res: Response) => { 
  res.status(200);
  res.send("Show all environment");
})

app.post("/environments",
  body('environment').isString().trim().notEmpty(),
  body('stack').isString().trim().notEmpty(),
  body('config').isObject().optional(), 
  async (req: Request,res: Response) => { 
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const params = {
   TableName: "IDP-dev",
   Item: formatEnvironmentForDynamoDB({...req.body}), 
  }
  try{
    const data = await client.send(new PutItemCommand(params));
    return res.status(202).send(data);
  }  catch(error) {
    console.log(error);
    return res.status(409).json({errors: "Environment existing"});
  }
})

app.delete("/environments/:name",(req: Request,res: Response) => {
  console.log("Delete environment")
})

const server = app.listen(port,()=>{
  console.log(`The Express.js server has started and is listening on port number: ${ port }`)
})

process.on('SIGTERM',()=>{
  server.close(()=>{
    console.log('Recive SIGTERM')
  }) 
})

process.on('SIGINT',()=>{
  server.close(()=>{
    console.log('Recive SIGINT')
  })
})

