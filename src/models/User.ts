import { Schema, model, Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
    _id: ObjectId;
  username: string;
  email: string;
  thoughts: ObjectId[];  // Array of Thought ObjectIds
  friends: ObjectId[];   // Array of User ObjectIds (self-referencing)
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'  // Self-referencing to User model
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false
});

const User = model<IUser>('User', userSchema);
export default User;
