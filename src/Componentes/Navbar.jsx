import React from 'react';

function Navbar({ setVista, vista, monedaSeleccionada, setMonedaSeleccionada }) {
    return (
        <nav className="navbar navbar-dark bg-dark px-4 personalizado-navbar">
            <div className="d-flex align-items-center gap-3">
                <span className="navbar-brand fw-bold m-0" style={{ cursor: 'pointer' }} onClick={() => setVista('inicio')}>
                    SANTA MILA
                </span>

                {/* Selector de divisas*/}
                <div className="d-flex align-items-center bg-secondary bg-opacity-25 p-1 rounded border border-secondary" style={{ fontSize: '0.8rem' }}>
                    <span className="text-white-50 me-2">Ver carta en:</span>
                    <select
                        className="bg-transparent text-danger fw-bold border-0"
                        style={{ outline: 'none', cursor: 'pointer' }}
                        value={monedaSeleccionada}
                        onChange={(e) => setMonedaSeleccionada(e.target.value)}
                    >
                        <option value="CLP" className="text-dark">Pesos ($)</option>
                        <option value="UF" className="text-dark">UF</option>
                        <option value="EURO" className="text-dark">Euro (€)</option>
                        <option value="UTM" className="text-dark">UTM</option>
                    </select>
                </div>
            </div>

            {/* Menu de navegación  */}
            <div className="navbar-nav d-flex flex-row gap-3 ms-auto">
                <button className={`nav-link btn-menu ${vista === 'inicio' ? 'activo' : ''}`} onClick={() => setVista('inicio')}>Inicio</button>
                <button className={`nav-link btn-menu ${vista === 'nosotros' ? 'activo' : ''}`} onClick={() => setVista('nosotros')}>Nosotros</button>
                <button className={`nav-link btn-menu ${vista === 'terminos' ? 'activo' : ''}`} onClick={() => setVista('terminos')}>Términos</button>
                <button className={`nav-link btn-menu ${vista === 'contacto' ? 'activo' : ''}`} onClick={() => setVista('contacto')}>Contacto</button>
                <button className={`nav-link btn-menu ${vista === 'historial' ? 'activo' : ''}`} onClick={() => setVista('historial')}>Registro de pedidos</button>
                <button className={`nav-link btn-menu ${vista === 'proyecto' ? 'activo' : ''}`} onClick={() => setVista('proyecto')}>Proyecto</button>
            </div>
        </nav>
    );
}

export default Navbar;