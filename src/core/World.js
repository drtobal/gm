/**
 * Clase que contiene el mundo del juego
 * @memberOf GM
 * @class World
 */

GM.World = new function () {

    /**
     * @property {function} createWorld función para crear el mundo
     * @property {array} colliders colección con los objetos que no se pueden atravesar
     * @property {array} pickers colección de objetos que pueden ser asidos por el usuario
     */
    this.createWorld = GM.blank;
    this.colliders = new Array();
    this.pickers = new Array();
    
    /**
     * Función llama en GM.start para crear el mundo
     * @method GM.World.create
     * @param {THREE.Scene} scene insertado por GM
     */
    this.create = function (scene) {
        this.createWorld(this, scene);
    };
};