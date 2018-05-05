const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const MongoClient=require('mongodb').MongoClient;
const DB_URI="mongodb://localhost:27017/publicContracts";
const bodyParser=require('body-parser');
const router=express.Router();
const  ObjectId=require('mongodb').ObjectId;
var session = require('express-session');
var cookieParser = require('cookie-parser');

MongoClient.connect(DB_URI,(err,db)=>{
  if(err)
  {
    console.log("Error connecting to database");
    return;
  }
  contracts=db.collection('contract');
  users=db.collection('user');
  console.log('Connected to:'+DB_URI);

});

app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


app.post('/contract/add',(req,res,next) =>{
  contracts.insert({nr_rendor_prokurorimit:req.body.nr_rendor_prokurorimit,
    Lloji_i_prokurorimit:req.body.Lloji_i_prokurorimit,
    aktiviteti_i_prokurorimit:req.body.aktiviteti_i_prokurorimit,
    data_inicimit_aktivitetit:req.body.data_inicimit_aktivitetit,
    data_publikimit_shpallje:req.body.data_publikimit_shpallje,
    data_nenshkrimit:req.body.data_nenshkrimit,
    data_fillimit_implementimit:req.body.data_fillimit_implementimit,
    data_mbarimit_implementimit:req.body.data_mbarimit_implementimit,
    data_e_permbylljes_kontrates:req.body.data_e_permbylljes_kontrates,
    Cmimi_kontrates:req.body.Cmimi_kontrates,
    cmimi_total:req.body.cmimi_total,
    emri_kontratuesit:req.body.emri_kontratuesit},(err,document)=>{
    if(err)
    {
      console.log(err);
    }
  res.redirect('../userIndex');
  })

})

app.post('/login',(req,res,next)=>{

  users.findOne({email:req.body.email},{},function(err,user){
    if(err)
  {
    console.log(err);
    return res.status(500).send();
  }
  else{
    if(user.email==req.body.email && user.password==req.body.password)
    {
      console.log("SUCCESS");
      req.session.email=req.body.email;
      console.log(req.body.email);
      console.log("SESSION"+req.session.email);
      
      res.redirect('userIndex');
    }
    else{
      res.render('login');
    }
  }
  })
})

app.get('/',function(req,res){
  contracts.find({}).toArray(function(err,docs)
{
  if(err)
  {
    console.log(err);
  }
  res.render('index',{docs:docs});
});
});


app.get('/userIndex', (req, res) => {
  contracts.find({}).toArray(function(err,docs)
{
  if(err)
  {
    console.log(err);
  }
  res.render('userIndex',{docs:docs});
});
 });


 app.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
       if(err){
          console.log(err);
       }else{
           res.redirect('/');
       }
    });
  
  });



app.get('/add', (req, res) => {
  res.render('add');
 });

 app.get('/login', (req, res) => {

  var sess=req.session;
  if(sess.email){
    res.redirect('userIndex');
  }
else{
  res.render('login');
}
 });

app.get('/contract/:id',function(req,res)
{
  console.log(req.params.id);
  contracts.findOne({_id:ObjectId(req.params.id)},function(err,doc){

    if(err)
    {
      console.log("Error");
    }
    res.render('show',{doc:doc});
  });
});


app.get('/contract/edit/:id',function(req,res)
{
  console.log(req.params.id);
  contracts.findOne({_id:ObjectId(req.params.id)},function(err,doc){

    if(err)
    {
      console.log("Error");
    }
    res.render('edit',{doc:doc});
  });
});

app.post('/contract/update/:id',(req,res,next) =>{
  contracts.update({_id:ObjectId(req.params.id)},{$set:{nr_rendor_prokurorimit:req.body.nr_rendor_prokurorimit,
    Lloji_i_prokurorimit:req.body.Lloji_i_prokurorimit,
    aktiviteti_i_prokurorimit:req.body.aktiviteti_i_prokurorimit,
    data_inicimit_aktivitetit:req.body.data_inicimit_aktivitetit,
    data_publikimit_shpallje:req.body.data_publikimit_shpallje,
    data_nenshkrimit:req.body.data_nenshkrimit,
    data_fillimit_implementimit:req.body.data_fillimit_implementimit,
    data_mbarimit_implementimit:req.body.data_mbarimit_implementimit,
    data_e_permbylljes_kontrates:req.body.data_e_permbylljes_kontrates,
    Cmimi_kontrates:req.body.Cmimi_kontrates,
    cmimi_total:req.body.cmimi_total,
    emri_kontratuesit:req.body.emri_kontratuesit}},(err,document)=>{
    if(err)
    {
      console.log(err);
    }
    res.redirect('../../userIndex');
  })
})

app.get('/contract/delete/:id',(req,res,next) =>{
  contracts.remove({_id:ObjectId(req.params.id)},(err,document)=>{
    if(err)
    {
      console.log(err);
    }
    res.redirect('../../userIndex');
  })
})



app.listen(3000,"localhost",(err)=>
{
  if(err){
    console.log(err);
  }else {
  console.log("This server is listening");
  }
})
