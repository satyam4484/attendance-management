// import './assets/css/main.css'
import './assets/css/tailwind.css'
import './assets/css/fonts.css'
import { useLocation } from "react-router-dom";
import Navbar from "./Components/UI/Navbar";
<<<<<<< HEAD
import Routing from "./routing/Routing";
import Message from './Components/UI/Message';

const App = () => {
    const location = useLocation();

=======
import Routing from "./Routing/Routing";
<<<<<<< HEAD
=======
import {email} from "./network/agent";

>>>>>>> f309f99a0877f8fc60e3b4ae04f168c310bfb5f4

const App = () => {
    const location = useLocation();
    console.log("app");
    email().then(response => console.log(response))
    
>>>>>>> f00f10bdf28e673a7e00dd93dae95c4cfbc75d7c
    const isSignUpOrSignIn = () => {
        return location.pathname.includes("/auth/signup") || location.pathname.includes("/auth/signin");
    };

    return (
        <>
            {!isSignUpOrSignIn() && <Navbar />}
            <Message />
            <Routing />
        </>
    );
};

export default App;
