//Para usar en nuestro módulo uno instalado:
//var modulo = require("nombredelmoduloinstalado");


console.log("Hola mundo");



var express = require("express");
var app = express();

app.get("/hello",(req,res)=>{

    res.send("Hello World!");        
});

//Aquí hay que sustituir port por el puerto a usar, cloud9 bloquea algunos
app.listen(process.env.PORT);