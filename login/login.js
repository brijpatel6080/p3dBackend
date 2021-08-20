const express = require(express)
require('../db/conn')
const SubmitDemo = require("../modals/employee");
const app = express()

const port = process.env.PORT || 7000

app.use(express.urlencoded({extended: true}));
app.use(express.json())
// this is login api for user login
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usermail = await SubmitDemo.findOne({email:email});

        if(usermail.password === password){
            res.status(201).send("Login successfully");
        }else{
            res.send("invalid login details")
        }
    } catch (error) {
        res.status(400).send("invalid login details");
    }
}); 

// this is password update api 
app.patch('/update/:id', async(req,res) =>{
    try {
        const id = req.params.id;
         await SubmitDemo.findByIdAndUpdate(id, req.body,{
            new : true
        });
        res.send("password is updated");
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, (err) => {
    if (err) throw err
    console.log(`Server is running at ${port}`)
});