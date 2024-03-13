// CREATE TABLE IF NOT EXISTS public.auth
// (
//     email character varying(255) COLLATE pg_catalog."default" NOT NULL,
//     password text COLLATE pg_catalog."default",
//     role character varying(10) COLLATE pg_catalog."default",
//     name character varying(255) COLLATE pg_catalog."default",
//     CONSTRAINT auth_pkey PRIMARY KEY (email)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.auth
//     OWNER to postgres;

import pool from '../../index';

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

class UserModel {
    create(user: User): Promise<void> {
        const query = 'INSERT INTO public.auth(name, email, password, role) VALUES($1, $2, $3, $4)';
        const values = [user.name, user.email, user.password, user.role];

        return pool.query(query, values)
            .then(() => console.log('User created successfully'))
            .catch(err => console.error('Error creating user:', err));
    }

    get(email: string): Promise<User | null> {
        const query = 'SELECT * FROM public.auth WHERE email = $1';
        const values = [email];

        return pool.query(query, values)
            .then(result => {
                if (result.rows.length > 0) {
                    return result.rows[0] as User;
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.error('Error getting user:', err);
                return null;
            });
    }

}

export default new UserModel();