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

let users=0;
io.on('connection',(socket)=>{
    console.log("user is connected")
    users++;
    io.sockets.emit('newuser',{message:"wlcome to chat room"})
    socket.broadcast.emit('newuser', {message: users +" user connected"})
    
    socket.on("disconnect",()=>{
        console.log("user is disconnected")
        users--;
        socket.broadcast.emit('newuser', {message:users + "users disconnected"})
    })
})

http.listen(3000,()=>{
    console.log("server is running")})