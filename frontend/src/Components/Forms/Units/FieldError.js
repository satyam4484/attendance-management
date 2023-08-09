import React from 'react';

const Error = ({ touched, hasError, error, msgType }) => {

    return (
        <>
            {touched && hasError && (
                <p className={`text-${msgType} ps-3 pe-0 pb-0 pt-0 m-0`} style={{fontSize: "12px"}}>
                    {error}
                </p>
            )}
        </>
    );
};

export default Error;
