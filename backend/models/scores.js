import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerScoreSchema = new Schema({
    player: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const PlayerScore = mongoose.model('PlayerScore', playerScoreSchema);
export default PlayerScore;