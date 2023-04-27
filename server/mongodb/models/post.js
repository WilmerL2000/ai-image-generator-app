import mongoose from 'mongoose';

/* This code is defining a Mongoose schema for a Post object with three properties: name, prompt, and
photo. Each property has a type of string and is required. This schema will be used to create a
model for the Post object. */
const Post = new mongoose.Schema({
  name: { type: 'string', required: true },
  prompt: { type: 'string', required: true },
  photo: { type: 'string', required: true },
});

/* Creating a model called PostSchema that is based on the Post schema. */
const PostSchema = mongoose.model('Post', Post);

export default PostSchema;
