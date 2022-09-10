import express,{ Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();
const port = 3000

app.use(cors())
process.stdin.resume()

app.get("/",(req: Request,res: Response) => { 
  res.send("Hello world")
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

