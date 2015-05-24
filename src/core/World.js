/**
 * Clase que contiene el mundo del juego
 * @memberOf GM
 * @class World
 */

GM.World = new function () {

    /**
     * @property {function} createWorld función para crear el mundo
     * @property {array} colliders colección con los objetos que no se pueden atravesar
     */
    this.createWorld = GM.blank;
    this.colliders = new Array();
    
    /**
     * Función llama en GM.start para crear el mundo
     * @method GM.World.create
     * @param {THREE.Scene} scene insertado por GM
     * @returns {undefined}
     */
    this.create = function (scene) {
        this.createWorld(scene);
    };
};