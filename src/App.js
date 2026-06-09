import React, { useState, useEffect } from 'react';
// Importamos las listas de comida desde el archivo de productos
import { productosMilanesas, productosSandwich, productosMilapizzas, productosBebidas } from './menu/productos';

// Importamos las funciones del archivo funciones.js 
import { encriptarRut, guardarPedidos, cargarPedidos } from './funciones';

// Componentes fijos 
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';

// Paginas para luego poder navegar por la pagina
import Inicio from './Paginas/Inicio';
import Nosotros from './Paginas/Nosotros';
import Contacto from './Paginas/Contacto';
import Terminos from './Paginas/Terminos';
import Proyecto from './Paginas/Proyecto';

function App() {

  // Variables de estado basicas para movernos por el sitio y manejar el carro
  const [vista, setVista] = useState('inicio');
  const [filtroCategoria, setFiltroCategoria] = useState('todo');
  const [carrito, setCarrito] = useState([]);
  const [verFormulario, setVerFormulario] = useState(false);


  // Cargamos los pedidos antiguos llamando a la funcion del LocalStorage
  const [listaPedidos, setListaPedidos] = useState(() => {
    return cargarPedidos();
  });

  //API
  const [valoresApi, setValoresApi] = useState({ uf: 1, euro: 1, utm: 1 });
  const [monedaSeleccionada, setMonedaSeleccionada] = useState('CLP');

  // Aqui llamamos a la api apenas cargue la pagina con el fetch
  useEffect(() => {
    fetch('https://mindicador.cl/api')
      .then(res => res.json())
      .then(data => {
        setValoresApi({
          uf: data?.uf?.valor ? data.uf.valor : 38100,
          euro: data?.euro?.valor ? data.euro.valor : (data?.euros?.valor ? data.euros.valor : 1025),
          utm: data?.utm?.valor ? data.utm.valor : 66300
        });
      })
      .catch(err => {
        // Si no hay internet o se cae la API de mindicador, usamos estos valores a mano para que no falle
        console.log("Hubo un error con la API, usamos precios de respaldo manuales:", err);
        setValoresApi({ uf: 38100, euro: 1025, utm: 66300 });
      });
  }, []);

  // Función para calcular y convertir los precios de pesos chilenos a UF, Euro o UTM 
  const formatearPrecio = (precioEnPesos) => {
    if (monedaSeleccionada === 'CLP') {
      return `$${precioEnPesos} CLP`;
    }

    let valorDivisa = 1;
    if (monedaSeleccionada === 'UF') valorDivisa = valoresApi.uf;
    if (monedaSeleccionada === 'EURO') valorDivisa = valoresApi.euro;
    if (monedaSeleccionada === 'UTM') valorDivisa = valoresApi.utm;

    // calculo para poder cambiar a la divisa 
    const precioConvertido = precioEnPesos / valorDivisa;

    if (monedaSeleccionada === 'EURO') {
      return `€${precioConvertido.toFixed(2)}`;
    }
    return `${precioConvertido.toFixed(2)} ${monedaSeleccionada}`;
  };

  // Estados para manejar los datos del formulario de despacho
  const [deliveryChecked, setDeliveryChecked] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [zona, setZona] = useState('');
  const [pago, setPago] = useState('');
  const [notas, setNotas] = useState('');
  const [acepta, setAcepta] = useState(false);
  const [mensajeError, setMensajeError] = useState('');


  //  FUNCIONES DEL CARRITO DE COMPRAS
  // Función para meter productos al carro
  const agregarProducto = (producto) => {
    if (producto.id === 12 || producto.id === 13) {
      alert("Recuerda que debes ser mayor de edad para poder comprar alcohol.");
    }

    let copia = [...carrito];
    let encontrado = false;

    // Recorremos el carro con un for para ver si el producto ya esta, si esta se suma 1 a la cantidad
    for (let i = 0; i < copia.length; i++) {
      if (copia[i].producto.id === producto.id) {
        copia[i].cantidad = copia[i].cantidad + 1;
        encontrado = true;
        break;
      }
    }

    // Si el producto no estaba en el carro, lo agregamos como un item nuevo al final
    if (encontrado === false) {
      let nuevoItem = { producto: producto, cantidad: 1 };
      copia.push(nuevoItem);
    }
    setCarrito(copia);
  };

  // Maneja los botones de mas y menos en el carrito
  const cambiarCantidad = (idProd, cambio) => {
    let copia = [...carrito];
    for (let i = 0; i < copia.length; i++) {
      if (copia[i].producto.id === idProd) {
        let cuenta = copia[i].cantidad + cambio;
        // Validación para que los productos no bajen de 1 unidad
        copia[i].cantidad = cuenta < 1 ? 1 : cuenta;
        break;
      }
    }
    setCarrito(copia);
  };

  // Elimina un producto completo sacandolo de la lista
  const eliminarProducto = (idProd) => {
    let nuevoCarrito = [];
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].producto.id !== idProd) {
        nuevoCarrito.push(carrito[i]);
      }
    }
    setCarrito(nuevoCarrito);
  };

  // Ciclo for  para calcular la suma total de dinero del carro
  let sumaDinero = 0;
  for (let i = 0; i < carrito.length; i++) {
    sumaDinero = sumaDinero + (carrito[i].producto.precio * carrito[i].cantidad);
  }
  const total = sumaDinero;

  // Ciclo for para contar la cantidad total de productos que lleva acumulados
  let sumaCantidades = 0;
  for (let i = 0; i < carrito.length; i++) {
    sumaCantidades = sumaCantidades + carrito[i].cantidad;
  }
  const cantidadProductos = sumaCantidades;

  //  CREAR Y ELIMINAR PEDIDOS EN HISTORIAL
  // Guarda la orden lista en la lista general con el RUT cifrado
  const grabarPedido = (rut, nombre, puntos, tipoEntrega, direccionEntrega, formaPago) => {
    // Llamamos a la función externa para encriptar el RUT de forma segura
    const rutCifrado = encriptarRut(rut);

    // Creamos el objeto con toda la información del pedido completo
    const nuevoPedido = {
      id: Date.now(),
      cliente: nombre,
      rutCifrado: rutCifrado,
      listaItems: carrito,
      tipoEntrega: tipoEntrega,
      direccionEntrega: direccionEntrega || 'Retiro en Local',
      formaPago: formaPago,
      totalMonto: total,
      puntosAcumulados: puntos,
      estado: 'Recibido'
    };

    // Agregamos el pedido nuevo al historial que ya teniamos
    let nuevoHistorial = [...listaPedidos, nuevoPedido];
    setListaPedidos(nuevoHistorial);

    // Guardamos la lista actualizada en el LocalStorage llamando a la función de funciones.js
    guardarPedidos(nuevoHistorial);

    alert("¡Pedido confirmado con éxito!\n\nHola " + nombre + ", tu pedido fue procesado.");
    limpiarForm();
  };

  // Sacar un pedido viejo de la lista del historial
  const borrarPedido = (idPedido) => {
    let listaFiltrada = [];
    for (let i = 0; i < listaPedidos.length; i++) {
      if (listaPedidos[i].id !== idPedido) {
        listaFiltrada.push(listaPedidos[i]);
      }
    }
    setListaPedidos(listaFiltrada);
    guardarPedidos(listaFiltrada);
  };

  // Limpiar el formulario
  const limpiarForm = () => {
    setCarrito([]);
    setDireccion(''); setZona(''); setPago(''); setNotas(''); setAcepta(false);
    setDeliveryChecked(false);
    setVerFormulario(false);
    setMensajeError('');
  };

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-between">
      <Navbar setVista={setVista} vista={vista} monedaSeleccionada={monedaSeleccionada} setMonedaSeleccionada={setMonedaSeleccionada} />

      {/* Control de navegacion de las vistas */}
      {vista === 'inicio' && (
        <Inicio
          filtroCategoria={filtroCategoria}
          setFiltroCategoria={setFiltroCategoria}
          agregarProducto={agregarProducto}
          formatearPrecio={formatearPrecio}
          carrito={carrito}
          total={total}
          cantidadProductos={cantidadProductos}
          eliminarProducto={eliminarProducto}
          cambiarCantidad={cambiarCantidad}
          verFormulario={verFormulario}
          setVerFormulario={setVerFormulario}
          deliveryChecked={deliveryChecked}
          setDeliveryChecked={setDeliveryChecked}
          direccion={direccion}
          setDireccion={setDireccion}
          zona={zona}
          setZona={setZona}
          pago={pago}
          setPago={setPago}
          notes={notas}
          setNotas={setNotas}
          acepta={acepta}
          setAcepta={setAcepta}
          mensajeError={mensajeError}
          grabarPedido={grabarPedido}
          productosMilanesas={productosMilanesas}
          productosSandwich={productosSandwich}
          productosMilapizzas={productosMilapizzas}
          productosBebidas={productosBebidas}
        />
      )}

      {/* Tabla del Historial de compras guardadas */}
      {vista === 'historial' && (
        <div className="container py-5">
          <div className="card p-4 bg-dark text-white border-secondary">
            <h3 className="fw-bold border-bottom pb-2 mb-4 text-uppercase text-light">
              Mis Pedidos Guardados
            </h3>
            <div className="table-responsive">
              <table className="table table-dark table-hover text-center align-middle small">
                <thead>
                  <tr className="text-secondary small text-uppercase">
                    <th>N° Orden</th>
                    <th>Cliente</th>
                    <th>RUT</th>
                    <th>Tipo de entrega</th>
                    <th>Dirección Entrega</th>
                    <th>Forma de pago</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Gestión</th>
                  </tr>
                </thead>
                <tbody>
                  {listaPedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td className="text-white-50">#{pedido.id.toString().slice(-6)}</td>
                      <td>{pedido.cliente}</td>
                      <td>{pedido.rutCifrado}</td>
                      <td>{pedido.tipoEntrega}</td>
                      <td className="small text-white-50">{pedido.direccionEntrega}</td>
                      <td>{pedido.formaPago}</td>
                      <td>{formatearPrecio(pedido.totalMonto)}</td>
                      <td>{pedido.estado}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger py-0 px-2 small" style={{ fontSize: '0.75rem' }} onClick={() => borrarPedido(pedido.id)}>
                          Anular Orden
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn btn-outline-light mt-4 align-self-start btn-sm fw-bold" onClick={() => setVista('inicio')}>← Volver a la Carta Principal</button>
          </div>
        </div>
      )}

      {vista === 'nosotros' && <Nosotros />}
      {vista === 'contacto' && <Contacto />}
      {vista === 'terminos' && <Terminos />}
      {vista === 'proyecto' && <Proyecto />}
      <Footer />
    </div>
  );
}

// Exportamos el componente para usarlo en el index
export default App;