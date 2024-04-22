"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const Database_1 = require("./Database");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    async createUser(first_name, last_name, gender, date_of_birth, email, password) {
        //verify if the password is a String
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }
        const query = 'INSERT INTO person(first_name, last_name, gender, date_of_birth, email, password) VALUES($1, $2, $3, $4, $5, $6)';
        //encrypts the password with bcrypt
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        //values to allocate in the query
        const values = [first_name, last_name, gender, date_of_birth, email, hashedPassword];
        await Database_1.pool.query(query, values);
    }
    async updateUserEmail(id, email) {
        const query = 'UPDATE person SET email = $1 WHERE id= $2';
        await Database_1.pool.query(query, [email, id]);
    }
    async deleteUser(id) {
        const query = 'DELETE FROM person WHERE id = $1';
        await Database_1.pool.query(query, [id]);
    }
    async selectLogin(email) {
        const query = 'SELECT * FROM person WHERE email = $1';
        const { rows } = await Database_1.pool.query(query, [email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
}
exports.User = User;
