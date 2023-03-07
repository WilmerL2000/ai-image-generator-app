import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

/**
 * If the random prompt is the same as the current prompt, call the function again.
 * @param prompt - The prompt that the user is currently on.
 * @returns A random prompt from the surpriseMePrompts array.
 */
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

/**
 * The function takes in the _id and photo of a user, and then saves the photo to the user's computer.
 * @param _id - The id of the photo.
 * @param photo - The image that you want to download.
 */
export function downloadImage(_id, photo) {
  /* Saving the image to the user's computer. */
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
