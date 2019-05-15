const express = require('express')
const app = express()

// Imports
const Colour = require('./helpers/colours').Colour;


const port = process.env.VOUPORT || 3000;

app.get('/', (req, res) => {
	res.json({ message: "You are accessing the Vouper api!" })
})

app.listen(port, () => {
	console.log("The Vouper API is up and running at: " + Colour.FgBlue + "127.0.0.1:" + Colour.FgGreen + "3000" + Colour.Reset);
})