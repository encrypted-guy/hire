const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// MODEL
const User = require('../model/User')

// auth
const auth = require('../middleware/auth')

// POST | /api/v1/register | public | register user
router.post('/register', async (req, res) => {
    try {
        const {name, email, password, user_type, phone, country, website, address} = req.body
        
        if(!name || !email || !password || !user_type){
            return res.status(400).json({ msg: 'please enter the required feilds' })
        }
        if(user_type === 'company') {
            const regx = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
            if(!website.match(regx)){ 
                return res.status(400).json({ msg: 'Please use a valid URL with HTTP or HTTPS' })
            }
        }
    
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({ msg: 'user already exists' })
        }

        user = new User({
            name,
            email,
            password,
            user_type,
            phone,
            country,
            website,
            address
        })
        const slat =await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, slat)
        await user.save()

        const payload = { 
            id: user._id
        }
        jwt.sign(payload, process.env.JWTSECRECT, {
            expiresIn: 36000 
        }, (err, token) => {
            if(err) throw err
            res.status(200).json({
                token
            })
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({success: false})
    }
})


// POST api/v1/login | public | login exixting user
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        if( !email || !password){
            return res.status(400).json({ msg: 'invalid credentials' })
        }
        let user = await User.findOne({email}).select('+password')
        if(!user ) return res.status(400).json({ msg: 'invalid credentials' })
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch ) return res.status(400).json({ msg: 'invalid credentials' })

        const payload = { 
            id: user._id
        }
        jwt.sign(payload, process.env.JWTSECRECT, {
            expiresIn: 36000 
        }, (err, token) => {
            if(err) throw err
            res.status(200).json({
                token
            })
        })

    } catch (err) {
        res.status(400).json({success: false})
    }
})

// GET api/v1/user | private | get logged in user for the process of auth
router.get('/user', auth,  async (req, res) => {
    try {
        // console.log(req.user.user.id)
        const user = await User.findById(req.user.id).select('-password')
        res.status(200).json({
            user
        }) 
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ msg:'SERVER ERROR'})
    }
})




module.exports = router