import React from 'react';

function Nosotros() {
    return (
        <main className="container my-5 text-dark bg-light p-4 rounded shadow-sm">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h2 className="fw-bold text-danger mb-4">Cómo partió todo</h2>
                    <p><strong>Santa Mila</strong> no nació de un gran plan, sino de una idea improvisada. Somos una pareja, una chilena y un argentino, que por vueltas de la vida terminamos viviendo acá en Punta Arenas.</p>
                    <p>Estando acá nos dimos cuenta de que podíamos aportar algo distinto. No le dimos muchas vueltas: tomamos la receta clásica de las milanesas que conocíamos de siempre y decidimos abrir nuestro propio local.</p>
                    <p><strong>Misión:</strong> Ofrecer milanesas de calidad, contundentes y bien preparadas, entregando una experiencia simple, rica y confiable en cada pedido, manteniendo siempre el sabor tradicional.</p>
                    <p><strong>Visión:</strong> Convertirnos en un referente local en Punta Arenas en comida rápida de calidad, destacando por nuestras milanesas y creciendo de forma constante sin perder nuestra esencia.</p>
                </div>
                <div className="col-md-6 mt-4 mt-md-0">
                    <div className="bg-dark text-white text-center p-3 rounded">
                        <h3 className="fw-bold text-danger text-uppercase">Santa Mila</h3>
                        <img src="/imagenes/local.png" className="img-fluid my-3" style={{ maxWidth: '250px' }} alt="Local" />
                        <hr className="bg-white" />
                        <p className="mb-0">Punta Arenas, Chile</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Nosotros;