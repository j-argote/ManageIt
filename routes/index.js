const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

var db = require('../models/database');

//body-parser
router.use(bodyParser.urlencoded({ extended: false }))

// post new job data to database and populate table with new job 
router.post('/',(req,res)=>{
    // console.log(req.body.jobnumber)
    var jobNumber = req.body.jobnumber;
    var jobAddress = req.body.jobaddress;
    var date_received = req.body.date_received;
    var type_of_job = req.body.type_of_job;

    db.none("INSERT INTO jobs (jobnumber, jobaddress, datereceived, typeofjob) Values($1,$2,$3,$4)", [jobNumber, jobAddress, date_received, type_of_job])
    
    db.any('SELECT * FROM jobs')
    .then((data)=>{
        db.any('SELECT * FROM jobs')
        .then((results)=>{
            res.render('index',{
                jobs: results,
                pageTitle: 'ManageIt',
                pageID: 'home',
                jobs: data,
                titleCol1: "Job Number",
                titleCol2: "Job Address",
                titleCol3: "Date Received",
                titleCol4: "Type of Job"
            })
        })
    })
})

router.get('/',(req,res)=>{
    db.any('SELECT * FROM jobs')
    .then((data)=>{
        res.render('index',{
        pageTitle: 'ManageIt',
        pageID: 'home',
        jobs: data,
        titleCol1: "Job Number",
        titleCol2: "Job Address",
        titleCol3: "Date Received",
        titleCol4: "Type of Job"
    })
    })
    
})


module.exports = router;
