import e from "express";
import { pool } from "../models/dbPool.mjs";
import bcrypt, { hash } from "bcrypt";
import JWT from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv";

const sign = promisify(JWT.sign);

dotenv.config();

export const register = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (!email || !password || !username)
    return res.status(400).send({ error: "invalid request" });

  if (password !== confirm_password) {
    return res.status(400).send({ error: "passwords do not match" });
  }

  if (!password || !confirm_password) {
    return res
      .status(400)
      .send({ error: "password or confirm password is not provided" });
  }

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
      const token = await sign({ email }, process.env.SECRET_JWT, {
        algorithm: "HS512",
        expiresIn: "1h",
      });
      console.log(token);
      // return res.send({ token });  => it works when asking to response send the token, but "cannot generate" when sending to the cookie
      res.cookie("access_token", token, {
        httpOnly: true,
      });
      res.send({id : `${query.rows[0].id}`})
      
      
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: "Cannot generate token" });
    }
  } else {
    return res.status(403).send({ error: "wrong password" });
  }
};


export const uploadProfilPicture = async (req, res) => {
  const file = await req.files.image
  try{
      const result = await cloudinary.uploader.upload(file.tempFilePath)
      const user_id = req.decoded
      const profilPicture = await pool.query('insert into users (profilpicture_url) values ($1) where id = $2', 
      [result.secure_url, user_id ]);
      return res.send({ info : `profil picture succesfully uploaded for user ${user_id} `})
  }catch(err) {
      res.status(400).send({error : err})
  }
}

export const unsubscribeUser = async (req, res) => {
  const id = req.params.id;
  try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      if (result.rows.length === 0) {
          return res.status(404).send({ error: "user not found" });
      }
      await pool.query("DELETE FROM users WHERE id = $1", [id]);
      return res.status(200).send({ message: "successfully unsubscribed" });
  } catch (error) {
      res.status(500).send({ error: "Internal server error" });
  }
};

export const logout = (request, response) => {
  return response
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out" });
};

