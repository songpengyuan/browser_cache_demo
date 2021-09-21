const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');

app.get('/',(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        <h1>Http Cache Demo</h1>
        <h2>强制缓存<h2>
        强制缓存分为两种情况，Expires和Cache-Control。<br>
        <h2>协商缓存</h2>
        强制缓存的弊端很明显，即每次都是根据时间来判断缓存是否过期；<br/>
        但是当到达过期时间后，如果文件没有改动，再次去获取文件就有点浪费服务器的资源了。<br/>
        协商缓存有两组报文结合使用：
        <ul>
            <li>Last-Modified和If-Modified-Since</li>
            <li>ETag和If-None-Match</li>
        </ul>
        <br/><br/>
        Pragma > Cache-Control > Expires > ETag > Last-Modified
        <script src="/demo.js"></script>
    </body>
    </html>`)
})

app.get('/demo.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/js/demo.js');
    let cont = fs.readFileSync(jsPath);
    res.end(cont)
})

app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})