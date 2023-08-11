import React from 'react';
import { useGlobalContext } from '../../context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
    const { error } = useGlobalContext();
    const { isError, message } = error;

    return (
        <div>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            >
                {isError && <div>{message}</div>}
            </ToastContainer>

        </div>
    );
};

export default Message;
