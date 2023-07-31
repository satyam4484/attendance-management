import React from 'react';

const Error = ({ touched, hasError, error }) => {
    return (
        <>
            {touched && hasError && (
                <p className="absolute bottom-[-20px] left-0 text-xs text-red-500 ml-5 mb-1">
                    {error}
                </p>
            )}
        </>
    );
};

export default Error;
