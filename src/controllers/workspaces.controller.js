import Workspace from '../models/workspace.model.js';

// Crear un nuevo espacio de trabajo
export const createWorkspace = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newWorkspace = new Workspace({
            title,
            description,
            date,
            tasks: [] // Inicialmente sin tareas
        });

        const savedWorkspace = await newWorkspace.save();
        res.status(201).json(savedWorkspace);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los espacios de trabajo
export const getWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.find({});
        res.status(200).json(workspaces);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Obtener un espacio de trabajo por ID
export const getWorkspaceById = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id);
        res.status(200).json(workspace);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Actualizar un espacio de trabajo
export const updateWorkspace = async (req, res) => {
    try {
        const updatedWorkspace = await Workspace.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedWorkspace);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un espacio de trabajo
export const deleteWorkspace = async (req, res) => {
    try {
        await Workspace.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Workspace deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



