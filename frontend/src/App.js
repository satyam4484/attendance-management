// import './assets/css/main.css'
import './assets/css/tailwind.css'
import './assets/css/fonts.css'
import { useLocation } from "react-router-dom";
import Navbar from "./Components/UI/Navbar";
import Routing from "./Routing/Routing";
import {email} from "./network/agent";


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
