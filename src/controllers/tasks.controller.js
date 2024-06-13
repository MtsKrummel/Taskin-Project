import Task from "../models/task.model.js"
import WorkSpace from '../models/workspace.model.js'

export const getTasks = async (req, res) => {
    const { id } = req.params

    try {
        const workspace = await WorkSpace.findById(id).populate('tasks')

        if(!workspace) return res.status(404).json('Workspace not found')
        
        const tasks = workspace.tasks

        res.status(500).json(tasks)
        
    } catch (error) {
        
    }
}

export const getTask = async (req, res) => {
    const taskFound = await Task.findById(req.params.id).populate('user')
    if(!taskFound) return res.status(404).json({ message: 'Task not found' })
    res.json(taskFound)
}

export const createTask = async (req, res) => {
    const { id } = req.params
    const { title, description, date } = req.body
    
    //Verificar si se paso el parametro
    if(!id) res.json('Error! ID not found')

    console.log(req.user)

    try {
        // //buscar workspace
        const workspaceFound = await WorkSpace.findById(id);

        //Verificar que exista
        if (!workspaceFound) return res.status(404).json('Error! Workspace not found');

        //Crear tarea
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id,
            workspace: id
        })
        //Guardarlo
        const taskSaved = await newTask.save();

        // Agregar la tarea al workspace
        workspaceFound.tasks.push(taskSaved._id);
        await workspaceFound.save()
        
        res.status(201).json({ message: 'Task created!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
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

