const express = require("express")
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");

const router = express.Router();

router.use("/login", express.static("login"))

// path - /user/
router.post("/", (req, res) => {
    
    let email = req.body.email;
    let password = req.body.pass;
    let storage_data;
    let saltRounds = 10;
    var arr = []
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            storage_data = {
                "email": email,
                "password": hash
            }
            // Store hash in your password DB.
            fs.writeFile("signup-data.txt", `${JSON.stringify(storage_data)} `, { 'flag': 'a' }, (err) => {
                if (err) {
                    throw err;
                } else {
                    console.log("Success!")
                    res.redirect("/user/login");
                   
                }
            })
        });
    });

})

router.post("/login/result", (req, res) => {

    let existing_data = req.body
    fs.readFile("signup-data.txt", function (err, data) {

        var newman = data.toString().split(" ");
        var oldman;
        for (let i = 0; i < newman.length - 1; i++) {
            oldman = JSON.parse(newman[i])
                // console.log(oldman.email)
                if (existing_data.email == oldman.email) {
                    bcrypt.compare(existing_data.password, oldman.password, function (err, result) {
                        // result == true
                        if (result == true) {
                            res.send("<h1>Login Succesful!</h1>")
            
                        } else {
                                res.send("<h1>The passwords don't Match!</h1>")
                            
                            
                        }
                    });
                }
                else {
                    if(i==newman.length-1){
                        res.send("<h1>The Emails don't match!</h1>")
                        
                    }
                    console.log("<h1>The Emails don't match!</h1>")
                   
                }

        }
    })

})





module.exports = router;