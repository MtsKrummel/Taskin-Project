import { useAuth } from '../context/AuthContext'
import UnauthenticatedView from './UnauthenticatedView/UnauthenticatedView'

function NavBar(){

    const { isAuthenticated } = useAuth()

    return(
        <nav className="flex justify-between items-center bg-gray-800 p-4">
            <h1 className="text-white text-xl font-bold">Taskin Project</h1>
            {/* LA VISTA SI NO ESTA AUTENTICADO */}
            {
                !isAuthenticated && (
                    <UnauthenticatedView/>
                )
            }

        </nav>
    )
}
export default NavBar