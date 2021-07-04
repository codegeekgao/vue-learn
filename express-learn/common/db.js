let mongoose = require('mongoose')
let url= 'mongodb://10.211.55.9/movieServer'
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
module.exports=mongoose
