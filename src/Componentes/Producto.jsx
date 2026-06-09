import React from 'react';

function Producto({ p, onAgregar, formatearPrecio }) {
    return (
        <div className="col-6 col-md-3 col-lg-3 mb-4">
            <div className="card card-producto text-center h-100">

                <img
                    src={"/imagenes/" + p.imagen}
                    className="imagen_producto"
                    alt={p.nombre}
                />

                <div className="p-2 d-flex flex-column h-100 text-white">

                    <h6 className="small fw-bold text-white mb-1 text-uppercase" style={{ fontSize: '0.78rem' }}>
                        {p.nombre}
                    </h6>

                    <p className="descripcion-producto text-white-50">
                        {p.descripcion}
                    </p>

                    {/* CORREGIDO: Ahora usa formatearPrecio para que cambie a UF o Euros en vivo */}
                    <p className="fw-bold mb-2 mt-auto text-danger" style={{ fontSize: '0.9rem' }}>
                        {formatearPrecio(p.precio)}
                    </p>

                    <button
                        className="btn btn-danger btn-sm w-100 fw-bold"
                        style={{ fontSize: '0.75rem' }}
                        onClick={() => onAgregar(p)}
                    >
                        Agregar
                    </button>

                </div>
            </div>
        </div>
    );
}

export default Producto;