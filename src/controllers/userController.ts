import { User, Thought } from "../models/index.js";
import { Request, Response } from 'express';


// Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

// Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

//   addUser
  export const addUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
  }

// edit a single user
    export const updateUser = async (req: Request, res: Response) => {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId }, // Find user by ID
            { $set: req.body },         // $set only updates the fields provided in req.body
            { new: true }               // Returns the updated document instead of the original
          ).select('-__v');             // Exclude the version field from response
      
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
          }
      
          return res.json(user);
        } catch (err) {
            res.status(500).json(err);
            return;
        }
      }

// delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId});

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID'})
        }
        
        await Thought.deleteMany({ _id: { $in: user.thoughts }})
        return res.json({ message: 'User and associated thoughts deleted!' })
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
