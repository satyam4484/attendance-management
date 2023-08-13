import { useEffect } from 'react';
import './assets/css/fonts.css'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/UI/Header";
import Routing from "./routing/Routing";
import Message from './Components/UI/Message';
import Loading from './Components/UI/Loading';
import { useGlobalContext } from './context/Context';

const App = () => {

    const { isLoading, toggleSpinner, loginUser } = useGlobalContext();

    useEffect(() => {
        toggleSpinner(true);

        // Check if there's a token in localStorage
        if (localStorage.getItem('token')) {
            // Log in the user with the token
            loginUser(localStorage.getItem('token'));
        }

        toggleSpinner(false);
        // eslint-disable-next-line 
    }, []);
    return (
        <>
            <Header />
            <Message />
            {isLoading && <Loading />}
            <Routing />
        </>
    );
};

export default App;
