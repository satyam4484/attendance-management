import './assets/css/fonts.css'
import './assets/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/UI/Header";
import Routing from "./routing/Routing";
import Message from './Components/UI/Message';

const App = () => {

    return (
        <>
            <Header />
            <Message />
            <Routing />
        </>
    );
};

export default App;
