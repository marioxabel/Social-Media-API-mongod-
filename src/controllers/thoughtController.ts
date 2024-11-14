import { User, Thought } from "../models/index.js";
import { Request, Response } from 'express';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

// Get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v');

    if (!thought) {
    return res.status(404).json({ message: 'No thought with that ID' });
    }

    res.json(thought);
    return;
} catch (err) {
    res.status(500).json(err);
    return;
}
}

//   addThought
// Add a thought and associate it with a user
export const addThought = async (req: Request, res: Response) => {
    try {
        const { thoughtText, username, userId } = req.body;

        // Create the thought
        const thought = await Thought.create({ thoughtText, username });

        // Associate the thought with the user
        const user = await User.findByIdAndUpdate(
            userId, // The user ID provided in the request body
            { $push: { thoughts: thought._id } }, // Push the thought's ID to the user's thoughts array
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        return res.json({ message: 'Thought created and associated with user!', thought, user });
    } catch (err) {
        return res.status(500).json(err);
    }
};

// edit a single thougth
export const updateThougth = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, // Find user by ID
        { $set: req.body },         // $set only updates the fields provided in req.body
        { new: true }               // Returns the updated document instead of the original
      ).select('-__v');             // Exclude the version field from response
  
      if (!thought) {
        return res.status(404).json({ message: 'No thougth with that ID' });
      }
  
      return res.json(thought);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
  }


// delete a thougth
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.thoughtId});

        if (!thought) {
            return res.status(404).json({ message: 'No thougth with that ID'})
        }
        
        return res.json({ message: 'Thougth deleted!' })
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}


export const addReaction = async (req: Request, res: Response) => {
    try {
        // Validate request body
        if (!req.body.reactionBody || !req.body.username) {
            return res.status(400).json({ message: 'ReactionBody and username are required' });
        }

        // Find and update thought
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId, // Ensure correct parameter name
            { $addToSet: { reactions: req.body } }, // Add reaction to the reactions array
            { new: true } // Return the updated document
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        return res.json(thought);
    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json(err);
    }
};


// delete a reaction 
export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId, // The thought ID from the URL parameter
      { $pull: { reactions: { _id: req.body.reactionId } } }, // Use $pull to remove a reaction by its _id
      { new: true } // Return the updated thought document
    );

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};
