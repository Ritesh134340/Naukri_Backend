const { Router } = require("express");
const adminController = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminModel } = require("../Models/Admin.model");



adminController.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    const existing_user = await adminModel.findOne({ email });

    if (existing_user) {
        res.send({msg:"Admin already exist"})
        return;
    }
    bcrypt.hash(password, 4, async function (err, hash) {
        if (err) {
            res.send({ msg: "signup failed ..please try again.." });
        } else {

            const new_admin = new adminModel({
                email,
                password: hash,
                name,

            });

            await new_admin.save();
            res.send({ msg: "Signup Succesfull..!" });
        }
    });
});



adminController.post("/login", async (req, res) => {
    const { email, password } = req.body
    const admin = await adminModel.findOne({ email })
    if (admin) {
        const hashed_password = admin.password;
        const admin_id = admin._id;
        bcrypt.compare(password, hashed_password, function (err, result) {
            if (err) {
                res.send({ msg: "Something went wrong, try again later" })
            }
            if (result) {
                const token = jwt.sign({ admin_id }, process.env.SECRET);
                res.send({ msg: "Login Successfull", token })
            }
            else {
               
                res.send({ msg: "Login failed" })
            }
        });
    } else {
        res.send({ msg: "Invalid Credentials" })
    }
})

module.exports = {
    adminController
}