/**
 * Clase principal generada y disponible en el entorno global instanciada como
 * Gm
 * 
 * Requiere Three.js
 * 
 * @author Cristóbal Díaz Álvarez <http://www.cristobaldiazalvarez.cl>
 * @class GM
 * @constructor
 */

var GM = new function () {

    var root = this;

    /**
     * función que comienza a correr la aplicación, debe ser llamada luego de realizar todas las configuraciones para iniciar
     * @method GM.start
     */
    this.start = function () {
        window.requestAnimFrame = root.Frame.requestAnimFrame();
    };

};

if (typeof THREE === 'undefined') {
    throw new Error('GM requiere Three.js')
}