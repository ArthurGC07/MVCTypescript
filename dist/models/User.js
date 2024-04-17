"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Database_1 = require("./Database");
class User {
    async createUser(first_name, last_name, gender, date_of_birth, email) {
        const query = 'INSERT INTO person(first_name, last_name, gender, date_of_birth, email) VALUES($1, $2, $3, $4, $5)';
        const values = [first_name, last_name, gender, date_of_birth, email];
        await Database_1.pool.query(query, values);
    }
    async getUserByFirstName(first_name) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await Database_1.pool.query(query, [first_name]);
        return rows;
    }
    async updateUserEmail(id, email) {
        const query = 'UPDATE person SET email = $1 WHERE id= $2';
        await Database_1.pool.query(query, [email, id]);
    }
    async deleteUser(first_name) {
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await Database_1.pool.query(query, [first_name]);
        return rows;
    }
}
exports.User = User;
