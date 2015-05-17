/**
 * Clase que permite trabajar con colecciones de variables
 * @class Collection
 */
var Collection = function () {
    var me = this;
    var collection = new Array();

    /**
     * Agrega un objeto a la colección
     * @method Collection.add
     * @param {string} key identificador del objeto, null para autogenerar
     * @param {type} value objeto que se quiere agregar
     * @returns {object} objeto que se ha agregado a la colección
     */
    this.add = function (key, value) {
        if (typeof key !== "string") {
            key = Date.now() + "";
        }
        var item = {
            key: key,
            value: value
        };
        collection.push(item);
        return item;
    };

    /**
     * 
     * @returns {Array|Collection.collection}
     */
    this.getCollection = function () {
        return collection;
    };
};