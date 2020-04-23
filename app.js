const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  exphbs({
    layoutsDir: "views/_layouts",
    defaultLayout: "main",
    partialsDir: "views/_partials",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

app.get("/", function (req, res) {
  // res.send('hello expressjs');
  res.render("home", {
    helpers: {
      title: () => 'Home'
    }
  });
});

app.use("/admin/users", require("./routes/user.route"));

app.use(function (req, res) {
  res.render("404", { layout: false });
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`Server is running at http://localhost:${PORT}`);
});
