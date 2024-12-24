# Node.js Backend

## 环境配置

1. 复制环境变量模板文件：
```bash
cp .env.example .env
```

2. 修改 .env 文件中的配置：
- DB_HOST: 数据库地址
- DB_PORT: 数据库端口
- DB_NAME: 数据库名称
- DB_USER: 数据库用户名
- DB_PASSWORD: 数据库密码

## 安装依赖
```bash
npm install
```

## 启动服务
```bash
node server.js
```
