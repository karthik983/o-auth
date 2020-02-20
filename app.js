const express=require("express");
const app=express();
const config=require("config");
const bodyParser=require("body-parser")
const bcrypt=require("bcrypt");

const port=process.env.PORT||config.get("PORT");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static("views"))



// Routes import
const login=require("./routes/login")
app.use("/user",login);


app.listen(port,()=>{
    console.log(`Server started at ${port}`);
})