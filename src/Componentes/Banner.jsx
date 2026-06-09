import React from 'react';

function Banner() {
    return (
        <div className="container-fluid p-0">
            <div
                className="w-100"
                style={{
                    backgroundImage: "url('/imagenes/banner.png')",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: '350px'
                }}
            >
            </div>
        </div>
    );
}

export default Banner;