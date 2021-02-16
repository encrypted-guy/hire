const express = require('express')
const router = express.Router()

const User = require('../model/User')
const Job = require('../model/Job')

const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

// PUT api/v1/user/photo | private | uoload user profile photo
router.put('/photo', [upload.single('file'), auth] , async  (req, res) => {
    try {
        if(!req.file) {
            res.status(400).json({ msg: 'NO FILE SELECETED' })
        }else{
            // console.log(req.file)
            const newImage = {
                profile: `/public/uploads/${req.file.filename}`
            }
            const user = await User.findByIdAndUpdate(req.user.id, newImage, {
                new: true,
                runValidators: true
            }).select('-password')

            res.status(200).json({
                success: true,
                data: user
            });
        }
    } catch (err) {
        res.status(400).json({success: false});
    }
})

// GET /api/v1/user/publisher/:id | public | company profile page
router.get('/publisher/:id', async (req, res) => {
    try {
        const publisher = await User.findById(req.params.id).select('-password').populate('job_listing')
        if(!publisher){
            return res.status(400).json({success: false})
        }
        res.status(200).json({
            success: true,
            publisher
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
})

// GET /api/v1/user/edit/user/:id | public | company profile page
router.put('/edit/user/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password')
        if(!user){
            return res.status(400).json({success: false})
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
})

module.exports = router