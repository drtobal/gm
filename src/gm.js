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
     * @property {Collection} beforeStart colección de funciones que se ejecutan antes de comenzar la aplicación
     * @property {function} blank función vacía 
     */
    this.scene = null;
    this.config = {
        debug: false
    };
    this.beforeStart = new Util.Collection();
    this.blank = function () {
    };

    /**
     * función que comienza a correr la aplicación, debe ser llamada luego de realizar todas las configuraciones para iniciar
     * @method GM.start
     */
    this.start = function () {
        me.scene = new THREE.Scene();
        me.Renderer.build();
        me.Camera.build();
        me.Frame.build();

        me.beforeStart.getCollection().forEach(function (item) {
            item.value();
        });

        me.Mesh = Mesh;
        me.World.create(me.scene, Mesh);

        me.Renderer.onWindowResize();
        window.addEventListener('resize', me.Renderer.onWindowResize, false);

        requestAnimFrame(function animate() {
            requestAnimationFrame(animate);
            me.Renderer.render();
        });
    };

};

if (typeof THREE === 'undefined') {
    throw new Error('GM requiere Three.js')
}

Gm = GM;