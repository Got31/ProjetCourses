const app = express();

var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "menu",
});

//Pour recevoir des données json en POST
app.use(express.json());

//Gestion des fichiers statiques
app.use(express.static("public"));

let urls = [
  {
    name: "korben",
    link: "https://www.korben.info",
    description: "Korben",
  },
  {
    name: "le monde",
    link: "https://www.lemonde.fr",
    description: "Le monde",
  },
  {
    name: "google",
    link: "https://www.google.fr",
    description: "Gooogle",
  },
];

/*******
 * ***********
 * ***********
 */

app.get("/api/urls", (req, res) => {
  //   res.json(urls);
  // Avec mysql :
  connection.query("SELECT * FROM urls", (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
app.get("/api/urls/:id", (req, res) => {
  res.json(urls[req.params.id]);
});

//Mettre à jour une donnée
app.put("/api/urls/:id", (req, res) => {
  urls[req.params.id] = req.body;
  return res.json(urls);
});

app.post("/api/urls", (req, res) => {
  urls.push(req.body);
  res.json(urls);
});

app.delete("/api/urls/:id", (req, res) => {
  urls.splice(req.params.id, 1);
  res.json(urls);
});

app.listen(port, () => {
  console.log("serveur lancé sur le port " + port);
});