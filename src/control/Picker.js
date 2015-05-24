/**
 * controlador para los pickers, un picker es un objeto que interactúa con el usuario
 * al estar demasiado cerca. El mesh debe ser agregado manualmente a la escena
 * @memberOf Control
 * @class Picker
 * @param {Object} args argumentos para construir el objeto
 * @param {THREE.Mesh} args.mesh mesh del picker
 * @param {function} args.onPick función ejecutada al momento de asir
 * @param {boolean} args.removeOnPick se elimina de [GM.World.pickers]{@link GM.World} al asir
 * @param {boolean} args.autoAdd se agrega automáticamente a [GM.World.pickers]{@link GM.World} al instanciar
 * @throws si args.mesh no es instancia de THREE.Mesh
 * @constructor
 */
Control.Picker = function (args) {

    var me = this;

    /**
     * @property {THREE.Mesh} mesh mesh del picker
     * @property {function} onPick función que se ejecuta al asir el picker
     * @property {boolean} removeOnPick se elimina o no el picker al asir, default true
     * @property {boolean} autoAdd se agrega automáticamente a [GM.World.pickers]{@link GM.World} al instanciar default true
     */
    this.mesh = args.mesh || null;
    this.onPick = args.onPick || GM.blank;
    this.removeOnPick = args.removeOnPick || true;
    this.autoAdd = args.autoAdd || true;

    if (!(this.mesh instanceof TRHEE.Mesh)) {
        throw "Debe definir Mesh como una instancia de THREE.Mesh";
    }

    /*
     * Agrega el picker al mundo
     */
    if (me.autoAdd) {
        if (GM.started) {
            GM.World.pickers.push(me);
        } else {
            GM.beforeStart.add(null, function () {
                GM.World.pickers.push(me);
            });
        }
    }
};