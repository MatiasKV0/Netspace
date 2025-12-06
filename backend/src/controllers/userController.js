import bcrypt from "bcryptjs";
import multer from "multer";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import emailRegistro from "../helpers/emailRegistro.js";

import { client } from "../config/db.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";

const usersCollection = client.db("sample_mflix").collection("users");

const createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generarID();

    const newUser = { name, email, password: hashedPassword, token, createdAt: new Date(), verified: false, list: [] };
    await usersCollection.insertOne(newUser);

    res.status(201).send("User created successfully, please verify your email");

    emailRegistro({ name, email, token});

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const confirmEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const user = await usersCollection.findOne({ token });
    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    await usersCollection.updateOne({ token }, { $unset: { token: "" }, $set: { verified: true } });

    res.json({ msg: "Your email has been confirmed!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({msg:"Server error"});
  }
}

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if(!user.verified){
      return res.status(400).json({ msg: "Please verify your email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { email };
    const token = generarJWT(payload);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getProfile = async (req, res) => {
  const token = req.header("x-auth-token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersCollection.findOne(
      { email: decoded.user.email },
      { projection: { name: 1, email: 1, profilePicture: 1, genres: 1,list: 1 } }
    );

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (user.profilePicture) {
      res.json({
        name: user.name,
        email: user.email,
        genres: user.genres,
        list: user.list,
        profilePicture: `data:image/jpeg;base64,${user.profilePicture}`,
      });
    } else {
      res.json({ name: user.name, email: user.email, profilePicture: null, genres: user.genres, list: user.list });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

const updateProfile = [
  upload.single("profilePicture"),
  async (req, res) => {
    const { name, genres } = req.body;

    if(name && name.trim() === ""){
      return res.status(400).json({ error: "Name is required" });
    }

    const updates = {};

    if (name) updates.name = name;
    if(genres) updates.genres = genres;
    if (req.file) {
      updates.profilePicture = req.file.buffer.toString("base64");
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No se enviaron datos para actualizar" });
    }

    try {
      const token = req.header("x-auth-token");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      await usersCollection.updateOne(
        { email: decoded.user.email },
        { $set: updates }
      );

      res.json({ updates, mensaje: "Datos actualizados con éxito" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al actualizar los datos" });
    }
  },
];

const getList = async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersCollection.findOne(
      { email: decoded.user.email },
      { projection: { list: 1, } }
    );

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    console.log(user.list)

    const collection = client.db("sample_mflix").collection("movies");
    const results = await collection
      .find({ _id: { $in: user.list } })
      .toArray();

    res.json({
      results: results,
      totalPages: Math.ceil(user.list.length / 112) || 1,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const updateFavorite = async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const { id, add } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "Invalid ID format" });
  }
  
  const _id = ObjectId.createFromHexString(id);

  console.log("ID recibido:", _id.toString());

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usersCollection.findOne(
      { email: decoded.user.email },
      { projection: { list: 1 } }
    );

    if (!user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    console.log(user.list);

    if (add) {
      if (user.list.map(obj => obj.toString()).includes(_id.toString())) {
        return res.status(400).json({ msg: "Already in your list" });
      }

      await usersCollection.updateOne(
        { email: decoded.user.email },
        { $push: { list: _id } }
      );

      res.json({ msg: "Added to your list" });
    } else {
      if (!user.list.map(obj => obj.toString()).includes(_id.toString())) {
        return res.status(400).json({ msg: "Item not in your list" });
      }

      await usersCollection.updateOne(
        { email: decoded.user.email },
        { $pull: { list: _id } }
      );

      res.json({ msg: "Removed from your list" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export {
  createUsers,
  confirmEmail,
  signIn,
  getProfile,
  updateProfile,
  getList,
  updateFavorite
};