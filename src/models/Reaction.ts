import { Schema,Types, type Document } from 'mongoose';

export interface ReactionDocument extends Document {
    reactionId: Schema.Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

const reactionSchema = new Schema<ReactionDocument>({
    reactionId: {
        type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Schema.Types.Date,
            default: () => Date.now()
    }
},
{
    toJSON: {
      getters: true, // Enables getter methods in JSON output
    },
}
)

export default reactionSchema