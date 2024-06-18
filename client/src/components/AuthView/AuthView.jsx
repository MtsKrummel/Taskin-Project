import React, { useState, useEffect } from 'react';
import ProjectCard from '../Cards/CardProjectComponent.jsx';
import { useForm } from 'react-hook-form';
import { workspaceRequest, getWorkspacesRequest } from '../../API/workspace.js';
import { useAuth } from '../../context/AuthContext.jsx';

function AuthView() {
    const { register, handleSubmit } = useForm();
    const { logout, user, isAuthenticated } = useAuth();

    const [workspaces, setWorkspaces] = useState([]);
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState('proyectos');

    useEffect(() => {
        if (isAuthenticated) {
            getWorkspaces();
        }
    }, [isAuthenticated]);

    const getWorkspaces = async () => {
        try {
            const res = await getWorkspacesRequest();
            setWorkspaces(res.data);
        } catch (error) {
            console.error("API Error:", error);
        }
    };

    const handleCreateClick = () => {
        setCreate(true);
    };

    const handleCloseClick = () => {
        setCreate(false);
    };

    const handleMenuClick = () => {
        setActiveButton('menu');
    };

    const handleProyectosClick = () => {
        setActiveButton('proyectos');
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true);
            const res = await workspaceRequest(data);
            if (!res) {
                console.error('Error al crear mesa de trabajo');
                return;
            }
            setCreate(false);
            setWorkspaces((prevWorkspaces) => [...prevWorkspaces, res.data]); // Agregar el nuevo workspace al estado local
        } catch (error) {
            console.error('Error al crear mesa de trabajo:', error);
        } finally {
            setLoading(false);
        }
    });

    if (!isAuthenticated) {
        return <p>Cargando...</p>; // Puedes redirigir o mostrar un componente de inicio de sesión si no está autenticado
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 p-4">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                    <div className="ml-4">
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li className="mb-2">
                            <button
                                className={`block p-2 rounded ${
                                    activeButton === 'menu' ? 'bg-blue-600' : 'bg-gray-700'
                                }`}
                                onClick={handleMenuClick}
                            >
                                Menu
                            </button>
                        </li>
                        <li>
                            <button
                                className={`block p-2 rounded ${
                                    activeButton === 'proyectos' ? 'bg-blue-600' : 'bg-gray-700'
                                }`}
                                onClick={handleProyectosClick}
                            >
                                Proyectos
                            </button>
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
                            placeholder="Buscar..."
                            className="bg-gray-700 p-2 rounded text-white"
                        />
                    </div>
                    <div>
                        <button className="bg-gray-700 p-2 rounded">
                            <span className="sr-only">Notificaciones</span>
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

                {/* Mesas de trabajo */}
                <button onClick={handleCreateClick} className="flex w-[200px] p-5 rounded bg-blue-600 ">
                    Crear mesa de trabajo
                </button>

                {create && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
                            <form onSubmit={onSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-300">Título</label>
                                    <input
                                        type="text"
                                        placeholder="Título"
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
                                    <button
                                        type="button"
                                        onClick={handleCloseClick}
                                        className="bg-red-600 p-2 rounded mr-2"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={`bg-blue-600 p-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        Crear
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 mt-5">
                    {workspaces.length > 0 ? (
                        workspaces.map((workspace) => (
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
                    {/* Aquí podrías renderizar las tarjetas de tareas si fuera necesario */}
                </div>
            </div>
        </div>
    );
}

export default AuthView;
