import NavBar from "../components/NavBar";
import AuthView from "../components/AuthView/AuthView.jsx";
import { useAuth } from '../context/AuthContext'

const HomePage = () => {

  const { isAuthenticated } = useAuth()

  return (
    <div>
        <NavBar />

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
