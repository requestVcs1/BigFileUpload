let http = require('http');
let path = require('path');
//接受文件所需要的包
let Multiparty = require('multiparty');
//处理文件目录
let fse = require('fs-extra');
const server = http.createServer();
server.on('request', (req, res) => {
    //设置跨域
    res.setHeader('Access-control-Allow-Origin', '*');
    res.setHeader('Access-controll-Allow-Headers', '*');
    //   if (req.method === 'OPTIONS') {
    //       //探测帧请求
    //       res.status = 200;
    //       res.end();
    //       return;
    // }
    if (req.url === '/') {
        //生成文件解析对象
        const multiparty = new Multiparty.Form();
        multiparty.parse(req, async (err, fields, files) => {
            if (err) return;
            const [chunk] = files.chunk,
                [hash] = fields.hash,
                [name] = fields.name;
            //目标目录
            const chunkDir = path.resolve(path.resolve(__dirname, '..'), name);
            //判断目录是否存在
            if (!fse.pathExistsSync(chunkDir)) await fse.mkdirs(chunkDir);
            await fse.move(chunk.path, `${chunkDir}/${hash}`);
            res.end('gggggggg');
        });
    }
});
server.listen(3000, () => {
    console.log('正在监听');
});
