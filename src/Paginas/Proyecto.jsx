import React from 'react';

function Proyecto() {
    return (
        <main className="container my-5 text-white">
            {/* DESCRIPCION DE EL PROYECTO */}
            <section className="mb-5">
                <h2 className="text-danger mb-4 text-center text-uppercase fw-bold">Documentación del Proyecto</h2>
                <div className="card p-4 bg-dark text-white border-secondary shadow mb-4">
                    <p className="fs-5 m-0">
                        Este proyecto consiste en una aplicación web desarrollada en React para la gestión de pedidos de un local de comida rápida.
                        Implementa un sistema de compras funcional con persistencia de datos en la memoria local (<strong>LocalStorage</strong>), consumo de indicadores económicos en tiempo real mediante una <strong>API externa</strong> y resguardo de información sensible utilizando criptografía simétrica <strong>AES (Advanced Encryption Standard)</strong>.
                    </p>
                </div>

                {/* EXPLICAICON DEL DISEÑO ACTUAL */}
                <div className="card p-4 bg-dark text-white border-secondary shadow">
                    <h5 className="text-danger text-uppercase fw-bold mb-3" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
                        Nota sobre el alcance y la arquitectura del proyecto
                    </h5>
                    <p className="text-white-50 mb-3">
                        Para esta etapa del desarrollo, estructure la aplicación bajo los siguientes criterios técnicos:
                    </p>
                    <ul className="text-white-50 mb-0" style={{ lineHeight: '1.6' }}>
                        <li className="mb-2">
                            <strong>Flujo de Navegación Directo:</strong> No inclui un módulo de autenticación ni registro de usuarios con el fin de optimizar la experiencia de usuario. Esto permite acceder directamente a la carta, interactuar con el carrito de compras y simular el proceso de adquisición sin restricciones iniciales.
                        </li>
                        <li>
                            <strong>Módulo de Auditoría Visible:</strong> Decidi mantener la pestaña de "Registro de pedidos" accesible desde el menú principal para agilizar la evaluación del proyecto. Asi, es posible realizar un pedido de prueba y verificar inmediatamente el almacenamiento en el dispositivo, así como el correcto funcionamiento del cifrado de datos como el RUT.
                        </li>
                    </ul>
                </div>
            </section>

            <hr className="border-secondary my-5" />

            {/*DIAGRAMA DE CASOS DE USO */}
            <section className="mb-5">
                <h3 className="text-danger mb-4 text-center text-uppercase fw-bold">1. Diagrama de Casos de Uso</h3>
                <div className="row align-items-center bg-dark p-4 rounded border border-secondary shadow">
                    <div className="col-lg-6 order-2 order-lg-1">
                        <p className="fw-bold fs-5 text-danger">Casos de Uso Principales</p>
                        <ul>
                            <li><strong>Ver productos:</strong> Permite visualizar la carta completa filtrando por categorías (Milanesas, Sándwiches, Milapizzas y Bebidas).</li>
                            <li><strong>Agregar / Eliminar del carrito:</strong> Esto permite controlar los productos que el cliente quiere comprar antes de cerrar el pedido.</li>
                            <li><strong>Seleccionar tipo de entrega:</strong> Permite elegir entre Retiro en Local o Delivery.</li>
                            <li><strong>Ingresar datos y Confirmar pedido:</strong> Formulario final donde se registran la información del cliente y se procesa la orden de compra.</li>
                            <li><strong>Enviar WhatsApp:</strong> Opción del cliente para tener una atención más personalizada.</li>
                        </ul>

                        <p className="fw-bold fs-5 text-danger mt-4">Relación de Extensión</p>
                        <p className="mb-2">
                            El caso de uso <strong>ingresar direccion</strong> extiende opcionalmente a la selección del tipo de entrega.
                            Esto significa que escribir la dirección y seleccionar el sector solo se activa obligatoriamente si el cliente escoge la opción de Delivery.
                        </p>

                        <p>
                            Además, el caso de uso <strong>verificar edad</strong> extiende de forma opcional a <strong>Confirmar pedido</strong>.
                            Esta regla de negocio evalúa la fecha de nacimiento ingresada solo si el sistema detecta que el carrito de compras contiene productos con alcohol.
                        </p>

                        <p className="fw-bold fs-5 text-danger mt-4">Relación de Inclusión</p>
                        <p>
                            Para poder <strong>Confirmar el pedido</strong>, el sistema incluye obligatoriamente el paso de <strong>Validar datos</strong>.
                            Esta validación se encarga de revisar el formato del teléfono, el correo y que los campos obligatorios del formulario no estén vacíos antes de guardar.
                        </p>
                    </div>
                    <div className="col-lg-6 text-center order-1 order-lg-2 mb-4 mb-lg-0">
                        <img src="/imagenes/caso de uso.png" className="img-fluid rounded shadow border border-secondary" alt="Diagrama de Casos de Uso" />
                    </div>
                </div>
            </section>

            <hr className="border-secondary my-5" />

            {/*DIAGRAMA DE CLASES */}
            <section className="mb-5">
                <h3 className="text-danger mb-4 text-center text-uppercase fw-bold">2. Diagrama de Clases</h3>
                <div className="row bg-dark p-4 rounded border border-secondary shadow">
                    <div className="col-xl-6 text-center d-flex align-items-center justify-content-center mb-4 col-xl-mb-0">
                        <img
                            src="/imagenes/CLASES.png"
                            className="img-fluid rounded shadow border border-secondary"
                            alt="Diagrama de Clases"
                        />
                    </div>

                    <div className="col-xl-6">

                        <p className="fw-bold fs-5 text-danger border-bottom border-secondary pb-1 mb-3">
                            Estructura del Modelo de Datos
                        </p>

                        <p className="text-light small mb-4">
                            Este diagrama representa la estructura lógica del sistema y las relaciones
                            existentes entre las principales entidades involucradas en el proceso de compra.
                            Cada clase modela una parte específica de la aplicación, incluyendo los productos
                            disponibles, el carrito de compras, los datos del cliente y los pedidos generados.
                            Además, se muestran los atributos, métodos y multiplicidades que permiten comprender
                            cómo fluye la información desde la selección de productos hasta la confirmación y
                            almacenamiento del pedido.
                        </p>

                        <div className="mb-3">
                            <p className="fw-bold m-0 small">
                                Componentes Base
                            </p>

                            <ul className="text-light small ps-3 mt-1">
                                <li className="mb-2">
                                    <strong>PRODUCTO:</strong> Representa los productos disponibles en el menú,
                                    almacenando los datos principales como <code>id</code>,
                                    <code> nombre</code>, <code>precio</code> y
                                    <code> descripcion</code>.
                                </li>

                                <li className="mb-2">
                                    <strong>ItemCarrito:</strong> Funciona como una entidad intermedia que
                                    relaciona un producto con la cantidad solicitada por el cliente,
                                    permitiendo construir el contenido del carrito y posteriormente del pedido.
                                </li>
                            </ul>
                        </div>

                        <div className="mb-3">
                            <p className="fw-bold m-0 small">
                                Gestión de Compra
                            </p>

                            <ul className="text-light small ps-3 mt-1">
                                <li className="mb-2">
                                    <strong>CARRITO:</strong> Administra la compra temporal del usuario.
                                    Mantiene una colección de objetos <code>ItemCarrito</code> y dispone
                                    de métodos para agregar productos, eliminarlos y calcular el monto total
                                    de la compra.
                                </li>

                                <li className="mb-2">
                                    <strong>CLIENTE:</strong> Representa al usuario que realiza la compra.
                                    Almacena los datos ingresados en el formulario y utiliza el método
                                    <code> verificarEdad()</code> para calcular la edad a partir de la fecha
                                    de nacimiento y validar la compra de productos con restricción de edad.
                                </li>

                                <li className="mb-2">
                                    <strong>PEDIDO:</strong> Representa la compra confirmada por el cliente.
                                    Almacena la información final de la transacción, incluyendo los productos
                                    seleccionados, el monto total, los puntos acumulados, el tipo de entrega,
                                    la forma de pago y el estado de la orden. Además, incorpora los métodos
                                    necesarios para calcular puntos, confirmar la compra, cifrar el RUT del
                                    cliente y almacenar el pedido de forma persistente en el navegador.
                                </li>
                            </ul>
                        </div>

                        <div className="mt-4">
                            <p className="fw-bold fs-5 text-danger border-bottom border-secondary pb-1 mb-2">
                                Explicación de Multiplicidad y Flujo
                            </p>

                            <ul
                                className="text-light small ps-3"
                                style={{ fontSize: '0.8rem' }}
                            >
                                <li className="mb-2">
                                    Un <strong>CARRITO</strong> puede contener uno o varios
                                    objetos <code>ItemCarrito</code>, permitiendo almacenar todos los
                                    productos seleccionados durante la compra.
                                </li>

                                <li className="mb-2">
                                    Cada <strong>ItemCarrito</strong> se asocia obligatoriamente a un único
                                    <strong> PRODUCTO</strong>, mientras que un producto puede aparecer en
                                    múltiples elementos de carrito.
                                </li>

                                <li className="mb-2">
                                    Un <strong>PEDIDO</strong> está compuesto por uno o varios
                                    <code> ItemCarrito</code>, los cuales representan los productos
                                    finalmente confirmados por el cliente.
                                </li>

                                <li className="mb-2">
                                    Un <strong>CLIENTE</strong> puede generar uno o más
                                    <strong> PEDIDOS</strong>, quedando asociada cada compra a los datos
                                    ingresados durante el proceso de confirmación.
                                </li>

                                <li>
                                    Esta estructura permite mantener un flujo ordenado desde la selección
                                    de productos hasta el almacenamiento del pedido, facilitando la
                                    persistencia de la información mediante LocalStorage y conservando
                                    el historial de compras dentro de la aplicación.
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Proyecto;