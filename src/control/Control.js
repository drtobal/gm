/**
 * Base para los controles del usuario, como mouse, teclado, etc.
 * Al momento de ejecutar {GM.start} se inicializan todos los controles
 * @class Control
 */
var Control = new function () {
    
    this.Mouse = GM.blank;
    
    this.build = function () {
        this.Mouse = new this.Mouse();
    };
};