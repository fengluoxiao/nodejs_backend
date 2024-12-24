const mysql = require('mysql2/promise');
require('dotenv').config();

class DbUtils {
    // private 实例变量
    static #instance = null;
    #pool = null;

    // private 构造函数
    constructor() {
        if (DbUtils.#instance) {
            throw new Error('DbUtils is a singleton class. Use DbUtils.getInstance() instead.');
        }
        this.#pool = mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        DbUtils.#instance = this;
    }

    // 获取单例实例的静态方法
    static getInstance() {
        if (!DbUtils.#instance) {
            DbUtils.#instance = new DbUtils();
        }
        return DbUtils.#instance;
    }

    async execute(sql, params = []) {
        const [rows] = await this.#pool.execute(sql, params);
        return [rows];
    }

    async getConnection() {
        return await this.#pool.getConnection();
    }
}

// 导出单例实例
module.exports = DbUtils.getInstance();
