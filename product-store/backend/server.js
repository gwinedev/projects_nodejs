// Entry point for our API
// You can make express type a module so you can import instead of require it

import express from 'express';

const app = express()


app.listen(5000, () =>{
    console.log("Server started...");
    
})