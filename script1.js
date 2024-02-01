var express = require("express");
var index = express.Router();
var bp = require("body-parser");
index.use(bp.urlencoded({ extended: true }));
index.use(bp.json());
var MongoClient = require("mongodb").MongoClient;
var connectString = "mongodb://0.0.0.0:27017/";
MongoClient.connect(connectString, { useUnifiedTopology: true })
    .then((client) => {
        console.log("DB connected");
        var db = client.db("employee");
        var collection = db.collection("details");
        index.get("/home", (req, res) => {
            res.render("form.pug");
        });
        index.get("/table", (req, res) => {
            collection
                .find()
                .toArray()
                .then((result) => {
                    res.render("table.pug", values = result);
                })
                .catch(error => {
                    console.error(error);
                });
        });
        index.get("/delete/:name", (req, res) => {
            collection
                .deleteOne({ name: req.params.name })
                .then((result) => {
                    res.redirect("/table");
                })
                .catch((error) => {
                    console.log(error);
                });
        });


        index.post("/form", (req, res) => {
            var form1 = {
                name: req.body.name,
                mail: req.body.mail,
                gender: req.body.gender,
                qual: req.body.qual,
                address: req.body.address,
            };
            collection
                .insertOne(form1)
                .then(result => {
                    res.redirect("/table");

                })
                .catch(error => {
                    console.log(error);
                });
        });
        index.get("/edit/:name", (req, res) => {
            collection
                .find({ name: req.params.name })
                .toArray()
                .then((result) => {
                    res.render("edit.pug", (edit = result));
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        index.post("/update", (req, res) => {
            collection
                .findOneAndUpdate(
                    { name: req.body.name },
                    {
                        $set: {
                            mail: req.body.mail,
                            gender: req.body.gender,
                            qual: req.body.qual,
                            address: req.body.address,
                        },
                    },
                    { upsert: true }
                )
                .then((result) => {
                    res.redirect("/table");
                })
                .catch((error) => {
                    console.log(error);
                });
        });

    })

    .catch((error) => {
        console.log(error);
    });

module.exports = index;

























//var express=require("express");
// var index=express.Router();
// var bp=require("body-parser");
// index.use(bp.urlencoded({extended: true}));
// index.use(bp.json());
// var MongoClient=require("mongodb").MongoClient;
// var connectString = "mongodb://0.0.0.0.27017/";
// MongoClient.connect(connectString,{useUnifiedTopology:true})
//     .then((client)=>{
//         console.log("DB connected");
//         var db=client.db("employee");
//         var collection=db.collection("details");
//         index.get("/home",(req,res)=>{
//             res.render("form.pug");
//         });
//         index.get("/table",(req,res)=>{
//             collection
//                 .find()
//                 .toArray()
//                 .then((result)=>{
//                     res.render("table.pug", values=result);
//                 })
//                 .catch(error =>{
//                     console.log(error);
//                 })
//         })
//         index.get("/delete/:name", (req,res)=>{
//             collection
//                 .deleteOne({name:req.params.name})
//                 .then((result)=>{
//                     res.redirect("/table");
//                 })
//                 .catch((error)=>{
//                     console.log(error);
//                 });
//         });

//         index.post("/form", (req,res)=>{
//             var form1={
//                 name: req.body.name,
//                 mail: req.body.mail,
//                 gender: req.body.gender,
//                 qual: req.body.qual,
//                 address: req.body.address,
//             };
//             collection
//                 .insertOne(form1)
//                 .then(result=>{
//                     res.redirect("/table");
//                 })
//                 .catch(error=>{
//                     console.log(error);
//                 });
//         });
//         index.get("/edit/:name",(req,res)=>{
//             collection
//                 .find({name:req.params.name})
//                 .toArray()
//                 .then((result)=>{
//                     res.render("edit.pug", (edit=result));
//                 })
//                 .catch((error)=>{
//                     console.log(error);
//                 });
//         });
//         index.post("/update", (req,res)=>{
//             collection
//                 .findOneAndUpdate(
//                     {name: req.body.name},
//                     {
//                         $set: {
//                             mail:req.body.mail,
//                             gender:req.body.gender,
//                             qual:req.body.qual,
//                             address:req.body.address,
//                         },
//                     },
//                     {upsert:true}
//                 )
//                 .then((result)=>{
//                     res.redirect("/table");
//                 })
//                 .catch((error)=>{
//                     console.log(error)
//                 });
//         });
//     })

//     .catch((error)=>{
//         console.log(error);
//     });
//  module.exports = index;   