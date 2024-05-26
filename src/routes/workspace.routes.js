import { Router } from "express";
import { createWorkspace, getWorkspace } from '../controllers/workspace.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()

router.post('/create_workspace', authRequired, createWorkspace);
router.get('/:workspaceId', authRequired, getWorkspace);