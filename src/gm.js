/**
 * Clase principal generada y disponible en el entorno global instanciada como Gm
 * 
 * Requiere
 * Three.js
 * OrbitControls.js
 * 
 * @author Cristóbal Díaz Álvarez <http://www.cristobaldiazalvarez.cl>
 * @class GM
 * @constructor
 */

var GM = new function () {

    var me = this;

    /**
     * @property {THREE.Scene} scene Objeto con la scena de Three.js
     * @property {Object} config Define configuraciones generales de la aplicación
     */
    this.scene = null;
    this.config = {
        debug: false
    };

    /**
     * función que comienza a correr la aplicación, debe ser llamada luego de realizar todas las configuraciones para iniciar
     * @method GM.start
     */
    this.start = function () {
        me.scene = new THREE.Scene();
        me.Renderer.build();
        me.Camera.build();
        me.Canvas.build();
        me.Frame.build();
        me.Renderer.onWindowResize();
        
        requestAnimFrame(function animate() {
            requestAnimationFrame(animate);
            me.Renderer.render();
        });
        
        window.addEventListener('resize', me.Renderer.onWindowResize, false);
    };

};

if (typeof THREE === 'undefined') {
    throw new Error('GM requiere Three.js')
}