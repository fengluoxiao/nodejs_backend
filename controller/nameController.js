const dbQuery = require('../database/dbQuery');

class NameController {
    // 获取表结构
    async getTableStructure(tableName) {
        try {
            const columns = await dbQuery.getTableColumns(tableName);
            return {
                success: true,
                data: columns
            };
        } catch (error) {
            console.error('Error:', error);
            throw {
                status: 500,
                message: 'Database error'
            };
        }
    }

    // 获取所有用户
    async getAllUsers() {
        try {
            const [rows] = await dbQuery.findAll('nameTest');
            const columns = await dbQuery.getTableColumns('nameTest');
            return {
                success: true,
                columns: columns,
                data: rows
            };
        } catch (error) {
            console.error('Error:', error);
            throw {
                status: 500,
                message: 'Database error'
            };
        }
    }

    // 获取单个用户
    async getUserById(id) {
        try {
            const user = await dbQuery.findById('nameTest', id);
            if (!user) {
                throw {
                    status: 404,
                    message: 'User not found'
                };
            }
            return {
                success: true,
                data: user
            };
        } catch (error) {
            if (error.status) throw error;
            console.error('Error:', error);
            throw {
                status: 500,
                message: 'Database error'
            };
        }
    }
}

module.exports = new NameController();
