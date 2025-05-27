import React from 'react';

export const Footer = () => {
    return (
        <footer className='bg-red-600 px-4 py-4 text-center text-white'>
            <p className='font-bold'>&copy; {new Date().getFullYear()} TODOALROJO. Todos los derechos reservados.</p>
        </footer>
    );
};
