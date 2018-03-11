var express = require("express");

//Va al proceso, pilla las variables de entorno del sistema y devuelve el valor de la PORT
var port = (process.env.PORT || 1607);
var app = express();



//########################################################//
var BASE_API_URL = "/api/v1";
//########################################################//



//Esto es lo último
//app.use("/", express.static("/home/ubuntu/workspace/API 03/public"));
//Para que pille la dirección referente al directorio donde se está ejecutando, por si lo movemos de directorio no tener que andar cambiando la url
app.use("/", express.static(__dirname + "/public"));



//app.listen(port);
app.listen(port,()=>{
    console.log("esto se verá cuando ya esté listo el servidor");
})
//un ejemplo de sistema de gestión de eventos
.on("error",(e)=>{console.log("Server not ready"+e)})
;

console.log("esto salrá al ejecutar el index");

