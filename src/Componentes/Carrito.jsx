import React, { useState } from 'react';

// Traemos las funciones necesarias desde funciones.js
import { validarRutChileno, verificarEdad } from '../funciones';

function Carrito({
    carrito, total, eliminarProducto, cambiarCantidad,
    verFormulario, setVerFormulario, deliveryChecked, setDeliveryChecked,
    direccion, setDireccion, zona, setZona, pago, setPago,
    acepta, setAcepta, notes, setNotas, formatearPrecio, mensajeError,
    onFinalizar
}) {
    // Variables de estado para guardar lo que el usuario escribe en las cajas de texto
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [errorFormulario, setErrorFormulario] = useState('');

    // Función interna para formatear el RUT automáticamente con puntos y guión
    const formatearRut = (valor) => {
        let limpio = valor.replace(/[^0-9kK]/g, '').toUpperCase();
        if (!limpio) return '';
        let cuerpo = limpio.slice(0, -1);
        let dv = limpio.slice(-1);
        if (limpio.length === 1) return limpio;
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return cuerpo + '-' + dv;
    };

    const handleRutChange = (e) => {
        const valorFormateado = formatearRut(e.target.value);
        setRut(valorFormateado);
    };

    // For para recorrer el carrito y ver si lleva alcohol, así  se puede pedir la edad después
    let llevaCerveza = false;
    for (let i = 0; i < carrito.length; i++) {
        let nombreMinuscula = carrito[i].producto.nombre.toLowerCase();
        if (nombreMinuscula.indexOf("cerveza") !== -1) {
            llevaCerveza = true;
            break;
        }
    }

    // LIMITES DE EDAD
    const hoy = new Date();
    
    const maxAnio = hoy.getFullYear() - 18;
    const fechaMax = `${maxAnio}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

    const minAnio = hoy.getFullYear() - 120;
    const fechaMin = `${minAnio}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

    // Suma 2500 pesos si marcaron la opción de delivery
    const costoDelivery = deliveryChecked ? 2500 : 0;
    const totalFinal = total + costoDelivery;

    const enviarForm = (e) => {
        e.preventDefault();
        setErrorFormulario('');

        // Revisa que la caja del RUT no esté vacia
        if (rut.trim() === "") { setErrorFormulario("Tienes que ingresar un RUT."); return; }

        // Valida el RUT llamando a la función que dejamos en funciones.js
        if (validarRutChileno(rut) === false) { setErrorFormulario("El RUT no es correcto, revisa bien el guión o el número."); return; }

        // Revisa que la caja del nombre no esté vacía
        if (nombre.trim() === "") { setErrorFormulario("Falta que ingreses tu nombre."); return; }

        // For para revisar que el nombre no tenga números ni símbolos raros
        let malos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "$", "#", "!", "@", "%", "*", "(", ")", "=", "+"];
        for (let i = 0; i < nombre.length; i++) {
            if (malos.includes(nombre[i])) { setErrorFormulario("Tu nombre no puede llevar números ni símbolos."); return; }
        }

        // Valida que el teléfono tenga datos, que sean 8 dígitos y que sea un número
        if (telefono.trim() === "") { setErrorFormulario("Escribe tu número de celular."); return; }
        if (telefono.length !== 8 || isNaN(telefono)) { setErrorFormulario("El celular debe tener 8 números."); return; }

        // Valida el correo revisando que tenga un arroba y un punto obligatorios
        if (correo.trim() === "") {
            setErrorFormulario("Falta poner tu correo electrónico.");
            return;
        }

        const regexCorreo = /^[a-zA-Z0-0._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regexCorreo.test(correo.trim())) {
            setErrorFormulario("El formato del correo no es correcto.");
            return;
        }

        // Bloquea la compra si lleva cerveza 
        if (llevaCerveza) {
            if (fechaNacimiento === "") {
                setErrorFormulario("Debes ingresar tu fecha de nacimiento para verificar tu edad.");
                return;
            }
            if (fechaNacimiento > fechaMax || fechaNacimiento < fechaMin) {
                setErrorFormulario("Por favor, selecciona una fecha de nacimiento válida.");
                return;
            }
        }

        // Si marcaron delivery
        if (deliveryChecked && (direccion.trim() === "" || zona === "")) {
            setErrorFormulario("Si pides delivery, debes poner tu dirección y sector.");
            return;
        }

        // Valida selectores y checkbox 
        if (pago === "") { setErrorFormulario("Elige cómo vas a pagar."); return; }
        if (acepta === false) { setErrorFormulario("Debes aceptar los términos y condiciones."); return; }

        const puntosCalculados = Math.round(total * 0.01);
        const tipoEntrega = deliveryChecked ? "Delivery" : "Retiro";
        const direccionCompleta = deliveryChecked ? `${direccion}, Sector ${zona}` : "Retiro en Local";

        onFinalizar(rut, nombre, puntosCalculados, tipoEntrega, direccionCompleta, pago);
    };

    return (
        <div className="card p-4 carrito sticky-top">
            {!verFormulario ? (
                /* LISTA DE PRODUCTOS QUE VAN EN EL CARRO */
                <div>
                    <h5 className="fw-bold mb-3 border-bottom border-secondary pb-2">Tu Carrito</h5>
                    {carrito.length === 0 ? (
                        <div>
                            <p className="text-light text-center py-3 m-0 small text-white-50">Carrito vacío</p>
                            <p className="text-center m-0 text-warning fw-bold px-2" style={{ fontSize: '0.75rem' }}>
                                Recuerda que para comprar alcohol debes ser mayor de edad.
                            </p>
                        </div>
                    ) : (
                        <ul className="list-group list-group-flush mb-3 bg-dark" style={{ listStyle: 'none', padding: 0 }}>
                            {carrito.map((item) => (
                                <li key={item.producto.id} className="list-group-item bg-dark text-white border-secondary d-flex justify-content-between align-items-center p-2 mb-1 rounded">
                                    <div className="pe-2 flex-grow-1">
                                        <span className="d-block small fw-bold text-uppercase">{item.producto.nombre}</span>
                                        <span className="text-danger small fw-bold">{formatearPrecio(item.producto.precio * item.cantidad)}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-1 me-2">
                                        <button type="button" className="btn btn-outline-secondary text-white py-0 px-2" style={{ fontSize: '0.75rem' }} onClick={() => cambiarCantidad(item.producto.id, -1)}>-</button>
                                        <span className="small fw-bold px-1">{item.cantidad}</span>
                                        <button type="button" className="btn btn-outline-secondary text-white py-0 px-2" style={{ fontSize: '0.75rem' }} onClick={() => cambiarCantidad(item.producto.id, 1)}>+</button>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-outline-danger border-0" onClick={() => eliminarProducto(item.producto.id)}>✕</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mb-2">
                        <span className="small fw-bold">TOTAL:</span>
                        <span className="h5 fw-bold text-danger m-0">{formatearPrecio(total)}</span>
                    </div>
                    <button type="button" className="btn btn-danger w-100 btn-sm fw-bold py-2 mt-2" onClick={() => { if (carrito.length === 0) { alert("Agrega productos primero."); return; } setVerFormulario(true); }}>CONTINUAR CON EL PEDIDO</button>
                </div>
            ) : (
                /* FORMULARIO PARA COMPLETAR LA INFORMACION */
                <form onSubmit={enviarForm}>
                    <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
                        <h5 className="fw-bold text-danger m-0">Datos de Entrega</h5>
                        <button type="button" className="btn btn-outline-light btn-xs py-0 px-2 fw-bold" style={{ fontSize: '0.75rem' }} onClick={() => { setVerFormulario(false); setErrorFormulario(''); }}>← Volver</button>
                    </div>

                    <div className="mb-2 p-2 bg-secondary bg-opacity-25 rounded border border-secondary text-center">
                        <span className="small text-white-50 d-block" style={{ fontSize: '0.7rem' }}>CON ESTA COMPRA JUNTAS:</span>
                        <span className="fw-bold text-warning" style={{ fontSize: '0.9rem' }}>
                            +{Math.round(total * 0.01)} Puntos Mila
                        </span>
                    </div>

                    <div className="mb-2">
                        <label className="form-label fw-bold m-0 ps-1" style={{ fontSize: '0.7rem' }}>Ingresa tu RUT para acumular los puntos:</label>
                        <input type="text" className="form-control form-control-sm text-white bg-dark border-secondary font-monospace" placeholder="RUT (Ej: 12.345.678-K)" value={rut} onChange={handleRutChange} maxLength="12" />
                    </div>

                    <div className="row g-1 mb-2">
                        <div className="col-7"><input type="text" className="form-control form-control-sm text-white bg-dark border-secondary" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} /></div>
                        <div className="col-5">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text bg-secondary text-white border-secondary">+569</span>
                                <input type="text" className="form-control text-white bg-dark border-secondary" placeholder="Celular" maxLength="8" value={telefono} onChange={e => setTelefono(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <input type="text" className="form-control form-control-sm mb-2 text-white bg-dark border-secondary" placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)} />

                    {/* si lleva alcohol*/}
                    {llevaCerveza && (
                        <div className="p-2 border border-secondary rounded mb-2 bg-dark">
                            <label className="text-warning fw-bold d-block mb-1" style={{ fontSize: '0.75rem' }}>Ingresa tu fecha de nacimiento:</label>
                            <input 
                                type="date" 
                                className="form-control form-control-sm bg-dark text-white border-secondary" 
                                value={fechaNacimiento} 
                                onChange={e => setFechaNacimiento(e.target.value)} 
                                min={fechaMin} 
                                max={fechaMax}
                                onClick={(e) => e.target.showPicker?.()}
                            />
                           
                            {fechaNacimiento && verificarEdad(fechaNacimiento) > 0 && (
                                <span className="text-white-50 d-block mt-1 ps-1" style={{ fontSize: '0.7rem' }}>
                                    Edad: {verificarEdad(fechaNacimiento)} años.
                                </span>
                            )}
                        </div>
                    )}

                    <div className="p-1 border border-secondary rounded mb-2 bg-dark d-flex justify-content-around align-items-center small text-white">
                        <div><input type="radio" name="entrega" checked={!deliveryChecked} onChange={() => setDeliveryChecked(false)} /> Retiro</div>
                        <div><input type="radio" name="entrega" checked={deliveryChecked} onChange={() => setDeliveryChecked(true)} /> Delivery {deliveryChecked && <span className="text-danger fw-bold">({formatearPrecio(2500)})</span>}</div>
                    </div>

                    {/* Aparecen si se marca la opcion de delivery */}
                    {deliveryChecked && (
                        <>
                            <div className="mb-2"><input type="text" className="form-control form-control-sm mb-1 text-white bg-dark border-secondary" placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} /></div>
                            <div className="mb-2">
                                <select className="form-select form-select-sm bg-dark text-white border-secondary" value={zona} onChange={e => setZona(e.target.value)}>
                                    <option value="">Sector...</option><option>Centro</option><option>Norte</option><option>Sur</option>
                                </select>
                            </div>
                        </>
                    )}

                    <select className="form-select form-select-sm mb-2 bg-dark text-white border-secondary" value={pago} onChange={e => setPago(e.target.value)}>
                        <option value="">Método de pago...</option><option>Efectivo</option><option>Transferencia</option><option>Débito/Crédito</option>
                    </select>

                    <textarea className="form-control form-control-sm mb-2 text-white bg-dark border-secondary" rows="1" placeholder="Indicaciones" value={notes} onChange={e => setNotas(e.target.value)}></textarea>

                    <div className="form-check mb-2">
                        <input type="checkbox" className="form-check-input" checked={acepta} onChange={e => setAcepta(e.target.checked)} />
                        <label className="form-check-label" style={{ fontSize: '0.75rem' }}>Acepto términos y condiciones</label>
                    </div>

                    <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2 mb-3">
                        <span className="small fw-bold">TOTAL PEDIDO:</span>
                        <span className="h5 fw-bold text-danger m-0">{formatearPrecio(totalFinal)}</span>
                    </div>

                    {(errorFormulario || mensajeError) && (
                        <div className="alert alert-danger bg-danger text-white text-center fw-bold border-0 py-1 my-2 rounded shadow-sm d-flex align-items-center justify-content-center" style={{ fontSize: '0.75rem', height: '31px', lineHeight: '1.2' }}>
                            {errorFormulario || mensajeError}
                        </div>
                    )}
                    <button type="submit" className="btn btn-success btn-sm w-100 fw-bold py-2">CONFIRMAR PEDIDO</button>
                </form>
            )}
            <a href="https://api.whatsapp.com/send?phone=56982556888" target="_blank" rel="noreferrer" className="btn btn-outline-light w-100 btn-sm mt-2">PEDIR POR WHATSAPP</a>
        </div>
    );
}

export default Carrito;