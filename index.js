// var express=require("express")
// var app=express()
// app.set('view engine','pug')
// app.set('views','./views')
// app.get("/",(req,res)=>{
//     // res.render("Form.pug")
//     // res.render("table.pug")
//      res.render("list.pug")

// })
// app.listen(3000,console.log("port listen"))


var express=require("express");
var app=express();
var route=require("./script1");
app.use("/",route);
app.set('view engine','pug');
app.set('views','./views');
app.listen(3000,console.log("port listen"))
