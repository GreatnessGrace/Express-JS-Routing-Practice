const express = require("express");
const path = require("path");
const app = express();

// Importing the routes folder for using that routers :
const mainRouter = require("./routes/index");

// Checking for the port that is already available ;
//  bcz 3000 may not be available ; We should always use this method insted of hardcoding the port number
const PORT = process.env.PORT || 3000;

// Telling express that we are using ejs express template using set method
// set  method takes 2 arguments as key - value pair :
app.set("view engine", "ejs");

// Console the value corresponding to its key
console.log(app.get("view engine"));

// We can also configure the template engine but for now we are keeping it default which is 'view'. So ejs will try to find the files in the views folder . So we have to create a views folder  .

// sending the dynamic file using ejs template :
app.get("/dynamic", (req, res) => {
  //   res.render('dynamic'); // render is a method which renders views on our server

  // Wanted to change the title of the page dyamically ; For which we have to send the data to the temolate from server
  // For that purpose we can pass an additional parameter to the render method which an object in that object we can put our data
  res.render("dynamic", {
    title: "My first Dynamic Page",
  });
});

// Another file using ejs template :
app.get("/random", (req, res) => {
  res.render("random");
});

// Static middleware Sending files on server without using routes only just by using static middleware :
app.use(express.static("public"));

// Sending HtML files on server using routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname) + "/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname) + "/about.html");
});

// Creating a route for downloading a file :
app.get("/download", (req, res) => {
  res.download(path.resolve(__dirname) + "/about.html");
});
//Creating a Server :
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// Using the routes from the route folder

app.use(mainRouter); // passing the mainRouter variable to use method

// We can add another parameter in a string form in the app.use method for adding any prefix in the url
app.use("/anku", mainRouter);
