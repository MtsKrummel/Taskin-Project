//VERSION 1

// import Task from "../models/task.model.js"

// export const getTasks = async (req, res) => {
//     const tasks = await Task.find({
//         user: req.user.id
//     }).populate('user')
//     res.json(tasks)
// }

// export const getTask = async (req, res) => {
//     const taskFound = await Task.findById(req.params.id).populate('user')
//     if(!taskFound) return res.status(404).json({ message: 'Task not found' })
//     res.json(taskFound)
// }

// export const createTask = async (req, res) => {
//     const { title, description, date } = req.body
    
//     console.log(req.user)

//     const newTask = new Task({
//         title,
//         description,
//         date,
//         user: req.user.id
//     })
    
//     return res.json({ message: 'Task created!' })
// }

// export const updateTask = async (req, res) => {
//     const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {
//         new: true
//     })
//     if(!taskUpdated) return res.status(404).json({ message: 'Task not found' })
//     res.json({ message: 'Task updated!' })
// }

// export const deleteTask = async (req, res) => {
//     const taskDeleted = await Task.findByIdAndDelete(req.params.id)
//     if(!taskDeleted) return res.status(404).json({ message: 'Task not found' })
//     res.status(204).json({ message: 'Task deleted!' })
// }

//VERSION 2

// import Task from "../models/task.model.js";

// export const getTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({ user: req.user.id }).populate('user');
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const getTask = async (req, res) => {
//     try {
//         const taskFound = await Task.findById(req.params.id).populate('user');
//         if (!taskFound) return res.status(404).json({ message: 'Task not found' });
//         res.json(taskFound);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const createTask = async (req, res) => {
//     const { title, description, date } = req.body;

//     try {
//         const newTask = new Task({
//             title,
//             description,
//             date,
//             user: req.user.id
//         });

//         await newTask.save();

//         res.status(201).json({ message: 'Task created!', task: newTask });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const updateTask = async (req, res) => {
//     try {
//         const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!taskUpdated) return res.status(404).json({ message: 'Task not found' });
//         res.json({ message: 'Task updated!', task: taskUpdated });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// export const deleteTask = async (req, res) => {
//     try {
//         const taskDeleted = await Task.findByIdAndDelete(req.params.id);
//         if (!taskDeleted) return res.status(404).json({ message: 'Task not found' });
//         res.status(204).json({ message: 'Task deleted!' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

import Task from "../models/task.model.js";
import Workspace from "../models/workspace.model.js";

// Get all tasks, optionally filtered by workspace
export const getTasks = async (req, res) => {
    const { workspaceId } = req.query;

    try {
        const query = { user: req.user.id };
        if (workspaceId) {
            query.workspace = workspaceId;
        }

        const tasks = await Task.find(query).populate('user');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single task by ID
export const getTask = async (req, res) => {
    try {
        const taskFound = await Task.findById(req.params.id).populate('user');
        if (!taskFound) return res.status(404).json({ message: 'Task not found' });
        res.json(taskFound);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new task
export const createTask = async (req, res) => {
    const { title, description, date, workspaceId } = req.body;

    try {
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id,
            workspace: workspaceId || null
        });

        await newTask.save();

        if (workspaceId) {
            const workspace = await Workspace.findById(workspaceId);
            if (workspace) {
                workspace.tasks.push(newTask._id);
                await workspace.save();
            }
        }

        res.status(201).json({ message: 'Task created!', task: newTask });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an existing task
export const updateTask = async (req, res) => {
    try {
        const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!taskUpdated) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task updated!', task: taskUpdated });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const taskDeleted = await Task.findByIdAndDelete(req.params.id);
        if (!taskDeleted) return res.status(404).json({ message: 'Task not found' });
        res.status(204).json({ message: 'Task deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

