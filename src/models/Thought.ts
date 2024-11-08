import { Schema, model, type Document } from 'mongoose';
import reactionSchema from './Reaction.js';
import type { ReactionDocument } from './Reaction.js';

export interface thoughtDocument extends Document {
    thoughtText: string
    createdAt: Date
    username: string
    reactions: ReactionDocument[]
}

const thoughtSchema = new Schema<thoughtDocument>(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now, 
            // get: (timestamp: Date) => timestamp.toLocaleString() // Getter to format the timestamp
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model<thoughtDocument>('Thought', thoughtSchema);

export default Thought