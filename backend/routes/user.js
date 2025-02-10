const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// SIGN IN API
router.post("/sign-in", async (req, res) => {
    try {
    const { username } = req.body
    const { email } = req.body
    const existingUser = await User.findOne({ username: username })
    const existingEmail = await User.findOne({ email: email })
    if (existingUser)
    {
        return res.status(400).json({ message: "Username sudah digunakan" })
    } else if (username.length < 4) {
        return res
        .status(400)
        .json ({ message: "Username harus lebih dari 4 karakter" })
    }
    if (existingEmail) {
        return res.status(400).json({ message: "Email harap diisi"})
    }
    const hashPass = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({ 
        username:req.body.username, 
        email: req.body.email, 
        password: hashPass
    })
        await newUser.save()
        return res.status(200).json({ message: "Pendaftaran berhasil" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Kesalahan Sistem" })
    }
})

// login
router.post("/log-in", async(req, res) => {
    const { username, password } = req.body
    const existingUser = await User.findOne({ username: username })
    if (!existingUser)
        {
            return res
            .status(400)
            .json({ message: "Username Tidak dapat ditemukan" })
        }
        bcrypt.compare(password, existingUser.password,(err,data) => {
            if(data){
                const authClaims = [{name:username},{jti:jwt.sign({}, "tcmTM") }]
                const token = jwt.sign({ authClaims },"tcmTM",{expiresIn: "2d"})
                res.status(200).json({id:existingUser._id, token:token })
            } else {
                return res
                .status(400)
                .json({ message: "Username Tidak dapat ditemukan" })
            }
        })
})
module.exports = router
