import axios from './axios.js'

export const workspaceRequest = (workspace) => axios.post(`workspaces`, workspace)

export const getWorkspacesRequest = () => axios.get('workspaces')