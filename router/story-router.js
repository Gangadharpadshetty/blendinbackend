import express from 'express';
import { deleteStory, getStories, addStory } from '../controller/story-controller.js';

const router = express.Router(); // Correctly initialize the router

// Define routes using the `router` instance
router.get('/getstories', getStories);
router.post('/addStory', addStory);
router.delete('/deleteStory/:id', deleteStory); // Use DELETE method and include a parameter for the story ID

export default router;
