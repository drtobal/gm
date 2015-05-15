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
     * @property {THREE.PerspectiveCamera} camera objeto cámara para la aplicación
     */
    var camera;

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
    };
};