const app=require('express')()
const http=require("http").Server(app)
const path=require('path')
const io=require('socket.io')(http)
app.get('/',(req,res)=>{

    let options={
        root:path.join(__dirname)
    }
    let filename="index.html"
    res.sendFile(filename,options)
})

let roomno =1;
let full=0;

io.on('connection',(socket)=>{
    console.log("user is connected")
    socket.join("room-"+roomno)
    io.sockets.in("room-"+roomno).emit('newuser',"you are connected to room no "+roomno)
    full ++
    if (full>=0) {
        full=0;
        roomno++
    }
    socket.on("disconnect",()=>{
        console.log("user is disconnected")
        socket.broadcast.emit('newuser', {message:"users disconnected"})
    })
})

http.listen(3000,()=>{
    console.log("server is running")})