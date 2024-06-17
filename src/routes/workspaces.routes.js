import express from 'express';

//Controlador de la mesa de trabajo
import {
  createWorkspace,
  getWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace
} from '../controllers/workspaces.controller.js';

//Validación de los esquemas y validación de autenticación
import { validateSchema } from "../middlewares/validatormiddleware.js";
import { authRequired } from '../middlewares/validateToken.js'

//Esquemas para las mesas de trabajo y tareas
import { createWorkspaceSchema } from "../schemas/workspace.schema.js";
import { createTaskSchema } from "../schemas/task.schema.js"

const router = express.Router();

// Rutas para los espacios de trabajo con un path base '/workspace'

// Crear un nuevo espacio de trabajo
router.post('/workspaces', authRequired, validateSchema(createWorkspaceSchema), createWorkspace);

// Obtener todos los espacios de trabajo
router.get('/workspaces', authRequired, getWorkspaces); 

// Obtener un espacio de trabajo por ID
router.get('/workspaces/:id', authRequired, getWorkspaceById);

// Actualizar un espacio de trabajo
router.put('/workspaces/:id', authRequired, updateWorkspace);

// Eliminar un espacio de trabajo
router.delete('/workspaces/:id', authRequired, deleteWorkspace); 

export default router;

