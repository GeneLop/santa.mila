import React from 'react';

function Terminos() {
    return (
        <div className="container py-5">
            <div className="card p-4 bg-dark text-white border-secondary shadow-sm">
                <h2 className="fw-bold border-bottom pb-2 mb-4 text-uppercase text-light">
                    Términos y Condiciones del Sistema
                </h2>
                <div className="mb-4">
                    <h5 className="text-danger fw-bold text-uppercase">Despacho y Cobertura</h5>

                    <p className="text-light small">
                        El servicio de delivery funciona solamente dentro de la zona urbana de Punta Arenas. Si eliges esta opción, el sistema sumará automáticamente un cargo fijo de $2.500 CLP al total de tu cuenta.
                    </p>
                    <p className="text-light small">
                        También tienes la opción de elegir Retiro en Local. Esta opción no tiene ningún costo de envío y debes venir directamente al negocio a buscar tu pedido.
                    </p>
                </div>

                <div className="mb-4">
                    <h5 className="text-danger fw-bold text-uppercase">Sistema de Puntos y Club Mila</h5>
                    <p className="text-light small">
                        Nuestra página calcula de forma automática el 1% de tu compra para acumular Puntos Mila.
                    </p>
                    <p className="text-light small">
                        Para guardar tus puntos es obligatorio que ingreses tu RUT en el formulario. Por seguridad, el sistema encripta este RUT usando el algoritmo AES antes de registrarlo en el historial de pedidos, evitando guardar el texto original.
                    </p>
                </div>

                <div className="mb-4">
                    <h5 className="text-danger fw-bold text-uppercase">Venta de Alcohol y Control de Edad</h5>
                    <p className="text-light small">
                        Cumpliendo con la Ley Nº 19.925, no vendemos bebidas alcohólicas a menores de 18 años. Si agregas una cerveza al carrito, el sistema abrirá obligatoriamente una casilla para que pongas tu fecha de nacimiento.
                    </p>
                    <p className="text-light small">
                        La aplicación calcula tu edad al instante. Si eres menor de edad, el sistema bloqueará automáticamente el pedido y no te dejará terminar la compra de ninguna forma.
                    </p>
                </div>

                <div className="mb-4">
                    <h5 className="text-danger fw-bold text-uppercase">Métodos de Pago e Historial</h5>
                    <p className="text-light small">
                        Puedes pagar tu pedido usando Efectivo, Transferencia Bancaria o Tarjetas de Débito y Crédito cuando recibas o retires tu comida.
                    </p>
                    <p className="text-light small">
                        Todos los pedidos confirmados se guardan en el LocalStorage de tu navegador. Esto sirve para que puedas revisar tu historial de pedidos cuando quieras, aunque cierres o recargues la página web.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Terminos;