const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
let cron = require('node-cron');

router.get('/me',auth, async (req,res)=> {
    try {
        let user = await User.findById(req.user.id).select('-password');
    if(user){
       user = await User.findById(req.user.id).populate({path:"yourmails"}).select('-password').sort({date: -1});
       res.json(user);
    }
      
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
   
});

router.get('/history',auth, async (req,res)=> {
    try {
        let user = await User.findById(req.user.id).select('-password');
    if(user){
       user = await User.findById(req.user.id).populate({path:"history"}).select('-password');

       res.json(user);
    }
      
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
   
});

router.post('/send',auth,  
    check('to', 'Please include a valid email').isEmail(),
    check('text', 'Text is required').notEmpty(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {to, text, subject, schedule } = req.body;

    try {

    const user = await User.findById(req.user.id).select('-password');
    
    const newPost = new Post({
        user: req.user.id,
        from:user.email,
        to:to,
        schedule:schedule,
        subject:subject,
        text:text
      });
      
      const post = await newPost.save();
      user.yourmails.push(newPost._id);
      await user.save();

    if(schedule ===  "sec"){
        cron.schedule('*/30 * * * * *', () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
            const post = newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
        
    }
    else if(schedule === "min"){
        cron.schedule(`*/5 * * * *`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post = newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
       
    }
    else if(schedule === "hour"){
        cron.schedule(`0 * * * *`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post = newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
    }
    else if(schedule === "day"){
        cron.schedule(`0 0 * * *`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post = newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
    }
    else if(schedule === "weekday"){
        cron.schedule(`0 0 * * 1-5`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post = newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
    }
    else if(schedule === "weekend"){
        cron.schedule(`0 0 * * 6,0`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post =  newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
    }
    else if(schedule === "month"){
        cron.schedule(`0 0 1 * *`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post =  newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
    }
    else if(schedule === "year"){
        cron.schedule(`0 0 1 1 *`, () => {
            console.log('running a task every minute');
            const newPost = new Post({
                user: req.user.id,
                from:user.email,
                to:to,
                schedule:schedule,
                subject:subject,
                text:text
              });
              
              const post = newPost.save();
            user.history.push(newPost._id);
            user.save();
        });
    }

   

   

    res.json(post);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

router.put('/history/deletemail/:notifyid',auth, async (req,res)=>{
    try {
        let user = await User.findById(req.user.id).select('-password');


        if(user){
            user= await User.findById(req.user.id).populate({path:"history"}).select('-password');
            let historymail= user.history.filter((mail)=> mail._id.toString() !== req.params.notifyid.toString());
            user.history = historymail;
            await user.save();

            return res.json(user);
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.put('/yourmails/deletemail/:notifyid',auth, async (req,res)=>{
    try {
        let user = await User.findById(req.user.id).select('-password');


        if(user){
            user= await User.findById(req.user.id).populate({path:"yourmails"}).select('-password');
            let yourmail= user.yourmails.filter((mail)=> mail._id.toString() !== req.params.notifyid.toString());
            user.yourmails = yourmail;
            await user.save();

            return res.json(user);
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})




module.exports = router;