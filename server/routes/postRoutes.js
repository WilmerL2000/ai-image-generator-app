import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js';

dotenv.config();

/* Creating a new router object. */
const router = express.Router();

/* Configuring the cloudinary API. */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//CREATE A POST
/* This is a route handler for the POST method. It is used to create a new post. */
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    /* Uploading the photo to cloudinary. */
    const photoUrl = await cloudinary.uploader.upload(photo);

    /* Creating a new post. */
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    /* Sending a response to the client. */
    res.status(201).send({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//GET ALL POSTS
/* This is a route handler for the GET method. It is used to get all the posts from the database. */
router.route('/').get(async (req, res) => {
  try {
    /* Finding all the posts in the database. */
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
