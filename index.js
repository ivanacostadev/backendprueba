const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const port = 3011;
require('dotenv').config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extend: true }));

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  
app.use(cors(corsOptions));

const db = mysql.createPool({
    host: "195.179.238.1",
    user: "u611292494_ivan",
    password: "Css9393$$$",
    database: "u611292494_iastest"
  });

  app.get("/",(req,res)=>{
    res.send("Hola este es mi servidor")
  })

  app.post("/newpost",(req,res)=>{
    const userPost=req.body;

    const sqlposts="INSERT INTO tbl_Posts(id_User, st_Titulo, st_Autor, dt_Fecha, st_Contenido) VALUES (?,?,?,?,?)"
    db.query(sqlposts,[userPost.idUser,userPost.titulo,userPost.autor,userPost.fecha,userPost.contenido]
      ,(err,result)=>{
      if (err) {
        console.error('Error al insertar datos en la base de datos:', err);
        res.status(500).json({ message: 'Error en el registro' });
      } else {
        console.log('Registro exitoso');
        res.send('Registro exitoso');
      }

    })


  })
 
  app.post('/signup', (req, res) => {
    const userData = req.body; 
    const sql = 'INSERT INTO tbl_Users (st_NombreUser, st_Email, st_Password) VALUES (?, ?, ?)';
    db.query(sql, [userData.username, userData.email, userData.password], (err, result) => {
      if (err) {
        console.error('Error al insertar datos en la base de datos:', err);
        res.status(500).json({ message: 'Error en el registro' });
      } else {
        console.log('Registro exitoso');
        res.json({ message: 'Registro exitoso' });
      }
    });
  });

  app.post("/login", (req, res) => {
    const { email, password } = req.body;
  

    const sql = "SELECT * FROM tbl_Users WHERE st_Email = ? AND st_Password = ?";
    db.query(sql, [email, password], (err, results) => {
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {

        if (results.length > 0) {
 
          const usuario = results[0];
          res.send(usuario)
          console.log(usuario)
        } else {
        
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }
    });
  });

  app.get("/getposts",(req,res)=>{
    queryselect="SELECT * FROM tbl_Posts"
    db.query(queryselect,(err,results)=>{
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {

        if (results.length > 0) {
     
          const posts = results;
          res.send(posts)
          console.log(posts)
        } else {
     
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }

    })

  })

  app.post("/getpostsautor",(req,res)=>{
    const { busqueda } = req.body;
    queryselect="SELECT * FROM tbl_Posts WHERE st_Autor LIKE ?"
    db.query(queryselect, [`%${busqueda}%`], (err, results)=>{
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {

        if (results.length > 0) {

          const posts = results;
          res.send(posts)
          console.log(posts)
        } else {

          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }

    })

  })

  app.post("/getposttitle",(req,res)=>{
    const { busqueda } = req.body;
    queryselect="SELECT * FROM tbl_Posts WHERE st_Titulo LIKE ?"
    db.query(queryselect, [`%${busqueda}%`], (err, results)=>{
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {

        if (results.length > 0) {
 
          const posts = results;
          res.send(posts)
          console.log(posts)
        } else {
        
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }

    })

  })
  app.post("/getpostpalabras",(req,res)=>{
    const { busqueda } = req.body;
    queryselect="SELECT * FROM tbl_Posts WHERE st_Contenido LIKE ?"
    db.query(queryselect, [`%${busqueda}%`], (err, results)=>{
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {

        if (results.length > 0) {
 
          const posts = results;
          res.send(posts)
          console.log(posts)
        } else {
        
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }

    })

  })



  app.get("/getpostsuser/:iduser", (req, res) => {
    const iduser = req.params.iduser;
  
    const queryselectid = 'SELECT * FROM tbl_Posts WHERE id_User = ?';
    db.query(queryselectid, [iduser], (err, results) => {
      if (err) {
        console.error("Error en la consulta SQL:", err);
        res.status(500).json({ error: "Error en el servidor" });
      } else {
        if (results.length > 0) {
 
          const posts = results;
          res.send(posts);
          console.log(posts);
        } else {
        
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      }
    });
  });
  


app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});

if (db) {
    console.log("DB conectada");
  }
