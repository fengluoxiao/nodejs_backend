const express = require('express');
const router = express.Router();
const nameController = require('../controller/nameController');

// 获取表结构
router.get('/table/structure/:tableName', async (req, res) => {
    try {
        const result = await nameController.getTableStructure(req.params.tableName);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
});

// 获取所有用户
router.get('/users', async (req, res) => {
    try {
        const result = await nameController.getAllUsers();
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
});

// 获取单个用户
router.get('/users/:id', async (req, res) => {
    try {
        const result = await nameController.getUserById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
