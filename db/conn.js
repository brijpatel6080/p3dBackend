const mongoose = require('mongoose')
// this is connection with mongoose and node
mongoose.connect("mongodb://127.0.0.1:27017/Company", {
    useNewUrlParser:true, 
    useCreateIndex:true, 
    useUnifiedTopology:true,
    useFindAndModify:false,
})
.then(() => { console.log("connection successful")})
.catch((err) => {console.log(err)})
