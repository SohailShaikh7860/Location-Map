import express from "express";
import {Server} from "socket.io"
import http from "http"
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id:socket.id, ...data})
    })
    
    socket.on("disconnect",()=>{
        io.emit("user-disconnect", socket.id);
    })
})


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname,"public")));

app.use('/',(req,res)=>{
    res.render("index");
})
server.listen(8000,()=>{
    console.log("the server has started on PORT: 8000");
})