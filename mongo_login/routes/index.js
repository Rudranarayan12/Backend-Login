var express = require('express');
var router = express.Router();
const collection=require('./users')
const bcrypt=require('bcrypt')

router.get('/',(req,res)=>{
  res.render('signup')
})
router.get('/login',(req,res)=>{
  res.render('login')
})

router.post("/signup",async(req,res)=>{
  const data={
    name:req.body.name,
    password:req.body.password
  }
  const exist=await collection.findOne({name:req.body.name})
  if(exist){ 
    res.send("bro this details is already exist")
  }
  else{
  const hashing=10
  const encrypt= await bcrypt.hash(data.password,hashing)
  data.password=encrypt
  await collection.insertMany(data)
  res.render("home")
  }
})
router.post("/login", async(req, res) => {
  const check = await collection.findOne({ name: req.body.name });

  if (!check) {
    res.send("User is on Mars, not on Earth");
  }

  const isPassword = await bcrypt.compare(req.body.password, check.password);

  if (isPassword) {
    res.render('home');
  } else {
    res.send("Wrong information try again");
  }
});


module.exports = router;
