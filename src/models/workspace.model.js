import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: [],
    }]
}, {
    timestamps: true,
});

export default mongoose.model('Workspace', workspaceSchema);

