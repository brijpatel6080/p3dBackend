const express = require("express");
const router = new express.Router();
require("dotenv").config();
const SubmitDemo = require("../modals/employee");
const sgMail = require("@sendgrid/mail");
const password = require("../Scripts/randompassword");

const API_key = process.env.API_KEY;

sgMail.setApiKey(API_key);


// this is a employee add api for adding new employee data in database 
router.post("/employee/add", async (req, res) => {
  try {
    // console.log("___password",password())
    let user = await SubmitDemo.findOne({ Email: req.body.Email });
    if (user) return res.status(400).send({success: false , msg: "email already registered." });
    let user2 = await SubmitDemo.findOne({ Phoneno: req.body.Phoneno });
    if (user2) return res.status(400).send({success: false , msg: "Phone no already registered." });
    var callPassword = password();
    const emp = new SubmitDemo({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Company: req.body.Company,
      Companytype: req.body.Companytype,
      Phoneno: req.body.Phoneno,
      Address: req.body.Address,
      Industrytype: req.body.Industrytype,
      Password: callPassword,
    });

    //sending Email
    const message = {
      to: req.body.Email,
      from: "brijpatel6080link@gmail.com",
      subject: "hello sendgrid api",
      text: "hello a message from sendgrid testing api",
      html: `<h1>${callPassword}</h1>`,
    };
    await sgMail.send(message);
    await emp.save();

    res.status(200).send({success: true , msg:"employee added" });
  } catch (error) {
    console.log("error",error)
    res.send({success: false , msg:"failed" });
  }
});

// this is a employee  api for getting all employee detail
router.get("/employee", async (req, res) => {
  try {
    const emp = await SubmitDemo.find();
    res.send(emp);
  } catch (error) {
    res.send({success: false , msg:error });
  }
});

// this is a employee by id  api for getting single employee record by id
router.get("/employee/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await SubmitDemo.findById(id);
    res.send(emp);
  } catch (error) {
    res.send({
      success: false,
      msg:error});
  }
});

// this is a employee data update api for update employee data by employee id
router.patch("/employee/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await SubmitDemo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({success: true , msg: "data is updated" });
  } catch (error) {
    res.status(400).send({success: false , msg: error });
  }
});

// this is a employee record delete api for delete employee record by employee id

router.delete("/employee/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await submitDemo.findByIdAndDelete(id);
    res.send({success: true , msg: "document has been deleted" });
  } catch (error) {
    res.send({success: false , msg: error });
  }
});

// this is a login  api for checking employee record exist in database

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.Email;
    const password = req.body.Password;

    const usermail = await SubmitDemo.findOne({ Email: email });
    console.log({usermail , password});

    if (usermail.Password === password) {
      res.status(201).send({success: true , msg:"Login successfully"});
    } else {
      res.send({success: false , msg:"invalid login details"});
    }
  } catch (error) {
    res.status(400).send({success: false , msg:"invalid login details"});
  }
});

module.exports = router;
