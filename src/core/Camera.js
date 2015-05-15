/**
 * Controla la cámara que utiliza la aplicación, básicamente lo que hace
 * es instanciar y controlar los movimientos de acuerdo a los movimientos que
 * realice el jugador
 * @memberOf GM
 * @class Camera
 */

GM.Camera = new function () {

    var me = this;

    /**
     * @property {THREE.PerspectiveCamera} camera Objeto cámara para la aplicación
     * @property {THREE.OrbitControls} controls Controles que definen el comportamiento de la cámara
     */
    this.camera;
    this.controls;

    /**
     * Creación de la cámara para el juego, este método es utilizado al momento
     * de iniciar la aplicación en GM.start()
     * @method GM.Camera.Build 
     */
    this.build = function () {
        me.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 1000);
        me.camera.position.set(60, 60, 60);
        me.camera.rotation.order = 'YXZ';
        me.camera.rotation.y = -Math.PI / 4;
        me.camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
        buildControls();
    };

    /**
     * Crea los controles que definirán el comportamiento de la cámara en la
     * aplicación
     * @method GM.Camera.buildControls
     * @private
     */
    var buildControls = function () {
        me.controls = new THREE.OrbitControls(me.camera, GM.Renderer.renderer.domElement);
        me.controls.addEventListener("change", GM.Renderer.render);
        me.controls.noZoom = false;
        me.controls.minDistance = 20;
        me.controls.maxDistance = 200;
        me.controls.noPan = true;
        me.controls.minPolarAngle = Math.PI / 5;
        me.controls.maxPolarAngle = Math.PI / 2;
    };
};