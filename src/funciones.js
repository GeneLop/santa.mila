import CryptoJS from 'crypto-js';
//ENCRIPTACION DE RUT
// Funciones para poder encriptar eñ RUT 
export const encriptarRut = (rut) => {
    // Usamos una clave secreta para hacer el cifrado AES
    return CryptoJS.AES.encrypt(rut, 'clave-secreta-mila').toString();
};

// Funcion para tomar la lista de pedidos y la guarda en el LocalStorage del computador 
export const guardarPedidos = (historial) => {
    localStorage.setItem('historial_compras_mila', JSON.stringify(historial));
};

// Esta función lee los pedidos que quedaron guardados en el LocalStorage para cargarlos al abrir la página
export const cargarPedidos = () => {
    const datos = localStorage.getItem('historial_compras_mila');
    return datos ? JSON.parse(datos) : [];
};


// VALIDACIONES DEL RUT Y CALCULO DE LA EDAD
// FEsta funcion permite revisar si el RUT chileno es correcto o no
export const validarRutChileno = (textoRut) => {
    let limpio = textoRut.replace(/\./g, '').replace(/ /g, '').toUpperCase();
    if (!limpio.includes('-')) return false; // Si no tiene guion, no sirve

    let partes = limpio.split('-');
    let numero = partes[0];
    let digito = partes[1];

    // Validamos el largo del número del RUT
    if (numero.length < 7 || numero.length > 8 || digito.length !== 1) return false;

    // Ciclo for para hacer la multiplicación del RUT del 2 al 7
    let suma = 0;
    let factor = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
        suma = suma + (Number(numero[i]) * factor);
        factor = factor === 7 ? 2 : factor + 1;
    }

    let resto = suma % 11;
    let res = 11 - resto;

    // digito verificador
    let dvReal = '';
    if (res === 11) dvReal = '0';
    else if (res === 10) dvReal = 'K';
    else dvReal = res.toString();

    return digito === dvReal;
};

//ALGORITMO PARA CALCULAR LA EDAD DEL CLIENTE, EN EL CASO DE LA PAGINA PARA VER SI PUEDE O NO COMPRAR ALCOHOL
export const verificarEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;
    const diaHoy = new Date();
    const cumple = new Date(fechaNacimiento);

    // Restamos los años para tener la edad
    let edad = diaHoy.getFullYear() - cumple.getFullYear();
    const mes = diaHoy.getMonth() - cumple.getMonth();
    if (mes < 0 || (mes === 0 && diaHoy.getDate() < cumple.getDate())) {
        edad--;
    }
    return edad;
};