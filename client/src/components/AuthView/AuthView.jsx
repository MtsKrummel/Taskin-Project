
import React from 'react';
import ProjectCard from '../Cards/CardProjectComponent.jsx'
import TaskCard from '../Cards/CardTaskComponent.jsx'

import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useWorkspace } from '../../context/WorkSpace.jsx';

import { workspaceRequest, getWorkspacesRequest } from '../../API/workspace.js';

function AuthView() {

  const [create, setCreate] = useState(false)
  const [workspaces, setWorkspaces] = useState([])
  const [errors, setErrors] = useState(null)
  const { register, handleSubmit } = useForm()

  const handleCreateClick = () => {
    setCreate(true);
  };

  const handleCloseClick = () => {
    setCreate(false);
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
  getWorkspaces()

  const onSubmit = handleSubmit(async(data) => {
    const res = await workspaceRequest(data)
    if(!res) return res.status(401).json({ message: 'Error al crear mesa de trabajo' })
    setCreate(false)
    console.log(res.data)
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gray-600"></div>
          <div className="ml-4">
            <p className="font-semibold">NameAccount</p>
            <p className="text-gray-400">name@gmail.com</p>
          </div>
        </div>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded bg-blue-600">Home</a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded bg-gray-700">Proyectos</a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        <div className="flex justify-between mb-8">
          <div>
            <select className="bg-gray-700 p-2 rounded text-white">
              <option>Todos</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 p-2 rounded text-white"
            />
          </div>
          <div>
            <button className="bg-gray-700 p-2 rounded">
              <span className="sr-only">Notifications</span>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 7 8.388 7 11v3.159c0 .538-.214 1.055-.595 1.436L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Workspaces */}
        <button onClick={handleCreateClick} className="flex w-[200px] p-2 rounded bg-blue-600">Crear mesa de trabajo</button>

        {create && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Crear nueva mesa de trabajo</h2>
              <form onSubmit={onSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300">Titulo</label>
                  <input
                    type="text"
                    placeholder="Titulo"
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white"
                    {...register('title')}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300">Descripción</label>
                  <textarea
                    placeholder="Descripción"
                    {...register('description')}
                    className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded py-2 px-3 text-white"
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={handleCloseClick} className="bg-red-600 p-2 rounded mr-2">Cancelar</button>
                  <button type="submit" className="bg-blue-600 p-2 rounded">Crear</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {workspaces.length > 0 ? (
            workspaces.map(workspace => (
              <ProjectCard 
                key={workspace._id} 
                title={workspace.title} 
                description={workspace.description}
                />
            ))
          ) : (
            <p className="text-center col-span-3">No hay mesas de trabajo</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TaskCard />
        </div>
      </div>
    </div>
  );
}

export default AuthView