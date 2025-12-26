@echo off
chcp 65001

echo 正在启动 node.js HTTP 服务器（端口 9091）...
call npm run start

pause
exit /b