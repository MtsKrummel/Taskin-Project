import Workspace from '../models/workspace.model.js'
import task from '../models/task.model.js'
import User from '../models/user.model.js'

export const createWorkspace = async (req, res) => {
    const { title } = req.body;
    const userId = req.userId;
  
    // Crear un nuevo espacio de trabajo
    const workspace = new Workspace({
        title,
        users: [userId],
        tasks: [], // Se crea una lista de tareas vacía
    });
  
    // Guardar el espacio de trabajo
    await workspace.save();
  
    // Generar el enlace del espacio de trabajo
    const workspaceLink = `http://localhost:4000/api/workspace/${workspace._id}`;
  
    // Enviar la respuesta
    res.status(201).json({
      success: true,
      data: {
        workspace,
        workspaceLink,
      },
    });
};
  
const getWorkspace = async (req, res) => {
    const { workspaceId } = req.params;
  
    // Obtener el espacio de trabajo
    const workspace = await Workspace.findById(workspaceId).populate('tasks').populate('users');
  
    // Enviar la respuesta
    res.status(200).json({
      success: true,
      data: workspace,
    });
};
  
  
//   const addTask = async (req, res) => {
//     const { workspaceId, title } = req.body;
  
//     // Obtener el espacio de trabajo
//     const workspace = await Workspace.findById(workspaceId);
  
//     // Verificar si el usuario tiene acceso al espacio de trabajo
//     if (!workspace.users.includes(req.userId)) {
//       return res.status(403).json({
//         success: false,
//         message: 'No tienes acceso a este espacio de trabajo.',
//       });
//     }
  
//     // Crear una nueva tarea
//     const task = new Task({
//       title,
//     });
  
//     // Añadir la tarea al espacio de trabajo
//     workspace.tasks.push(task._id);
  
//     // Guardar la tarea y el espacio de trabajo
//     await task.save();
//     await workspace.save();
  
//     // Enviar la respuesta
//     res.status(201).json({
//       success: true,
//       data: task,
//     });
//   };