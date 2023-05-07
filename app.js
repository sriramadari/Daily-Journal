//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _=require("lodash");
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery",false);
main().catch(err => console.log(err));
async function main() {
 
  await mongoose.connect('mongodb+srv://lakshmisriramadari1427:K1mXXNBXQA9q0dQG@cluster0.ubo17yp.mongodb.net/postsDB');
  console.log("Connected to MongoDB atlas");  
};

  const postsSchema =  new mongoose.Schema ({
    title:String,
    blogcontent: String
});

const Blog = mongoose.model("Blog",postsSchema);

const homeStartingContent = "Welcome to my daily journal!😀";
const aboutContent = "SRIRAM ADARI";
const contactContent = "SRIRAM ADARI";  
const comContent=""
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
let posts=[];
app.post("/compose",function(req,res){
  const newpost = new Blog ({
    title:req.body.journaltitle,
    blogcontent: req.body.journalbody
  })
  newpost.save();
  posts.push(newpost);
res.redirect("/");
});
app.get("/",function(req,res){
  Blog.find({}).then(foundpost=> {
    res.render("home",{
    StartingContent:homeStartingContent,
  posts:foundpost});
});
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

app.get("/posts/:postId",function(req,res){
  const requestedPostId = req.params.postId;
  Blog.findOne({_id: requestedPostId}).then((foundpost)=>{
    res.render("post", {
      postname: foundpost.title,
      content: foundpost.blogcontent,
      postid:foundpost._id
    });
  }) .catch((err) => {
    console.error(err);
  });

});
app.post("/delete",function(req,res){
 const delblog=req.body.blog;
 Blog.findByIdAndRemove({_id:delblog}).then(()=>{
  res.redirect("/");
}).catch((err) => {
  console.error(err);
});
});
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
