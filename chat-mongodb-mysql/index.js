const express = require('express');
const ejs = require('ejs');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname,'public')))

app.set('views', path.join(__dirname, 'public'))
app.engine('html', ejs.renderFile)

app.use('/', (req, res) =>{
    res.render('index.html')
})

let messages = [];

io.on('connection', (socket)=>{
    console.log('novo usuario conectado id:' + socket.id)

    socket.emit('previousMessage', messages)

    socket.on('sendMessage', data =>{
        messages.push(data);

        socket.broadcast.emit('recivedMessage', data)
    })
});


server.listen(3000, ()=> {
    console.log('servidor chat satanico rodante em http://localhost:3000')
});
