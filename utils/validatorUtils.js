class ValidatorUtils {
    // 验证表名
    static validateTableName(tableName) {
        const tableNameRegex = /^[a-zA-Z0-9_]+$/;
        if (!tableNameRegex.test(tableName)) {
            throw new Error('Invalid table name');
        }
        return tableName;
    }

    // 验证字段名
    static validateFieldName(field) {
        const fieldNameRegex = /^[a-zA-Z0-9_]+$/;
        if (!fieldNameRegex.test(field)) {
            throw new Error('Invalid field name');
        }
        return field;
    }

    // 验证ID
    static validateId(id) {
        if (!Number.isInteger(Number(id))) {
            throw new Error('Invalid ID format');
        }
        return Number(id);
    }

    // 验证SQL语句
    static validateSql(sql) {
        const dangerousKeywords = [
            'DROP',
            'DELETE',
            'TRUNCATE',
            'ALTER',
            'EXEC',
            'EXECUTE'
        ];

        const sqlUpper = sql.toUpperCase();
        if (dangerousKeywords.some(keyword => 
            sqlUpper.includes(keyword) && 
            !sqlUpper.startsWith('SELECT'))) {
            throw new Error('Potentially dangerous SQL operation detected');
        }
        return sql;
    }

    // 验证参数数组
    static validateParams(params) {
        if (!Array.isArray(params)) {
            throw new Error('Parameters must be an array');
        }
        return params;
    }

    // 验证字段数组
    static validateFields(fields) {
        if (fields === '*') return fields;
        
        if (Array.isArray(fields) && fields.length > 0) {
            return fields
                .map(field => this.validateFieldName(field))
                .map(field => `\`${field}\``)
                .join(', ');
        }
        throw new Error('Invalid fields parameter');
    }
}

module.exports = ValidatorUtils;
