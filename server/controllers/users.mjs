import e from "express";
import {pool} from "../models/dbPool.mjs"
import bcrypt, { hash } from "bcrypt";
import JWT from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv"

const sign = promisify(JWT.sign);

dotenv.config()



export const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!email || !password || !username)
      return res.status(400).send({ error: "invalid request" });
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await pool.query(
        `insert into users (username, email, password) values ($1, $2, $3)`,
        [username, email, hashedPassword]
      );
      return res.send({ info: "user succesfully added" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "internal server error" });
    }
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;

  
    if (!email || !password)
      return res.status(400).send({ error: "invalid request" });
  
    const query = await pool.query(
      "select username, id, email, password from users where email =$1",
      [email]
    );
  
    if (query.rowCount === 0) {
      return res.status(404).send({ error: "user do not exists" });
    }
  
    const result = query.rows[0];
    const match = await bcrypt.compare(password, result.password);
    
  
    if (match) {
      try {
        const token = await sign(
          { email },
          process.env.SECRET_JWT,
          {
            algorithm: "HS512",
            expiresIn: "1h",
          }
        );
        // return res.send({ token });  => it works when asking to response send the token, but "cannot generate" when sending to the cookie
        res.cookie("access_token", token, {
          httpOnly: true,
        });

      } catch (err) {
        console.log(err);
        return res.status(500).send({ error: "Cannot generate token" });
      }
    } else {
      return res.status(403).send({ error: "wrong password" });
    }
  };



