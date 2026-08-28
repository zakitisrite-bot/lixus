import React from 'react';

export default function Logo({ className = "h-12 w-auto" }) {
    return (
        <img 
            src="/images/logo-official-clean.png" 
            alt="Logo Centre Culturel Lixus" 
            className={`${className} object-contain rounded-md bg-white shadow-sm`}
            style={{ display: 'inline-block' }}
        />
    );
}
