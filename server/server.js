const PORT = 8080;


import express from 'express';
import morgan from 'morgan';


const app = express();


// middleware 
app.use(morgan('dev'));



app.get("/test", async (req,res) => {
  return res.json({hello: 'world'})
})

app.listen(PORT, console.log(`Server is listening on PORT: `, PORT));