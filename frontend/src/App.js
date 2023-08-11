import { useEffect } from 'react';
import './assets/css/fonts.css'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/UI/Header";
import Routing from "./routing/Routing";
import Message from './Components/UI/Message';
import Loading from './Components/UI/Loading';
import { useGlobalContext } from './context/Context';
import OtpForm from './Components/Forms/OtpForm';

const App = () => {
    const { isLoading } = useGlobalContext();

    useEffect(() => {
        // check if token exist in the localstorage if yes then with that login a user and save is data 
        // and change the userlogin to true
        
    },[]);

    return (
        <>
            <Header />
            <Message />
            <OtpForm />
            {isLoading && <Loading />}
            <Routing />
        </>
    );
};

export default App;
