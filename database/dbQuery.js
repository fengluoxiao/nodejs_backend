const db = require('../utils/dbUtils');
const validator = require('../utils/validatorUtils');

class DbQuery {
    async getTableColumns(tableName) {
        tableName = validator.validateTableName(tableName);
        const [columns] = await db.execute(`SHOW COLUMNS FROM \`${tableName}\``);
        return columns.map(col => col.Field);
    }

    async findAll(tableName, params = [], fields = '*') {
        tableName = validator.validateTableName(tableName);
        fields = validator.validateFields(fields);
        params = validator.validateParams(params);

        const sql = `SELECT ${fields} FROM \`${tableName}\``;
        return await db.execute(sql, params);
    }

    async findById(tableName, id, fields = '*') {
        tableName = validator.validateTableName(tableName);
        id = validator.validateId(id);
        fields = validator.validateFields(fields);

        const sql = `SELECT ${fields} FROM \`${tableName}\` WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        return rows[0];
    }

    async execute(sql, params = []) {
        sql = validator.validateSql(sql);
        params = validator.validateParams(params);
        return await db.execute(sql, params);
    }
}

module.exports = new DbQuery();
