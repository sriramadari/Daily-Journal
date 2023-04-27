//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const homeStartingContent = "SRIRAM ADARI";
const aboutContent = "SRIRAM ADARI";
const contactContent = "SRIRAM ADARI";  
const comContent=""
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];
app.get("/",function(req,res){
res.render("home",{
  StartingContent:homeStartingContent,
posts:posts});

})
app.get("/about",function(req,res){
  res.render("about",{aContent:aboutContent});
  })
  app.get("/contact",function(req,res){
    res.render("contact",{cContent:contactContent});
    })
    app.get("/compose",function(req,res){
      res.render("compose");
      })
app.post("/compose",function(req,res){
  const journalentry={
    title:req.body.journaltitle,
    post:req.body.journalbody
  };
  posts.push(journalentry);
res.redirect("/");
});
app.get("/posts/:postname",function(req,res){
var titlereq=_.lowerCase[req.params.postname];
posts.forEach(function(post){
  const existtitle=_.lowerCase[post.title];
  if(titlereq===existtitle){
    res.render("post",{
      title:post.title,
      content:post.post});
  }
})
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
