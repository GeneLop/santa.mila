import React, { useState } from 'react';

function Contacto() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const validarContacto = (e) => {
        e.preventDefault();
        if (!nombre.trim()) { setError("Ingresa tu nombre"); return; }
        if (!correo.trim()) { setError("Agrega un correo"); return; }
        if (!correo.includes("@")) { setError("Correo inválido"); return; }
        if (!mensaje.trim()) { setError("Escribe un mensaje"); return; }

        setError('');
        alert("Mensaje enviado correctamente");
        setNombre(''); setCorreo(''); setMensaje('');
    };

    return (
        <div className="container my-5 text-dark">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card p-4 bg-danger text-white shadow-sm h-100">
                        <h4>Ubícanos</h4>
                        <p><strong>Dirección:</strong> Almirante Manuel Señoret 894</p>
                        <p><strong>Teléfono:</strong> +56 9 65195325</p>
                        <p><strong>Horario:</strong> 11:00 - 01:00</p>
                        <iframe title="mapa" className="w-100 mt-3 rounded" height="200" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2011.7380389238292!2d-70.91395344194737!3d-53.157343004192974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb2637da81325ed%3A0x85d86dfedea31e9a!2sAlmte.%20Manuel%20Se%C3%B1oret%20894%2C%206200436%20Punta%20Arenas%2C%20Magallanes%20y%20la%20Ant%C3%A1rtica%20Chilena!5e0!3m2!1ses-419!2scl!4v1777949177188!5m2!1ses-419!2scl" style={{ border: 0 }}></iframe>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-4 bg-white rounded shadow-sm border h-100">
                        <h4>Envíanos un mensaje</h4>
                        <form onSubmit={validarContacto}>
                            <input
                                className="w-100 p-2 mb-2 border rounded bg-light text-dark fs-6"
                                placeholder="Nombre completo"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                            />

                            <input
                                className="w-100 p-2 mb-2 border rounded bg-light text-dark fs-6"
                                placeholder="Correo electrónico"
                                value={correo}
                                onChange={e => setCorreo(e.target.value)}
                            />

                            <textarea
                                className="w-100 p-2 mb-2 border rounded bg-light text-dark fs-6"
                                rows="4"
                                placeholder="Mensaje"
                                value={mensaje}
                                onChange={e => setMensaje(e.target.value)}
                            ></textarea>

                            {error && <p className="text-danger small fw-bold">{error}</p>}
                            <button type="submit" className="btn btn-dark">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;