const db = require('../utils/dbUtils');

class DbQuery {
    async getTableColumns(tableName) {
        const [columns] = await db.execute(`SHOW COLUMNS FROM ${tableName}`);
        return columns.map(col => col.Field);
    }

    async findAll(tableName, params = [], fields = '*') {
        const columns = await this.getTableColumns(tableName);
        if (Array.isArray(fields)) {
            fields = fields.map(field => {
                return field.startsWith('`') ? field : `\`${field}\``;
            }).join(', ');
        }
        const sql = `SELECT ${fields} FROM ${tableName}`;
        return await db.execute(sql, params);
    }

    async findById(tableName, id, fields = '*') {
        const sql = `SELECT ${fields} FROM ${tableName} WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    async execute(sql, params = []) {
        return await db.execute(sql, params);
    }
}

module.exports = new DbQuery();
