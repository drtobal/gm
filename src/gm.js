/**
 * Clase principal generada y disponible en el entorno global instanciada como Gm
 * 
 * Requiere
 * Three.js
 * OrbitControls.js
 * Tween.js https://github.com/tweenjs/tween.js
 * 
 * @author Cristóbal Díaz Álvarez <http://www.cristobaldiazalvarez.cl>
 * @class GM
 * @constructor
 */

var GM = new function () {

    var me = this;

    /**
     * @property {THREE.Scene} scene Objeto con la scena de Three.js
     * @property {boolean} started true si ha finalizado el proceso de inicio {GM.start}, false si no
     * @property {Actor.Main} mainActor actor principal de la aplicación
     * @property {Object} config Define configuraciones generales de la aplicación
     * @property {boolean} config.debug se muestra la aplicación en modo debug
     * @property {Util.Collection} beforeStart colección de funciones que se ejecutan antes de comenzar la aplicación
     * @property {Util.Collection} beforeRender colección de funciones que se ejecutan antes de cada ciclo de renderizado
     * @property {function} blank función vacía 
     */
    this.scene = null;
    this.started = false;
    this.mainActor = null;
    this.config = {
        debug: false
    };
    this.beforeStart = new Util.Collection();
    this.beforeRender = new Util.Collection();
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
        Control.build();

        me.Mesh = Mesh;
        me.Control = Control;
        me.World.create(me.scene);
        
        me.mainActor = new Actor.Main();

        me.beforeStart.getCollection().forEach(function (item) {
            item.value();
        });

        me.Renderer.onWindowResize();
        window.addEventListener("resize", me.Renderer.onWindowResize, false);

        requestAnimFrame(function animate() {
            requestAnimationFrame(animate);
            me.Renderer.render();
        });
        
        me.started = true;
    };

};

if (typeof THREE === "undefined") {
    throw new Error("GM requiere Three.js")
}

Gm = GM;