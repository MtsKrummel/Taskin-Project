import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    //this field was added to be able to link the tasks with a workspace
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        default:null,
    }
}, {
    timestamps: true,
});

export default mongoose.model('Task', taskSchema);