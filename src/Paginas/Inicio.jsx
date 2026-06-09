import React from 'react';
import Banner from '../Componentes/Banner';
import Producto from '../Componentes/Producto';
import Carrito from '../Componentes/Carrito';

function Inicio(props) {
    return (
        <>
            <Banner />

            {/* informacion del local */}
            <section className="container-fluid bg-dark border-bottom border-top border-secondary py-3">
                <div className="row text-center text-uppercase g-3">
                    {/* Despacho */}
                    <div className="col-md-4 border-end border-secondary border-sm-0">
                        <span className="d-block text-white fw-bold small">Envío Rápido</span>
                        <span className="text-danger fw-bold" style={{ fontSize: '0.75rem' }}>Punta Arenas</span>
                    </div>
                    {/* elaboracion */}
                    <div className="col-md-4 border-end border-secondary border-sm-0">
                        <span className="d-block text-white fw-bold small">Calidad</span>
                        <span className="text-danger fw-bold" style={{ fontSize: '0.75rem' }}>100% Artesanal | Productos Frescos</span>
                    </div>
                    {/*atencion al cliente */}
                    <div className="col-md-4">
                        <span className="d-block text-white fw-bold small">Atención Personalizada</span>
                        <span className="text-danger fw-bold" style={{ fontSize: '0.75rem' }}>Vía WhatsApp</span>
                    </div>
                </div>
            </section>

            {/* nuestra carta titulo */}
            <div className="titulo-seccion mt-5 mb-4 text-center">
                <h1 className="display-4 fw-extrabold text-white text-uppercase m-0 position-relative d-inline-block content-shadow">
                    ¡Nuestra Carta!
                    <span className="bg-danger d-block mx-auto mt-2" style={{ width: '120px', height: '5px' }}></span>
                </h1>
            </div>
            {/* Contenedor donde se divide la carta y el carrito*/}
            <main className="container-fluid px-lg-5 mt-4">
                <div className="row">

                    <div className="col-lg-8">
                        <div className="mb-4">
                            {/* Botones para cambiar de categoria de productos */}
                            <button className={`btn ${props.filtroCategoria === 'todo' ? 'btn-danger' : 'btn-outline-light'} mx-1`} onClick={() => props.setFiltroCategoria('todo')}>Todo</button>
                            <button className={`btn ${props.filtroCategoria === 'bebidas' ? 'btn-danger' : 'btn-outline-light'} mx-1`} onClick={() => props.setFiltroCategoria('bebidas')}>Bebidas</button>
                            <button className={`btn ${props.filtroCategoria === 'milanesas' ? 'btn-danger' : 'btn-outline-light'} mx-1`} onClick={() => props.setFiltroCategoria('milanesas')}>Milanesas</button>
                            <button className={`btn ${props.filtroCategoria === 'sandwiches' ? 'btn-danger' : 'btn-outline-light'} mx-1`} onClick={() => props.setFiltroCategoria('sandwiches')}>Sándwiches</button>
                            <button className={`btn ${props.filtroCategoria === 'milapizzas' ? 'btn-danger' : 'btn-outline-light'} mx-1`} onClick={() => props.setFiltroCategoria('milapizzas')}>Milapizzas</button>
                        </div>

                        {/* CATEGORIA DE MILANESAS */}
                        {(props.filtroCategoria === 'todo' || props.filtroCategoria === 'milanesas') && (
                            <div>
                                <h5 className="text-danger mb-3 fw-bold">MILANESAS</h5>
                                <div className="row mb-5">
                                    {props.productosMilanesas.map((prodMila, idx) => (
                                        <Producto key={idx} p={prodMila} onAgregar={props.agregarProducto} formatearPrecio={props.formatearPrecio} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CATEGORIA DE SANDWICHES */}
                        {(props.filtroCategoria === 'todo' || props.filtroCategoria === 'sandwiches') && (
                            <div>
                                <h5 className="text-danger mb-3 fw-bold">SÁNDWICHES</h5>
                                <div className="row mb-5">
                                    {props.productosSandwich.map((prodSand, idx) => (
                                        <Producto key={idx} p={prodSand} onAgregar={props.agregarProducto} formatearPrecio={props.formatearPrecio} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CATEGORIA DE MILAPIZZAS */}
                        {(props.filtroCategoria === 'todo' || props.filtroCategoria === 'milapizzas') && (
                            <div>
                                <h5 className="text-danger mb-3 fw-bold">MILAPIZZAS (para 4 personas)</h5>
                                <div className="row mb-5">
                                    {props.productosMilapizzas.map((prodPiz, idx) => (
                                        <Producto key={idx} p={prodPiz} onAgregar={props.agregarProducto} formatearPrecio={props.formatearPrecio} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CATEGORIA DE BEBIDAS */}
                        {(props.filtroCategoria === 'todo' || props.filtroCategoria === 'bebidas') && (
                            <div>
                                <h5 className="text-danger mb-3 fw-bold">BEBIDAS Y CERVEZAS</h5>
                                <div className="row mb-5">
                                    {props.productosBebidas.map((prodBeb, idx) => (
                                        <Producto key={idx} p={prodBeb} onAgregar={props.agregarProducto} formatearPrecio={props.formatearPrecio} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ZONA DEL CARRITO */}
                    <div className="col-lg-4">
                        <Carrito
                            carrito={props.carrito}
                            total={props.total}
                            cantidadProductos={props.cantidadProductos}
                            eliminarProducto={props.eliminarProducto}
                            cambiarCantidad={props.cambiarCantidad}
                            verFormulario={props.verFormulario}
                            setVerFormulario={props.setVerFormulario}
                            deliveryChecked={props.deliveryChecked}
                            setDeliveryChecked={props.setDeliveryChecked}
                            direccion={props.direccion}
                            setDireccion={props.setDireccion}
                            zona={props.zona}
                            setZona={props.setZona}
                            pago={props.pago}
                            setPago={props.setPago}
                            notas={props.notas}
                            setNotas={props.setNotas}
                            acepta={props.acepta}
                            setAcepta={props.setAcepta}
                            mensajeError={props.mensajeError}
                            onFinalizar={props.grabarPedido}
                            formatearPrecio={props.formatearPrecio}
                        />
                    </div>

                </div>
            </main>
        </>
    );
}

export default Inicio;