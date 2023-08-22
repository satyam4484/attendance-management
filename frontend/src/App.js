import { useEffect } from 'react';
import './assets/css/fonts.css'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/UI/Header";
import Routing from "./routing/Routing";
import Message from './Components/UI/Message';
import Loading from './Components/UI/Loading';
import { useGlobalContext } from './context/Context';
import { getUser, getAllOrganizations } from "./network/agent";
import { useNavigate } from 'react-router-dom';

const App = () => {

    const { isLoading, toggleSpinner, loginUser, isLoggedIn, userCred, getOrganizationId } = useGlobalContext();

    const navigate = useNavigate();
    useEffect(() => {
        toggleSpinner(true);
        // Check if there's a token in localStorage
        if (localStorage.getItem('token')) {
            // Log in the user with the token
            getUser().then(({ error, data }) => {
                if (!error) {
                    loginUser({ token: localStorage.getItem('token'), userCred: data });
                } else {
                    navigate("/auth/login");
                }
            })
        }
        toggleSpinner(false);
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            if (userCred.userType === 1) {
                getAllOrganizations().then((response) => {
                    if (response.data && response.data.length > 0) {
                        const userOrganization = response.data.find(org => org.user._id === userCred._id);
                        if (userOrganization) {
                            getOrganizationId(userOrganization._id)
                        }
                    }
                });
            }
        }
        // eslint-disable-next-line 
    }, [isLoggedIn]);

    return (
        <>
            <Header />
            <Message />
            {isLoading && <Loading />}
            <Routing isLoggedIn={isLoggedIn} />
        </>
    );
};

export default App;
