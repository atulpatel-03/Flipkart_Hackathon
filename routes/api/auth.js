const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const {OAuth2Client} = require('google-auth-library');


const User = require('../../models/User');

const client = new OAuth2Client("645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com");

router.get('/', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate({path:"yourmails history"}).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
    
  });


router.post(
    '/',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
  );
  

router.post('/googlelogin', async (req,res) => {
   try {
    let { tokenId }= req.body;
   let result = await client.verifyIdToken({idToken: tokenId, audience: "645485184858-lpmdq3q6nefhpt68lj437bmt0v49vv0m.apps.googleusercontent.com"})
   let {email_verified, name, email } = result.payload;

    if(email_verified){
      let user = await User.findOne({email});
      

      if(user){
      
        const payload = {
          user: {
            id: user.id
          }
        };
        console.log(payload);
        
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            console.log("tok", token)
            res.json({ token });
           }
        );

        
       
      }
      else{
       
        let password = email+"123";
       
        user = new User({
          name,
          email,
          password
        });
  
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
        
        await user.save();
     
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
      }


   
   } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
   }
});

module.exports = router;