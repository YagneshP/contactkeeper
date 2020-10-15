const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require("path");

//DATABASE Connection
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//PORT
const PORT = process.env.PORT || 5000;



//Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve Static assets in Production
if(process.env.NODE_ENV === "production"){
	//set static folder
	app.use(express.static("client/build"));

	app.get("*", (req,res)=> res.sendFile(path.resolve(__dirname,"client","build","index.html")));
}
//Listening Server
app.listen(PORT, console.log(`Server is listening on ${PORT}`));
