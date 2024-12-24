const express = require('express');
const nameRouters = require('./routers/name_routers');
const app = express();

// 添加跨域支持
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// 支持 JSON 请求体解析
app.use(express.json());

// 根路由
app.get('/', async (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the API',
        endpoints: {
            getAllUsers: '/api/users',
            getSingleUser: '/api/users/:id'
        }
    });
});

// 使用路由
app.use('/api', nameRouters);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
