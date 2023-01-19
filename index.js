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

io.on('connection',(socket)=>{
    console.log("user is connected")
    // to recive the message from frontend
        socket.on('nofil',(data)=>{
            console.log(data)
        })
    // sending message to client side 
    setTimeout(()=>{
        socket.emit("Nofil",{name:"nofil"})
    },3000)
    socket.on("disconnect",()=>{
        console.log("user is disconnected")
    })
})

http.listen(3000,()=>{
    console.log("server is running")})