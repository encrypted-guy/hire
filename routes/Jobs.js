const express = require('express')
const router = express.Router()

// MODELS
const Job = require('../model/Job')
const User = require('../model/User')
// auth
const auth = require('../middleware/auth')

// GET | /api/v1/job | public | get all jobs from data base
router.get('/', async (req, res) => {
    try {
        let query;
        const reqQuery = { ...req.query };
        const removefeilds  = ['page', 'limit']
        // loop over and remove from reqQuery
        removefeilds.forEach(param => delete reqQuery[param])

        let queryString = JSON.stringify(reqQuery);
        query = Job.find(JSON.parse(queryString))

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page -1) * limit;
        query = query.skip(skip).limit(limit);
        const endindex = page * limit;
        const total = await Job.countDocuments();


        const jobs = await query.populate('user')
        let pagination = {}

        // pagination NEXT
        if(endindex < total) {
            // pagination.next = {
            //     page: page + 1,
            //     Nextpageurl: `/?page=${page + 1}`
            // }
            pagination.next = page + 1
        }
        // pagination PREV
        if(skip > 0) {
            // pagination.prev = {
            //     page: page -1,
            //     Prvpageurl: `/?page=${page - 1}`,
            // }
            pagination.prev = page -1
        }
        // getting current page
        // pagination.current = {
        //     page: page,
        //     currentpageurl: `/?page=${page}`
        // }
        pagination.current = page

        res.status(200).json({ 
            success: true,
            count: jobs.length,
            pagination,
            data: jobs
        })
    } catch (err) {
        // console.log(err)
        res.status(400).json({success: false})
    } 
})

// GET | /api/v1/job | public | get single job
router.get('/job-id/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('user')

        if(!job){
            return res.status(400).json({success: false})
        }

        res.status(200).json({ 
            success: true,
            data: job
        })

    } catch (err) {
        // console.log(err)
        res.status(400).json({success: false})
    } 
})

// POST | /api/v1/job | private | add a new job to the list
router.post('/', auth, async (req, res) => {
    try {
        req.body.user = req.user.id
        const user = await User.findById(req.user.id)
        req.body.company_name = user.name
        req.body.title = req.body.title.toLowerCase()
        if(req.body.work_type !== 'in office'){
            req.body.work_type = 'remote'
        }
        req.body.work_type = req.body.work_type.toLowerCase()
        

        const job = await Job.create(req.body)
        res.status(201).json({
            success: true,
            data: job
        }) 
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false})
    }
})

// PUT | /api/v1/job/:id | private | update the selected job
router.put('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        
        if(!job){
            return res.status(400).json({
                success: false
            })
        }

        res.status(200).json({
            success: true,
            data: job
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({success: false})
    }
})

// DELETE | /api/v1/job/:id | private | Delete the selected job
router.delete('/:id', auth, async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id)
        if (!job) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({ 
            success: true,
            data: {}
        })
    } catch (err) {
        res.status(400).json({success: false})
    }
})

module.exports = router