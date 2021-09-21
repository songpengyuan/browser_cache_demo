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
        <h2>协商缓存 - ETag</h2>
        为了解决文件修改时间不精确带来的问题，服务器和浏览器再次协商，这次不返回时间，返回文件的唯一标识ETag。只有当文件内容改变时，ETag才改变。请求过程如下：
        <br/> <br/>

        浏览器请求静态资源demo.js<br/>
        服务器读取磁盘文件demo.js，返给浏览器，同时带上文件的唯一标识ETag<br/>
        当浏览器上的缓存文件过期时，浏览器带上请求头If-None-Match（等于上一次请求的ETag）请求服务器<br/>
        服务器比较请求头里的If-None-Match和文件的ETag。如果一致就继续使用本地缓存（304），如果不一致就再次返回文件内容和ETag。<br/>
        循环请求。。<br/>


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