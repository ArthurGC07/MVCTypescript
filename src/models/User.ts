import { pool } from "./Database";
import bcrypt from 'bcrypt';

export class User {

    async createUser(first_name: string, last_name: string, gender: string, date_of_birth: string, email: string, password: string): Promise<void> {

        //verify if the password is a String
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }

        const query = 'INSERT INTO person(first_name, last_name, gender, date_of_birth, email, password) VALUES($1, $2, $3, $4, $5, $6)';

        //encrypts the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        //values to allocate in the query
        const values = [first_name, last_name, gender, date_of_birth, email, hashedPassword];
        await pool.query(query, values);

    }

    async updateUserEmail(id: number, email: string): Promise<void> {

        const query = 'UPDATE person SET email = $1 WHERE id= $2';
        await pool.query(query, [email, id]);

    }

    async deleteUser(id: number): Promise<void> {

        const query = 'DELETE FROM person WHERE id = $1';
        await pool.query(query, [id]);

    }

    async selectLogin(email: string): Promise<any> {
        const query = 'SELECT email, password FROM person WHERE email = $1';
        const { rows } = await pool.query(query, [email]);

        if (rows.length === 0) {
            return null;
        }
        return rows[0];

    }


}