/**
 * En el objeto frame se manejan los frames que requiere la aplicación
 * para renderizar cada cuadro de la aplicación
 * @memberOf GM
 * @class Frame
 */

GM.Frame = new function () {

    /**
     * obtiene el tipo de animación disponible para el bucle de renderizado
     * @method GM.Frame.requestAnimFrame
     * @return {function} el tipo de animación disponible
     */
    this.requestAnimFrame = function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    };
};

