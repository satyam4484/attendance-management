import './assets/css/main.css'
import './assets/css/fonts.css'
import { useLocation } from "react-router-dom";
import Navbar from "./Components/UI/Navbar";
import Routing from "./routing/Routing";

const App = () => {
    const location = useLocation();
    
    const isSignUpOrSignIn = () => {
        return location.pathname.includes("/auth/signup") || location.pathname.includes("/auth/signin");
    };

    return (
        <>
            {!isSignUpOrSignIn() && <Navbar />}
            <Routing />
        </>
    );
};

export default App;
