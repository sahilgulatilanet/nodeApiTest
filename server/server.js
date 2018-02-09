const express=require('express');
const _=require('lodash');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const {ObjectID}=require('mongodb');
mongoose.connect('mongodb://localhost:27017/mydbtest');


var app=express();
app.use(express.static(__dirname+'/../public'));
app.use(cors());
app.use(bodyParser.json());
//app.use(express.bodyParser());
var city=mongoose.model('citys',{
    st:{
        type:String
    },
    nm:{
        type:String
    }
});
var state=mongoose.model('state',{
    nm:{
        type:String
    }
});
var User=mongoose.model('user',{
    fnm:{
        type:String
    },
    lnm:{
        type:String
    },
    em:{
        type:String
    },
    st:{
        type:String
    },
    city:{
        type:String
    }
});
app.post("/insertdata",(req,res)=>{
    console.log(req.body);
    var user=new User({
        fnm:req.body.fnm,
        lnm:req.body.lnm,
        em:req.body.em,
        st:req.body.st,
        city:req.body.ct
    });
    user.save().then(()=>{
        User.find().then((user)=>{
            res.send(user);
        });
    });

    //res.send(req.body);
});

app.post('/view',(req,res)=>{
    User.find().then((user)=>{
        res.send(user);
    });
});
app.post('/states',(req,res)=>{
    state.find().then((st)=>{
        res.send(st);
    });
});
app.post('/city',(req,res)=>{
    var st=req.body.st;
    console.log(st);
    city.find({st:st}).then((ct)=>{
        res.send(ct);
    });
});
app.post('/delete',(req,res)=>{
    var id=req.body.id;
    User.findByIdAndRemove(id).then((todo)=>{
        User.find().then((user)=>{
            res.send(user);
        });
    });
});
app.post('/update',(req,res)=>{
    var id=req.body.id;
    var body=_.pick(req.body,['fnm','lnm','em','st','city'])
    User.findByIdAndUpdate(id,{$set: body},{new:true}).then((todo)=>{
        res.status(200).send();
        /*User.find().then((user)=>{
            res.send(user);
        });*/
    });
});
app.post('/updatedata',(req,res)=>{
    var id=req.body.id;
    User.findById(id).then((user)=>{
        res.send(user);
    });
});
app.listen(3000,'0.0.0.0',()=>{
    console.log("listning on port 3000");
});