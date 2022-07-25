const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

// Import Routers
const booksRouter = require("./routes/books");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const rolesRouter = require("./routes/roles");
const permissionRouter = require("./routes/permission");
const readRouter =require("./routes/reading-list")
const roomRouter = require("./routes/room")

app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/books", booksRouter);
app.use("/register", registerRouter);
app.use("/roles", rolesRouter);
app.use("/login", loginRouter);
app.use("/permission", permissionRouter);
app.use("/readinglist",readRouter)
app.use("/rooms",roomRouter)

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
