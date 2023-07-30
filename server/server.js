const PORT = 8080;

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// routes

import sessionRoutes from './routes/sessions.js';

const app = express();

app.use(cors());


// middleware 
app.use(morgan('dev'));


app.use('/sessions', sessionRoutes);


app.get("/test", async (req, res) => {
  return res.json({ hello: 'world' })
})

app.post("/test", async (req, res) => {
  console.log(req)
  return res.json("Gotcha!")
})

app.listen(PORT, console.log(`Server is listening on PORT: `, PORT));