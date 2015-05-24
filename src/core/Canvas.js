/**
 * Contenedor Canvas utilizado por la aplicación, recordando que la aplicación
 * requiere solamente de un contenedor
 * @memberOf GM
 * @class Canvas
 * @deprecated se marca deprecado por que el contendor canvas ha sido trasladado a GM.Renderer.renderer.domElement
 */

GM.Canvas = new function () {

    var me = this;

    /**
     * @property {Object} container nodo html que representa al canvas principal
     */
    this.node;

    /**
     * Creación del elemento canvas para la aplicaicón, se utiliza en GM.start()
     * @method GM.Canvas.Build 
     */
    this.build = function () {
        this.node = document.createElement("canvas");
        document.body.appendChild(this.node);
    };

};