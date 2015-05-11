/**
 * Esta función imprime un saludo
 * @memberOf GM
 * @param {String} nombre nombre que se quiere mostrar en el saludo
 * @returns {void}
 */
function hola(nombre) {
    console.log("Hola " + nombre);
}

gm.hola = hola;

console.log(gm.hola("asd"));