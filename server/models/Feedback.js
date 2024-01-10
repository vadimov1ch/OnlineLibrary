import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    }, 
    {
        timestamps: true,
    });

export default mongoose.model('Feedback', FeedbackSchema);