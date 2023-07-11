const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const https = require("https");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/news.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.Fname;
  const lastName = req.body.Lname;
  const emailId = req.body.emailid;

  const data = {
    members: [
      {
        email_address: emailId,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
   const url="https://us10.api.mailchimp.com/3.0/lists/67b16ffc87";
   const options= {
    method:"POST",
    auth:"vishal23:f9f1b38891a8961500bc6f4c84ed9c22-us10"

   }


 const request = https.request(url, options , function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname + "/sucess.html");
    }
    else{res.sendFile(__dirname + "/failure.html");
}

    response.on("data",function(data){
        console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT||3000, function () {
  console.log("server is running");
});
//api key
//acd9ef9c7f3c5a7c3ec5fef3d8398aaf-us13
//listid//
