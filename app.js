const express=require("express");
const bodyParse=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParse.urlencoded({extended:true}));

app.set('view engine','ejs');
app.get("/",function(req,res){
    res.render("index");

});

app.post("/",function(req,res){
    const query=req.body.city;
    const apiKey="8d9856307d2903a214eb13e8e92790d0";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apiKey;
    https.get(url,function(response){
        // console.log(response.statusCode);
        response.on("data",function(data){
            // console.log(data);
            const weatherData=JSON.parse(data);
            const icon=weatherData.weather[0].icon;
            const imageUrl="https://openweathermap.org/img/wn/"+ icon+ "@2x.png";
            const description=weatherData.weather[0].description;
            const temp=weatherData.main.temp;
            // console.log(weatherData);
            // console.log(temp);
            res.write("<p>weather description: "+ description + "</p>");
            res.write("<h1>Temperature of "+ query +" is "+temp+ "</h1>");
            res.write("<img src="+imageUrl+">");
            res.send();
        })
    })
});

app.listen(3000,function(){
    console.log("server started on 3000");
});
