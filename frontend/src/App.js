import './assests/css/main.css'
import Signin from './Components/Forms/Signin';
import Signup from './Components/Forms/Signup';
import { Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
        </Routes>
    )
};

export default App; 