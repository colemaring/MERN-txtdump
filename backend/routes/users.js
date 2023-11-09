const express = require('express');
const router = express.Router();
const User = require("../models/data");
const bcrypt = require('bcrypt'); //used to hash passwords
const jwt = require('jsonwebtoken'); //authenticates the user

router.use(express.json());

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username })
    if (user) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword
    });

    newUser.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send("User added successfully");
        }
    });

    res.status(201).send();
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid username or password');
    }

    const token = jwt.sign({ username: user.username }, 'secret_key');
    res.send({ token });
});

app.listen(3000, () => console.log('Server started'));