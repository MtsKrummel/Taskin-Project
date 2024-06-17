import { useContext, createContext, useState } from 'react';
import { workspaceRequest, getWorkspacesRequest } from '../API/workspace.js';

export const WorkspaceContext = createContext();

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

export const WorkspaceProvider = ({ children }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [errors, setErrors] = useState(null);

  const createWorkspace = async (workspaceData) => {
    try {
      const res = await workspaceRequest(workspaceData);
      setWorkspaces([...workspaces, res.data]);
    } catch (error) {
      console.error("API Error:", error);
      setErrors(error.response.data);
    }
  };

  const getWorkspaces = async () => {
    try {
      const res = await getWorkspacesRequest();
      setWorkspaces(res.data);
    } catch (error) {
      console.error("API Error:", error);
      setErrors(error.response.data);
    }
  };

  return (
    <WorkspaceContext.Provider value={{ createWorkspace, getWorkspaces, workspaces, errors }}>
      {children}
    </WorkspaceContext.Provider>
  );
};