import Task from "../models/task.model.js"

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks)
}

export const getTask = async (req, res) => {
    const taskFound = await Task.findById(req.params.id).populate('user')
    if(!taskFound) return res.status(404).json({ message: 'Task not found' })
    res.json(taskFound)
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body
    
    console.log(req.user)

    const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
    })
    
    return res.json({ message: 'Task created!' })
}

export const updateTask = async (req, res) => {
    const taskUpdated = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if(!taskUpdated) return res.status(404).json({ message: 'Task not found' })
    res.json({ message: 'Task updated!' })
}

export const deleteTask = async (req, res) => {
    const taskDeleted = await Task.findByIdAndDelete(req.params.id)
    if(!taskDeleted) return res.status(404).json({ message: 'Task not found' })
    res.status(204).json({ message: 'Task deleted!' })
}

