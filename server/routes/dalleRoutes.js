import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

/* Creating a new router object. */
const router = express.Router();

/* Creating a new configuration object. */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

/* Creating a new OpenAIApi object. */
const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('Hello OPENAI');
});

/* This is the code that is making the request to the OpenAI API. */
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    /* This is the code that is making the request to the OpenAI API. */
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    /* Getting the image from the response. */
    const image = aiResponse.data.data[0].b64_json;

    /* Sending the response back to the client. */
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.respnse.data.error.message);
  }
});

export default router;
