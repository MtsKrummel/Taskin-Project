import { Router } from "express";
import { createWorkspace, getWorkspace, getWorkspaces } from '../controllers/workspace.controller.js'
import { createTask, getTasks } from '../controllers/tasks.controller.js'

import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from "../middlewares/validatormiddleware.js";

import { createWorkspaceSchema } from "../schemas/workspace.schema.js";
import { createTaskSchema } from "../schemas/task.schema.js"

const router = Router()

router.get('/workspaces', authRequired, getWorkspaces);
router.get('/workspace/:id/tasks', authRequired, getTasks)

router.post('/create_workspace', authRequired, validateSchema(createWorkspaceSchema), createWorkspace);
router.post('/workspace/:id/createTask', authRequired, validateSchema(createTaskSchema), createTask)

export default router