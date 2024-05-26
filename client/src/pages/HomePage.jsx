import NavBar from "../components/NavBar";
import AuthView from "../components/AuthView";
import { useAuth } from '../context/AuthContext'

const HomePage = () => {

  const { isAuthenticated } = useAuth()

  return (
    <div>
        <NavBar />
        <h1>Esta es la página principal</h1>

        {
          isAuthenticated && (
            <AuthView/>
          )
        }

        {
          !isAuthenticated && (
            <p>Inicia sesión para arrancar</p>
          )
        }

    </div>
  );
};

export default HomePage;
