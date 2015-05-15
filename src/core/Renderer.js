/**
 * Solamente existe un renderizador por aplicación, por lo que esta clase se utiliza automáticamente por GM
 * @memberOf GM
 * @class Renderer
 */
GM.Renderer = new function () {

    var me = this;

    /**
     * @property {THREE.WebGLRenderer} renderer objeto de renderizado principal de la aplicación
     * @property {object} config Configuración para renderer
     */
    this.renderer;
    this.config = {
        shadowMapEnabled: true,
        antialias: true,
        alpha: true,
        devicePixelRatio: 1,
        setClearColor: 0x7EB3E5,
        softShadows: true,
    };

    /**
     * Genera el renerizador principal del juego, esta función se llama solamente al realizar GM.start()
     * @method GM.Renderer.build
     */
    this.build = function () {
        me.renderer = new THREE.WebGLRenderer({
            antialias: me.config.antialias,
            alpha: me.config.alpha,
            devicePixelRatio: me.config.devicePixelRatio
        });
        me.renderer.shadowMapEnabled = me.config.shadowMapEnabled;
        me.renderer.setClearColor(me.config.setClearColor, 1);
        if (me.config.softShadows) {
            me.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        }
    };

    /**
     * Renderiza el cuadro actual
     * @method GM.Renderer.render
     */
    this.render = function () {
        me.renderer.render(GM.scene, GM.Camera.camera);
    };
};