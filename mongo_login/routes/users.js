const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/Loginpage")
.then(()=>{
  console.log("database is connected succefuly")
}).catch(()=>{
  console.log("database is not  connected succefully")
})
const LoginSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

const collection=new mongoose.model("user",LoginSchema)
module.exports=collection