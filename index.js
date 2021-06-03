const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));


var contactlist=[
    {
        name:"Kartik",
        phone:"12345677"
    },
    {
        name:"Hublo",
        phone:"1028201022"
    },
    {
        name:"Uganda",
        phone:"33993930192"
    }

]
app.get('/',function(req,res){
   
    Contact.find({},function(err,contacts){

        if(err){
        console.log('error in fetching contacts from db');
        return ;}

        return res.render('home',
         {
           title:"My C List",
           contact_list:contacts
         });  
          

    });

});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Playground"});
});

app.post('/create-contact',function(req,res){

//  contactlist.push(req.body);

Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newContact){
    if(err)
    {
        console.log('error in creating contact');
        return;
    }

    console.log('***********',newContact);
    return res.redirect('back');

});

});


app.get('/delete-contact', function(req, res){
    // console.log(req.query);
    // let phone = req.query.phone

    // let contactindex = contactlist.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactlist.splice(contactindex, 1);
    // }


    //get the id
    let id=req.query.id;

    //find id in db and delte it
    Contact.findByIdAndDelete(id,function(err){

        if(err){
        console.log('error in deleting');
        return;
    }

    return res.redirect('back');
    });

//     return res.redirect('back');
 });

app.listen(port,function(err){
    if(err)
    {
        console.log('Error',err);
    }
    console.log("server is running on port ",port);
 });