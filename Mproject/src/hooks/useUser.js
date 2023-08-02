import React from 'react';

const useUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('loginUser'));
    return (currentUser)
};

export default useUser;