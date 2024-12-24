const express = require('express');
const dbQuery = require('./database/dbQuery');
const app = express();

// 添加跨域支持 - 移到最前面
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

// 获取表结构
app.get('/api/table/structure/:tableName', async (req, res) => {
    try {
        const columns = await dbQuery.getTableColumns(req.params.tableName);
        res.json({
            success: true,
            data: columns
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error'
        });
    }
});

// 获取所有用户（支持字段选择）
app.get('/api/users', async (req, res) => {
    try {
        const [rows] = await dbQuery.findAll('nameTest');
        const columns = await dbQuery.getTableColumns('nameTest');
        res.json({
            success: true,
            columns: columns, // 返回字段信息
            data: rows
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error'
        });
    }
});

// 获取单个用户
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await dbQuery.findById('nameTest', req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            message: 'Database error'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
