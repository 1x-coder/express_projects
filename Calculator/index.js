const express=require("express");
const parser=require("body-parser");

const app=express();
app.use(parser.urlencoded({extended:true})); //urlencoded to parse the data from the html form. Extended to allow to post nested objects.

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html"); //__dirname gives file path of current file
});

app.post("/",function(req,res){
    var n1=Number(req.body.num1);
    var n2=Number(req.body.num2);
    var o=req.body.o;
    if(o==="1"){
        res.send("The answer is: "+(n1+n2));
    }
    else if(o==="2"){
        res.send("The answer is: "+(n1-n2));
    }
    else if(o==="4"){
        res.send("The answer is: "+(n1*n2));
    }
    else if(o==="3"){
        res.send("The answer is: "+(n1/n2));
    }
    else{
        res.send("Incorrect operator number entered!");
    }
});

app.get("/bmi",function(req,res){
    res.sendFile(__dirname+"/bmi_calculator.html");
});

app.post("/bmi",function(req,res){
    var h=Number(req.body.h);
    var w=Number(req.body.w);
    var bmi= w/(h*h);
    res.send("The calculated BMI is : "+bmi);
})

app.listen(3000,function(){
    console.log("Server active on port 3000");
});