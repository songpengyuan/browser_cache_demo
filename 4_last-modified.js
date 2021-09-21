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
        <h2>协商缓存 - Last-Modified</h2>
        为了节省服务器的资源，再次改进方案。浏览器和服务器协商，服务器每次返回文件的同时，告诉浏览器文件在服务器上最近的修改时间。请求过程如下：
        <br/> <br/>
        浏览器请求静态资源demo.js <br/>
        服务器读取磁盘文件demo.js，返给浏览器，同时带上文件上次修改时间 Last-Modified（GMT标准格式） <br/>
        当浏览器上的缓存文件过期时，浏览器带上请求头If-Modified-Since（等于上一次请求的Last-Modified）请求服务器 <br/>
        服务器比较请求头里的If-Modified-Since和文件的上次修改时间。如果果一致就继续使用本地缓存（304），如果不一致就再次返回文件内容和Last-Modified。 <br/>
        循环请求。。 <br/>

        <br/><br/><br/><br/><br/><br/>
        <hr/>
        <br/><br/><br/>


        虽然这个方案比前面三个方案有了进一步的优化，浏览器检测文件是否有修改，如果没有变化就不再发送文件；但是还是有以下缺点：<br/>

        由于Last-Modified修改时间是GMT时间，只能精确到秒，如果文件在1秒内有多次改动，服务器并不知道文件有改动，浏览器拿不到最新的文件<br/>
        如果服务器上文件被多次修改了但是内容却没有发生改变，服务器需要再次重新返回文件。<br/>

        <script src="/demo.js"></script>
    </body>
    </html>`)
})


app.get('/demo.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/js/demo.js');
    let cont = fs.readFileSync(jsPath);
   
    let status = fs.statSync(jsPath)
    let lastModified = status.mtime.toUTCString()
    // If-Modified-Since和文件的上次修改时间。如果果一致就继续使用本地缓存（304）
    if(lastModified === req.headers['if-modified-since']){
        res.writeHead(304, 'Not Modified')
        res.end()
    } else {
        res.setHeader('Cache-Control', 'public,max-age=5')
        res.setHeader('Last-Modified', lastModified)
        res.writeHead(200, 'OK')
        res.end(cont)
    }


    res.end(cont)
})



app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})