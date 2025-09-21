import express from "express";
import {Server} from "socket.io"
import http from "http"

const app = express();
const server = http.createServer(app);
const io = new Server(server);
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

io.on("connection",(socket)=>{
    console.log("Socket connected");
})

app.use('/',(req,res)=>{
    res.send("Home");
})

app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

server.listen(8000,()=>{
    console.log("the server has started on PORT: 8000");
})