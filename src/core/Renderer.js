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
     * Actualiza el tamaño y proporciones del nodo canvas de la aplicación cuando se ajusta el tamaño de la ventana
     * @method GM.Renderer.onWindowResize
     */
    this.onWindowResize = function () {
        var width, height;
        if ((window.innerWidth / 16) < (window.innerHeight / 9)) {
            width = window.innerWidth;
            height = (width / 16) * 9;
        } else {
            height = window.innerHeight;
            width = (height / 9) * 16;
        }
        GM.Canvas.node.style.width = width + "px";
        GM.Canvas.node.style.height = height + "px";
        me.renderer.setSize(width, height);
        GM.Camera.camera.updateProjectionMatrix();
        me.render();
    };

    /**
     * Renderiza el cuadro actual
     * @method GM.Renderer.render
     */
    this.render = function () {
        me.renderer.render(GM.scene, GM.Camera.camera);
    };
};