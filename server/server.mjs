import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import {
  getBuildings,
  getBuildingby,
  addBuilding,
  getUserAdminBuildings,
  deleteBuilding,
  getOneBuilding,
  getZipcode,
  getCity,
  getAdress,
  getType
} from "./controllers/buildings.mjs";

import {
  postAnnonces,
  getAllAnnonces,
  getOneAnnonce,
  deleteAnnonce,
  updateAnnonce,
} from "./controllers/annonces.mjs";

import { getComments, postComment } from "./controllers/comments.mjs";

import { cloudinaryConfig } from "./models/cloudinaryconfig.mjs";

import { dbConnect } from "./models/dbConnect.mjs";
import cookie from "cookie-parser";
import dotenv from "dotenv";
import {
  register,
  login,
  uploadProfilPicture,
  unsubscribeUser,
  logout,
  getInfoUsers,
} from "./controllers/users.mjs";

import { createDiscussion,
getDiscussion } from "./controllers/discussions.mjs";

import { uploadImage } from "./controllers/images.mjs";
import jwtAuthentification from "./middleware/verifyToken.mjs";
import * as cloudinary from "cloudinary";


dotenv.config();
dbConnect();
const server = express();
cloudinaryConfig();

server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookie(process.env.SECRET_JWT));
server.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);

// user related endpoints
server.post("/api/user/register", register);
server.post("/api/user/login", login);
server.get("/api/user/profile",jwtAuthentification, getInfoUsers);
server.post("/api/user/profilepicture",jwtAuthentification, uploadProfilPicture);
server.delete("/api/user/unsubscribe",jwtAuthentification,unsubscribeUser);
server.get("/api/user/logout", jwtAuthentification, logout);
server.get("/api/user/mybuildings/:id", getUserAdminBuildings);

// buildings related endpoints
server.post("/api/addbuilding", jwtAuthentification, addBuilding);
server.get("/api/building", getBuildings);
server.get("/api/building/buildingby", getBuildingby);
server.get("/api/building/:id", getOneBuilding);
server.get("/api/building/admin/:id",jwtAuthentification,  getUserAdminBuildings);
server.delete("/api/building/delete/:id",jwtAuthentification, deleteBuilding);
server.get('/api/building/zipcode/:zipcode', getZipcode)
server.get('/api/building/city/:city', getCity)
// server.get('/api/building/adress/:adress', getAdress)  =>> not usefull for the moment 
server.get('/api/building/type/:type', getType)

// images related endpoints
server.post("/api/building/uploadimage",jwtAuthentification, uploadImage);

// announcement
server.post("/api/annonces/add", jwtAuthentification ,postAnnonces);
server.get("/api/annonces", jwtAuthentification, getAllAnnonces);
server.get("/api/annonces/:id", jwtAuthentification, getOneAnnonce);
server.put("/api/annonces/update", jwtAuthentification ,updateAnnonce);
server.delete("/api/annonces/:id", jwtAuthentification ,deleteAnnonce);

// comments

server.post("/api/building/:id/postcomment",jwtAuthentification, postComment);
server.get("/building/api/building/:id/comments",jwtAuthentification, getComments);

// discussions 

server.post("/api/discussion",jwtAuthentification, createDiscussion)
server.get("/api/discussion", getDiscussion )

server.listen(5500, () => {
  console.log("app is runing");
});
