import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Each user can have only one set of favorites
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
},
{
  timestamps: true,
});

export default mongoose.model('Favorite', FavoriteSchema);