const express = require('express')
const Database = require("@replit/database")
const db = new Database()
const app = express()
const axios = require('axios')

app.get("/", async (req,res)=>{

db.list().then(keys => {

  res.end("DB Endpoints: /set /list /get /delete /delall\n\nSet: /set/key/value\n\nList: /list\n\nDelete: /delete/key\n\nGet: /get/key\n\nDelall: /delall\n\n------\n\nStats: \nAmount of Keys: "+keys.length)
})
})
app.get("/set/:key/:value", async (req,res) =>{
  if (!req.params.key) res.end("key needed.");
  var key = req.params.key
  var value = req.params.value || ""
  
  db.set(key, value).then(() => {res.end("set")});
})
app.get("/get/:key", async (req,res) =>{
  if (!req.params.key) res.end("key needed.");
  var key = req.params.key  
  db.get(key).then(value => {res.end(value)});
})
app.get("/list", async (req,res) =>{
  db.list().then(value => {res.json(value)});
})
app.get("/delete/:key", async (req,res) =>{
  if (!req.params.key) res.end("key needed.");
  var key = req.params.key  
  db.delete(key).then(() => {res.end("deleted")});
})
app.get("/delall",async (req,res) =>{
 await  db.list().then(async value => {
    var length = value.length
    for (var val of value) {
    await db.delete(val).then(() => {});
    }
    res.end("deleted all.")
  });
})
app.listen(4000)
