const express = require('express');
const path = require('path');
 
const app = express();
 
// 设置静态文件服务，这里会服务当前目录下的所有文件
app.use(express.static("./"));

// 启动服务器
app.listen(9091, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:9091`);
});
