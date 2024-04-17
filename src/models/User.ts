import { pool } from "./Database";

export class User{

    async createUser(first_name:string, last_name:string, gender:string, date_of_birth:string, email:string): Promise<void>{
        
        const query = 'INSERT INTO person(first_name, last_name, gender, date_of_birth, email) VALUES($1, $2, $3, $4, $5)';
        const values = [first_name, last_name, gender, date_of_birth, email];
        await pool.query(query, values);
    
    }

    async getUserByFirstName(first_name:string): Promise<any>{
        
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await pool.query(query, [first_name]);
        return rows;
    
    }
    async updateUserEmail(id:number, email:string): Promise<void>{
        
        const query = 'UPDATE person SET email = $1 WHERE id= $2';
        await pool.query(query, [email, id]);
    
    }
    async deleteUser(first_name:string): Promise<any>{
        
        const query = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await pool.query(query, [first_name]);
        return rows;
    
    }
    
    
}