import { Link } from "react-router-dom"

export default function UnauthenticatedView() {
  return (
    <div className="flex space-x-4">
    <Link to="http://localhost:5173/register">
        <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md">
            Registrarse
        </button>
    </Link>
    
    <Link to="http://localhost:5173/login">
        <button className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">
        Iniciar sesión
        </button>
    </Link>
    </div>
  )
}
