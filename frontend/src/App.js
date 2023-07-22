// import './assets/css/main.css'
import './assets/css/tailwind.css'
import Signin from './Components/Forms/Signin';
import Signup from './Components/Forms/Signup';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./Components/UI/Navbar";
import Routing from "./Routing/Routing";
 


const App = () => {
    return (
       <>
        <Navbar/>
        
        <Routing/>
       </>
    )
};

export default App; 