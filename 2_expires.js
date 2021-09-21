const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path');

const moment = require('moment');

app.get('/',(req,res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Document</title>
    </head>
    <body>
        <h1>Http Cache Demo</h1>
        <h2>强制缓存- Expires</h2>
        Expires的值是服务器告诉浏览器的缓存过期时间（值为GMT时间，即格林尼治时间），即下一次请求时，如果浏览器端的当前时间还没有到达过期时间，则直接使用缓存数据。下面通过我们的Express服务器来设置一下Expires响应头信息。
        <br/>
        两分钟过后可以刷新一下页面看到浏览器再次发送请求了。
        <br>
        <ul>
            <li> 由于浏览器时间和服务器时间不同步，如果浏览器设置了一个很后的时间，过期时间一直没有用</li>
            <li> 缓存过期后，不管文件有没有发生变化，服务器都会再次读取文件返回给浏览器</li>
        </ul>
        不过Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。

        <script src="/demo.js"></script>
    </body>
    </html>`)
})

function getGLNZ(){
    return moment().utc().add(2,'m').format('ddd, DD MMM YYYY HH:mm:ss')+' GMT';
}

app.get('/demo.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/js/demo.js');
    let cont = fs.readFileSync(jsPath);
    // 设置 Expires
    res.setHeader('Expires', getGLNZ()) //2分钟
    res.end(cont)
})



app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})