import http from 'http';
import fsPromise from 'fs/promises';
import fs from 'fs';
import {parse} from 'querystring';
import path from 'path'
import Emitter from "events";


class Emitevents extends Emitter{};

const runEmit = new Emitevents();


const server=http.createServer(async (req, res)=>{    
    if(req.url === "/home"){
        // console.log(path.parse(req.url))
        if( req.method == "GET"){
            res.statusCode = 200;
            res.setHeader('Content-Type', "text/html");
            const homeHtml= await fsPromise.readFile("home.html")
            res.end(homeHtml.toString('utf-8'))
        }else{
            let body= "";
            req.on("data", (chunk)=>{
                body += chunk.toString()
            })
            req.on('end', ()=>{
                const formData= parse(body)
            })
            res.end("submitted")
        }
    }else if(req.url === "/contact"){
        if( req.method == "GET"){
            res.statusCode = 200;
            res.setHeader('Content-Type', "text/html");
            const contactHtml= await fsPromise.readFile("contact.html");
            res.end(contactHtml.toString('utf-8'))
        }else{
            let body= "";
            req.on("data", (chunk)=>{
                body += chunk.toString()
            })
            req.on('end', ()=>{
                const formData= parse(body)
            })
            res.end("submitted")
        }
    }else if(req.url === "/about"){
        if( req.method == "GET"){
            res.statusCode = 200;
            res.setHeader('Content-Type', "text/html");
            const aboutHtml= await fsPromise.readFile("about.html");
            res.end(aboutHtml.toString('utf-8'))
        }else{
            let body= "";
            req.on("data", (chunk)=>{
                body += chunk.toString()
            })
            req.on('end', ()=>{
                const formData= parse(body)
            })
            res.end("submitted")
        }
    }
    else{
        res.end('404 error. page not found.')
    }
});



// const server=http.createServer(async (req, res)=>{  
//     let requestTime= new Date();

//     runEmit.emit('log', `${req.url}\t${req.method}\t${requestTime.getDate()}/${requestTime.getMonth()}/${requestTime.getFullYear()}`);
//     const extension = path.extname(req.url);
//     let contentType;
    
//     switch (extension) {
//         case '.css':
//             contentType = "text/css";
//             break;
//         case '.js':
//             contentType = "text/javascript";
//             break;
//         case '.json':
//             contentType = "application/json";
//             break;
//         case '.jpg':
//             contentType = "image/jpeg";
//             break;
//         case '.png':
//             contentType = "image/png";
//             break;
//         case '.txt':
//             contentType = "text/plain";
//             break;
    
//         default:
//             contentType = "text/html";
//             break;
//     }

    
//     let fileExist= fs.existsSync( path.parse(req.url).base);
//     if(fileExist && contentType){
//         res.statusCode = 200;
//         res.setHeader('Content-Type', contentType);
//         const file = await fsPromise.readFile(path.parse(req.url).base);
//         res.end(file.toString('utf-8'))
//     }else{
//         res.end('File does not exist');
//     }
    
// });




// runEmit.on('log', (message)=>{
//     createFile(message)
// })

// async function createFile(msg){
//     try {
//         await fsPromise.appendFile('test.txt', `${msg} \n\n`);
//     } catch (error) {
//         console.error(error.message)
//     }
    
// }



process.on('uncaughtException', (error)=>{
    console.error(error)
    process.exit(1)
})

//now we make our server listing to a particular port from our local host or HOST//
server.listen(7500, function(){
    console.log("server has started and it listening!")
});
