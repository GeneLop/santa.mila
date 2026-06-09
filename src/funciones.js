import CryptoJS from 'crypto-js';
//ENCRIPTACION DE RUT
// Funciones para poder encriptar eñ RUT 
export const encriptarRut = (rut) => {
    // Usamos una clave secreta para hacer el cifrado AES
    return CryptoJS.AES.encrypt(rut, 'clave-secreta-mila').toString();
};

// Funcion para el LocalStorage
export const guardarPedidos = (historial) => {
    localStorage.setItem('historial_compras_mila', JSON.stringify(historial));
};

// Esta función lee los pedidos que quedaron guardados en el LocalStorage para cargarlos al abrir la página
export const cargarPedidos = () => {
    const datos = localStorage.getItem('historial_compras_mila');
    return datos ? JSON.parse(datos) : [];
};


// VALIDACIONES DEL RUT Y CALCULO DE LA EDAD
export const validarRutChileno = (rut) => {
    if (!rut) return false;

    // Limpiamos el RUT de puntos y guiones
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase().trim();
    if (rutLimpio.length < 2) return false;
    const numeros = rutLimpio.slice(0, -1);
    const esRepetido = /^(\d)\1+$/.test(numeros);
    if (esRepetido) {
        return false;
    }
    const dv = rutLimpio.slice(-1);
    
    let suma = 0;
    let multiplicador = 2;
    for (let i = numeros.length - 1; i >= 0; i--) {
        suma += parseInt(numeros[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    let dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
    return dv === dvCalc;
};

//ALGORITMO PARA CALCULAR LA EDAD DEL CLIENTE, EN EL CASO DE LA PAGINA PARA VER SI PUEDE O NO COMPRAR ALCOHOL
export const verificarEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;
    const diaHoy = new Date();
    const cumple = new Date(fechaNacimiento);

    if (cumple > diaHoy) return 0; 

    let edad = diaHoy.getFullYear() - cumple.getFullYear();
    const mes = diaHoy.getMonth() - cumple.getMonth();
    if (mes < 0 || (mes === 0 && diaHoy.getDate() < cumple.getDate())) {
        edad--;
    }

    if (edad > 120) return 0; 
    return edad;
};