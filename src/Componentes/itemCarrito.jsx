import React from 'react';

function ItemCarrito({ item, cambiarCantidad, eliminarProducto }) {
    return (
        <li className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center p-2 mb-1 rounded">

            {/* Texto del Producto y su Precio */}
            <div className="pe-2 flex-grow-1">
                <span className="d-block small fw-bold text-uppercase">{item.producto.nombre}</span>
                <span className="text-danger small fw-bold">
                    ${item.producto.precio * item.cantidad}
                </span>
            </div>

            {/* botones para cambiar las cantidades*/}
            <div className="d-flex align-items-center gap-1 me-2">
                <button
                    type="button"
                    className="btn btn-outline-secondary text-white py-0 px-2"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => cambiarCantidad(item.producto.id, -1)}
                >
                    -
                </button>

                <span className="small fw-bold px-1">
                    {item.cantidad}
                </span>

                <button
                    type="button"
                    className="btn btn-outline-secondary text-white py-0 px-2"
                    style={{ fontSize: '0.75rem' }}
                    onClick={() => cambiarCantidad(item.producto.id, 1)}
                >
                    +
                </button>
            </div>

            {/* boton para borrar el producto del carro */}
            <button
                type="button"
                className="btn btn-sm btn-outline-danger border-0"
                onClick={() => eliminarProducto(item.producto.id)}
            >
                ✕
            </button>

        </li>
    );
}

export default ItemCarrito;