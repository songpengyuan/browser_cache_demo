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
        <h2>强制缓存- Cache-Control</h2>
        针对浏览器和服务器时间不同步，加入了新的缓存方案；这次服务器不是直接告诉浏览器过期时间，而是告诉一个相对时间Cache-Control=10秒，意思是10秒内，直接使用浏览器缓存。
        <br/>
        它常见的取值private、public、no-cache、max-age，no-store，默认值为private，各个取值的含义如下：<br/><br/>

        private: 客户端可以缓存 <br/>
        public: 客户端和代理服务器都可缓存<br/><br/>
        max-age=xxx: 缓存的内容将在 xxx 秒后失效<br/><br/>
        no-cache: 需要使用对比缓存来验证缓存数据<br/><br/>
        no-store: 所有内容都不会缓存，强制缓存，对比缓存都不会触发<br/><br/>

        <br/><br/><br/><br/>
        所以我们在刷新页面的时候，如果只按F5只是单纯的发送请求，按Ctrl+F5会发现请求头上多了两个字段Pragma: no-cache和Cache-Control: no-cache。


        <script src="/demo.js"></script>
    </body>
    </html>`)
})


app.get('/demo.js',(req, res)=>{
    let jsPath = path.resolve(__dirname,'./static/js/demo.js');
    let cont = fs.readFileSync(jsPath);

    // 设置 Cache-Control
    res.setHeader('Cache-Control', 'public,max-age=120') //2分钟

    res.end(cont)
})



app.listen(port,()=>{
    console.log(`listen on ${port}`)    
})