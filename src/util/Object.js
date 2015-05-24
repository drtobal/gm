/**
 * Funciones de utilidad para objetos de javascript
 * @class Object
 * @memberOf Util
 */
Util.Object = new function () {
    
    /**
     * extiende el objeto a con b, igualmente que $.extend
     * @method Util.Object.extend
     * @param {object} a objeto con propiedades de defecto
     * @param {object} b objeto para extender a
     * @returns {object} a a, sobre escrito por b
     */
    this.extend = function (a, b) {
        for (var attrname in b) {
            a[attrname] = b[attrname];
        }
        return a;
    };
};