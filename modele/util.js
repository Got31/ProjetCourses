const express = require("express");
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

app.get("/api/ingredients", (req, res) => {
  //   res.json(urls);
  // Avec mysql :
  connection.query("SELECT * FROM ingredient", (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});

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

app.listen(3001, () => {
  console.log("serveur lancé sur le port " + 3001);
});

/*******
 * ***********
 * PROJET MENU
 * ***********
 */

//Récupération des repas :
app.get("/api/repas", (req, res) => {
  //   res.json(urls);
  // Avec mysql :
  connection.query(
    // "SELECT * , DATE_FORMAT(Date_repas, '%d %m %Y')  FROM repas",
    "SELECT id_repas, Invites , DATE_FORMAT(Date_repas, '%d-%m-%Y') as 'Date_repas'  FROM repas",
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

app.get("/api/repas&recettes/:id", (req, res) => {
  connection.query(
    " SELECT rct.Nom, rct.Deroule" +
      " FROM repas rps, recette rct, contenir c" +
      " WHERE c.id_repas = rps.id_repas AND c.id_recette = rct.id_recette" +
      " AND rps.id_repas = " +
      req.params.id,
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

//Récupération des repas et de leurs recettes :
/*app.get("/api/repas&recettes", (req, res) => {
  //   res.json(urls);
  // Avec mysql :
  connection.query(
    " SELECT rps.Invites, DATE_FORMAT(rps.Date_repas, '%d-%m-%Y') as 'Date_repas', rct.Nom, rct.Deroule" +
      " FROM repas rps, recette rct, contenir c" +
      " WHERE c.id_repas = rps.id_repas AND c.id_recette = rct.id_recette",
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});*/
