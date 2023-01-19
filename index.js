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
// name space are use to create multiple routes like thing multiple connection

const route1=io.of('/hello')
const route2=io.of('/Hey')

route1.on('connection',(socket)=>{
    console.log("user is connected")
    route1.emit('newuser',{message:"wlcome to chat room"})
    socket.broadcast.emit('newuser', {message: " user connected"})
    
    socket.on("disconnect",()=>{
        console.log("user is disconnected")
        socket.broadcast.emit('newuser', {message:"users disconnected"})
    })
})

http.listen(3000,()=>{
    console.log("server is running")})