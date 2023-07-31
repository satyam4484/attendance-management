// import './assets/css/main.css'
import './assets/css/tailwind.css'
import './assets/css/fonts.css'
import { useLocation } from "react-router-dom";
import Navbar from "./Components/UI/Navbar";
import Routing from "./Routing/Routing";
<<<<<<< HEAD
=======
import {email} from "./network/agent";

>>>>>>> f309f99a0877f8fc60e3b4ae04f168c310bfb5f4

const App = () => {
    const location = useLocation();
    console.log("app");
    email().then(response => console.log(response))
    
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
