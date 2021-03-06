const route = require("express").Router();
const mongoose = require("mongoose");
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const userlogin = require('../middleware/userLogin');

route.get("/", (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
});

route.get("/:_id", (req, res) => {
    User.findOne({ _id: req.params._id })
        .then((data) => {
            if (data === null) {
                res.json("no such user exists");
            } else {
                res.json(data);
            }
        })
        .catch((err) => console.log(err));
});

route.get("/signup", (req, res) => {
    User.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
});

route.post('/signup', (req, res) => {
    const { name, email, password, password2 } = req.body
    if (!name || !email || !password || !password2) {
        return res.status(422).json({ error: "please enter all the fields" })
    }
    if (password !== password2) {
        return res.status(422).json({ error: 'Passwords do not match' })
    }
    if (password.length < 6) {
        return res.status(422).json({ error: 'Password should be at least 8 characters' })
    }
    User.findOne({ email: email }).then((data) => {
        if (data) {
            return res.status(409).json({ error: "user already exists" })
        }
        bcrypt.hash(password, 10)
            .then((hashedpassword) => {
                let user = new User({
                    email: email,
                    name: name,
                    password: hashedpassword
                })
                user.save().then((data) => {
                    res.json({ message: "saved the user", data: data })

                }).catch((err) => {
                    console.log(err)
                })
            })

    }).catch((err) => {
        console.log(err);
    })
});

route.get('/signin', (req, res) => {
    res.send("Sign in")
});

route.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(422).json("Please fill all credentials")
    User.findOne({ email: email })
        .then((data) => {
            if (!data)
                return res.status(422).json({ error: "Invalid email or password" })
            bcrypt.compare(password, data.password).then((match) => {
                if (match) {
                    const token = jwt.sign({ _id: data._id }, JWT_SECRET, { expiresIn: '1d' })
                    const { _id, name, email } = data
                    res.json({ token: token, user: { _id, email, name } })
                }
                else
                    return res.status(422).json({ error: "Invalid email or password" })
            })
        }).catch(err => {
            console.log(err)
        })
});

module.exports = route;
