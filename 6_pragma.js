const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');
const md5 = require('md5');



app.get('/',(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        <h1>Http Cache Demo</h1>
        <h2>一段尘封的历史 - pragma</h2>
        
        <br/> <br/>
        当该字段值为no-cache的时候，会告诉浏览器不要对该资源缓存，即每次都得向服务器发一次请求才行。
        
        <br/> <br/>
        =========== 
        <br/> <br/>

        res.setHeader('Pragma', 'no-cache') //禁止缓存 <br/>
        res.setHeader('Cache-Control', 'public,max-age=120') //2分钟 

        <br/> <br/>
        =========== 
        <br/> <br/>
        

        通过Pragma来禁止缓存，通过Cache-Control设置两分钟缓存，但是重新访问我们会发现浏览器会再次发起一次请求，说明了Pragma的优先级高于Cache-Control

        <br/><br/><br/><br/><br/><br/>
       

        <script src="/demo.js"></script>
    </body>
    </html>`)
})


app.get('/demo.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/js/demo.js');
    let cont = fs.readFileSync(jsPath);
   
    let etag = md5(cont);

    if(req.headers['if-none-match'] === etag){
        res.writeHead(304, 'Not Modified');
        res.end();
    } else {
        res.setHeader('ETag', etag);
        res.writeHead(200, 'OK');
        res.end(cont);
    }})



app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})