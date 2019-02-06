const express = require("express");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;

// set up middleware here
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

// set up routes
app.use(routes);

app.listen(PORT, () => console.log(`=> You're on Port ${PORT}`));
