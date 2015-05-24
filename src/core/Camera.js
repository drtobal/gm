/**
 * Controla la cámara que utiliza la aplicación, básicamente lo que hace
 * es instanciar y controlar los movimientos de acuerdo a los movimientos que
 * realice el jugador
 * @memberOf GM
 * @class Camera
 */

GM.Camera = new function () {

    var me = this;

    /**
     * @property {THREE.PerspectiveCamera} camera Objeto cámara para la aplicación
     * @property {THREE.OrbitControls} controls Controles que definen el comportamiento de la cámara
     */
    this.camera;
    this.controls;

    /**
     * Creación de la cámara para el juego, este método es utilizado al momento
     * de iniciar la aplicación en GM.start()
     * @method GM.Camera.build 
     */
    this.build = function () {
        me.camera = new THREE.PerspectiveCamera(45, 16 / 9, 1, 1000);
        me.camera.position.set(60, 60, 60);
        me.camera.rotation.order = "YXZ";
        me.camera.rotation.y = -Math.PI / 4;
        me.camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
        buildControls();
        GM.beforeRender.add("GM.Camera.makeMeshTransparent", makeMeshTransparent);
    };

    /*
     * Crea los controles que definirán el comportamiento de la cámara en la
     * aplicación
     */
    function buildControls() {
        me.controls = new THREE.OrbitControls(me.camera, GM.Renderer.renderer.domElement);
        me.controls.addEventListener("change", GM.Renderer.render);
        me.controls.noZoom = false;
        me.controls.minDistance = 20;
        me.controls.maxDistance = 200;
        me.controls.noPan = true;
        me.controls.minPolarAngle = Math.PI / 5;
        me.controls.maxPolarAngle = Math.PI / 2;
    }

    /*
     * Activa transparencia para los meshes que se interpongan entre la cámara y el
     * usuario, esta función se enlaca al proceso de renderizado en {@link GM.Camera.build}
     */
    function makeMeshTransparent() {
        var vector = new THREE.Vector3();
        var ray = new THREE.Raycaster();
        var dir = new THREE.Vector3();

        if (me.camera instanceof THREE.OrthographicCamera) {
            vector.set(0, 0, -1);
            vector.unproject(me.camera);
            dir.set(0, 0, -1).transformDirection(me.camera.matrixWorld);
            ray.set(vector, dir);
        } else if (me.camera instanceof THREE.PerspectiveCamera) {
            vector.set(0, 0, 0.5);
            vector.unproject(me.camera);
            ray.set(me.camera.position, vector.sub(me.camera.position).normalize());
        }
        var custom = GM.World.colliders.slice(0);
        custom.push(GM.mainActor.actor.mesh);
        var intersects = ray.intersectObjects(custom, true);
        GM.World.colliders.forEach(function (obj) {
            if (obj instanceof THREE.Mesh) {
                if (obj.material instanceof THREE.MeshFaceMaterial)
                    obj.material.materials.forEach(function (mat) {
                        mat.opacity = 1;
                    });
                else
                    obj.material.opacity = 1;
            } else {
                obj.children.forEach(function (chl) {
                    if (chl.material instanceof THREE.MeshFaceMaterial)
                        chl.material.materials.forEach(function (mat) {
                            mat.opacity = 1;
                        });
                    else
                        chl.material.opacity = 1;
                });
            }
        });
        if (intersects.length > 0) {
            var actor = GM.mainActor.actor.mesh;
            var distance = Math.sqrt(
                    Math.pow(actor.position.x - me.camera.position.x, 2) +
                    Math.pow(actor.position.y - me.camera.position.y, 2) +
                    Math.pow(actor.position.z - me.camera.position.z, 2));
            intersects.forEach(function (intersect) {
                if (intersect.distance < distance) {
                    if (intersect.object.material instanceof THREE.MeshFaceMaterial) {
                        intersect.object.material.materials.forEach(function (mat) {
                            mat.opacity = .2;
                        });
                    } else {
                        intersect.object.material.opacity = .2;
                    }
                }
            });
        }
    }
};