/**
 * Clase que contiene el mundo del juego
 * @memberOf GM
 * @class World
 */

GM.World = new function () {

    /**
     * @property {function} createWorld función para crear el mundo
     */
    this.createWorld = GM.blank;
    
    /**
     * Función llama en GM.start para crear el mundo
     * @param {THREE.Scene} scene insertado por GM
     * @returns {undefined}
     */
    this.create = function (scene) {
        this.createWorld(scene);
    };
};