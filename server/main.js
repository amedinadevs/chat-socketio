// RECURSOS: https://carlosazaustre.es/websockets-como-utilizar-socket-io-en-tu-aplicacion-web/

// INSTALAR EXPRESS: framework de desarrollo de aplicaciones web
// $ npm install express --save  // npm i express -S
var express = require('express');
var app = express();

// CREAMOS SERVIDOR
// http viene en node
// le pasamos la aplicación para que se ejecute en http
var server= require('http').Server(app)

// INSTALAMOS IO.SOCKET
// $ npm i socket.io -S
var io = require('socket.io')(server);


var messages = [{
    texto:"Hola, mi primer mensaje",
    author:"Alex"
}];

// INSTALAMOS NODEMON: 
// como desarrollo(dev) // para no reiniciar node cada vez que hagamos un cambio
// $ npm i nodemon -D //  npm install nodemon --save-d
// cambiar en package.json el scripts/start y poner "nodemon server/main.js" para que se ejecute cada vez
// $ npm start

// STATIC: middleware para ejecutar parte publica estática que trae node
// el parametro es la carpeta donde estan los ficheros publicos
app.use(express.static('public'));

// PRUEBA PARA ENVIAR ALGO AL SERVER
// donde '/' es la ruta. Si le ponemos '/hello' escuchara en una ruta REST: http://localhost:8080/hello/
app.get('/', function(request, response){
    response.status(200).send("Hello mundo");
});


//SERVIDOR DE SOCKETS
// on() = escuchar
// necesitamos una parte publica que mande sokects -> creamos carpeta public
io.on('connection', function(socket){
    console.log("Alguien se ha conectado con sockets....");
    
    // emite eventos al conectarse
    socket.emit('messages',messages)

    // escuchar eventos del cliente: solo en mi socket de servidor porque es el único
    socket.on('addMessage', function(data){
        messages.push(data);
        
        // avisar a TODOS los clientes que ha llegado el mensaje
        io.sockets.emit('messages',messages);
    });

    // PRUEBA PARA NOATUM con vue-socket
    socket.on('SOCKET_prueba', function(data){
        messages.push(data);
        console.log("SOCKET_addMessage!!")
        // avisar a TODOS los clientes que ha llegado el mensaje
        io.sockets.emit('messages',messages);
    });
});

//PARA PROBAR QUE EL SERVIDOR FUNCIONA: 
//$ node server/main.js
server.listen(9000, function(){
    console.log("Servidor corriendo...")
});