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
                autoClose={1500}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover={false}
                theme="colored"
                className="mt-5"
            >
                {isError && <div>{message}</div>}
            </ToastContainer>

        </div>
    );
};

export default Message;
