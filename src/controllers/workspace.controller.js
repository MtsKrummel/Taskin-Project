import Workspace from '../models/workspace.model.js'
// import task from '../models/task.model.js'
// import User from '../models/user.model.js'

export const createWorkspace = async (req, res) => {
    const { title, description, date } = req.body;

    console.log(req.user)

    // Crear un nuevo espacio de trabajo
    const workspace = new Workspace({
        title,
        description,
        tasks: [], // Se crea una lista de tareas vacía
        user: req.user.id,
        date: date,
    });
  
    // Guardar el espacio de trabajo
    await workspace.save();
  
    // Enviar la respuesta
    res.json({message: 'Workspace Created!'});
};
  
export const getWorkspace = async (req, res) => {
    const { workspaceId } = req.params;
  
    // Obtener el espacio de trabajo
    const workspace = await Workspace.findById(workspaceId).populate('tasks').populate('users');
  
    // Enviar la respuesta
    res.status(200).json({
      success: true,
      data: workspace,
    });
};

export const getWorkspaces = async (req, res) => {
  const workspaces = await Workspace.find({
    user: req.user.id
  }).populate('user')

  

  res.json(workspaces)
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