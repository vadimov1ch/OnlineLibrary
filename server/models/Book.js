import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    totalReviews: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    coverUrl: String,
    fileUrl: String,
    }, 
    {
        timestamps: true,
    }
);

export default mongoose.model('Book', BookSchema);