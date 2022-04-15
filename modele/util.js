const { query } = require("express");
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
    " SELECT id_repas, Invites , DATE_FORMAT(Date_repas, '%d / %m / %Y') as 'Date_repas'" +
      " FROM repas ORDER BY Date_repas",
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

//Récupération d'un repas :
app.get("/api/repas/:id", (req, res) => {
  connection.query(
    " SELECT Nom FROM repas rps WHERE id_repas = " + req.params.id,
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

//Récupération d'un repas et de ses recettes :
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

//Suppression des recettes d'un repas :
app.delete("/api/repas&recettes/:id", (req, res) => {
  connection.query(
    "DELETE FROM contenir WHERE id_repas =" + req.params.id,
    (error) => {
      if ((error, result)) throw error;
      console.log("AAAAA");
      res.json(result);
    }
  );
});

//Suppression d'un repas :
app.delete("/api/repas/:id", (req, res) => {
  connection.query(
    " DELETE FROM repas WHERE id_repas = " + req.params.id,
    (error) => {
      if (error) throw error;
      else {
        connection.query(
          " DELETE FROM contenir WHERE id_repas = " + req.params.id,
          (error, result) => {
            if (error) throw error;
            res.json(result);
          }
        );
      }
    }
  );
});

//Attribution des recettes à un repas :
app.post("/api/repas&recettes/:id", (req, res) => {
  console.log("eYOEEE");
  connection.query(
    req.body.forEach((element) => {
      "INSERT INTO contenir VALUES(" + req.params.id + "," + element + ")",
        (error, result) => {
          if (error) throw error;
          res.json(result);
        };
    })
  );
});

// Modification d'un repas :
app.put("/api/repas/:id", (req, res) => {
  console.log(req.body);
  connection.query(
    " UPDATE `repas` SET `Invites`=" +
      req.body.Invite +
      ",`Date_repas`='" +
      req.body.Date_repas +
      "' WHERE id_repas =" +
      req.params.id,
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

//Récupération des ingrédients, de leur quantité et de leur prix
app.get("/api/course/", (req, res) => {
  connection.query(
    "SELECT c.id_ingredient, i.Nom, i.Prix, SUM(c.Quantite) as 'qte', rps.id_repas, Invites" +
      " FROM ingredient i, composer c, repas rps, contenir ct, recette rct" +
      " WHERE i.id_ingredient = c.id_ingredient" +
      " AND rct.id_recette = c.id_recette" +
      " AND rps.id_repas = ct.id_repas" +
      " AND rct.id_recette = ct.id_recette " +
      " GROUP BY id_ingredient, rps.id_repas",
    (error, result) => {
      if (error) throw error;
      res.json(result);
    }
  );
});

//Récupération des recettes :
app.get("/api/recettes", (req, res) => {
  connection.query("SELECT * FROM recette", (error, result) => {
    if (error) throw error;
    res.json(result);
  });
});
