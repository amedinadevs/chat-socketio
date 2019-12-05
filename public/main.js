// para conectarse al servidor
// ejecutará el método on() del servidor
var socket = io.connect('http://localhost:9000',{'forceNew':true});

// escuchar los eventos del servidor
socket.on('messages', function(data){
    console.log(data);
    render(data);
})

function render(data){

    var html =  data.map(function(el, index){
        return (`<div>
                <em>${el.author}</em>: ${el.texto} 
                </div>`);
        }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

function anadirMensaje(e){
    var payload = {
        author: document.getElementById('author').value,
        texto: document.getElementById('texto').value
    }

    // notifica al servidor
    socket.emit('addMessage', payload);
    
    return false;
}