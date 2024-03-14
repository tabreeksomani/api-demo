import bcrypt from "bcryptjs";
import { expressjwt } from "express-jwt";
import { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();



// import { expressjwt } from "express-jwt";

/**
 * Hashes a password to be saved in the database
 * @param {*} password
 */
export const hashPassword = (password: string) => {
    const saltRounds = 14;
    return bcrypt
        .hash(password, saltRounds)
        .then((hash) => {
            // save in db with username
            // NO NEED TO SAVE SALT -- bcrypt figures it out along w the hash when comparing
            return hash;
        })
        .catch((err) => {
            console.log(err);
        });
};

/**
 * Compares the given password with the stored hash to see if they match
 * @param {*} givenPassword - Password given by user attempting to sign in
 * @param {*} hash - Hashed password stored in DB
 * @returns {boolean} - Indicates if given password matches stored password
 */
export const comparePassword = (givenPassword: string, hash: string) => {
    return bcrypt
        .compare(givenPassword, hash)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.log(err);
        });
};


/**
 * Authorization middleware
 * @param {*} role - Either 'Admin', 'Guardian', or 'Tutor'
 * @returns {function} - Express middleware functions
 */

export function authorize(role: string) {
    return [
        expressjwt({ secret: process.env.JWT_SECRET as Secret, algorithms: ["HS256"] }),
        // Role authorization middleware
        (req: any, res: any, next: any) => {
            console.log("Role is ", req.auth.role)
            if (
                req.auth.role !== "admin" &&
                req.auth.role !== "user"
            ) {
                return res.status(401).json({ message: "Unauthorized user" });
            }
            if (role === "admin" && req.auth.role !== "admin") {
                return res.status(401).json({ message: "Unauthorized Admin" });
            }
         
            next();
        },
        // Error middleware -- Called when expressjwt() throws an error
        (err:any, req:any, res:any, next:any) => {
            if (err.name === "UnauthorizedError") {
                return res.status(401).json({ message: "Unauthorized Error" });
            }
            next();
        },
    ];
}
