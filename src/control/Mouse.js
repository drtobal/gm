/**
 * Controla el comportamiento del mouse
 * @class Mouse
 * @memberOf Control
 * @constructor
 */
Control.Mouse = new function () {

    var me = this;

    /**
     * @property {THREE.Vector3} vector utilizado para calcular la posición del mouse en la pantalla
     * @property {THREE.Raycaster} ray utilizado para detectar las colisiones del mouse con objetos de la escena
     * @property {THREE.Vector3} dir vector que ayuda a la tarea de detección de colisiones
     */
    this.vector = new THREE.Vector3();
    this.ray = new THREE.Raycaster();
    this.dir = new THREE.Vector3();

    /*
     * dispara el rayo en proyección de la posición del mouse
     */
    var shoot = function (event) {
        if (GM.Camera.camera instanceof THREE.OrthographicCamera) {
            me.vector.set(
                    (event.offsetX / GM.Renderer.renderer.domElement.width) * 2 - 1,
                    -(event.offsetY / GM.Renderer.renderer.domElement.height) * 2 + 1,
                    -1); // z = - 1 important!
            me.vector.unproject(GM.Camera.camera);
            me.dir.set(0, 0, -1).transformDirection(GM.Camera.camera.matrixWorld);
            me.ray.set(me.vector, me.dir);
        } else if (GM.Camera.camera instanceof THREE.PerspectiveCamera) {
            me.vector.set(
                    (event.offsetX / GM.Renderer.renderer.domElement.width) * 2 - 1,
                    -(event.offsetY / GM.Renderer.renderer.domElement.height) * 2 + 1,
                    0.5); // z = 0.5 important!
            me.vector.unproject(GM.Camera.camera);
            me.ray.set(GM.Camera.camera.position, me.vector.sub(GM.Camera.camera.position).normalize());
        }
    };

    /**
     * detecta objetos que colisionan con el mouse
     * @method Control.Mouse.detectColliders
     * @param {Object} event de mousemove
     * @param {Array} colliders colección de objetos a detectar como colisión
     * @returns {Array} objetos que colisionan con el rayo
     */
    this.detectColliders = function (event, colliders) {
        shoot(event);
        return me.ray.intersectObjects(colliders, false);
    };

    /**
     * obtiene el rayo correspondiente a la posición del mouse
     * @method Control.Mouse.getRay
     * @param {Object} event evento de mousemove
     * @returns {THREE.Raycaster} rayo correspondiente al mouse
     */
    this.getRay = function (event) {
        shoot(event);
        return me.ray;
    };

    /**
     * Construye el funcionamiento del mouse
     * @method Control.Mouse.build
     */
    this.build = function () {
        GM.Renderer.renderer.domElement.addEventListener("mousemove", mouseMove, false);
        GM.Renderer.renderer.domElement.addEventListener("mousedown", pointToGo, false);
        GM.beforeRender.add("pickerCtrl", picker);
    };

    /*
     * Cuando el botón del mouse está preseionado, y hace movimiento, se utiliza en pointToGo
     */
    function onPointMouseMove(event) {
        var intersects = me.detectColliders(event, GM.World.colliders);
        if (intersects.length > 0) {
            var inter = intersects[0];
            if (inter.object.geometry instanceof THREE.BoxGeometry) {
                if (inter.face.normal.y !== 1) {
                    return;
                }
            } else {
                return;
            }
            GM.mainActor.setObjetive(inter.point);
        }
    }

    /*
     * Cuando se deja de presionar el botón del mouse, se retiran los escuchadores correspondientes
     * se utiliza en pontToGo
     */
    function onPointMouseUp() {
        GM.Renderer.renderer.domElement.removeEventListener("mousemove", onPointMouseMove, false);
        GM.Renderer.renderer.domElement.removeEventListener("mouseup", onPointMouseUp, false);
    }

    /*
     * Indica al actor principal que se diriga a un punto específico de acuerdo al mouse
     */
    function pointToGo(event) {
        if (event.button !== 0) {
            return;
        }
        GM.Renderer.renderer.domElement.addEventListener("mousemove", onPointMouseMove, false);
        GM.Renderer.renderer.domElement.addEventListener("mouseup", onPointMouseUp, false);

        var intersects = me.detectColliders(event, GM.World.colliders);

        if (intersects.length > 0) {
            var objects = new Array();
            
            var inter = intersects[0];
            if (inter.object.geometry instanceof THREE.BoxGeometry) {
                if (inter.face.normal.y !== 1) {
                    return;
                }
            } else {
                return;
            }

            for (var x in objects) {
                clearTimeout(objects[x].time);
                GM.beforeRender.remove(objects[x].torus.uuid);
                GM.scene.remove(objects[x].torus);
            }

            objects = new Array();

            var obj = {
                torus: new THREE.Mesh(
                        new THREE.TorusGeometry(10, 1, 16, 100),
                        new THREE.MeshBasicMaterial({
                            color: 0xffff00,
                            transparent: true,
                            opacity: 1
                        }))
            };

            obj.torus.rotation.x = Math.PI / 2;

            obj.torus.position.x = inter.point.x;
            obj.torus.position.y = inter.point.y;
            obj.torus.position.z = inter.point.z;

            GM.mainActor.setObjetive(inter.point);

            obj.torus.scale.set(.1, .1, .1);

            GM.beforeRender.add(obj.torus.uuid, function () {
                obj.torus.scale.x += .02;
                obj.torus.scale.y += .02;
                obj.torus.scale.z += .02;
                obj.torus.material.opacity -= .04;
            });

            obj.time = setTimeout(function () {
                GM.beforeRender.remove(obj.torus.uuid);
                GM.scene.remove(obj.torus);
            }, 500);

            objects.push(obj);
            GM.scene.add(obj.torus);
        }
    }

    /*
     * controla los objetos que al ser asidos, ya no pueden ser asidos nuevamente
     */
    function picker() {
        var id = new Date().valueOf().toString();
        for (var x in GM.World.pickers) {
            var picker = GM.World.pickers[x];
            var actor = GM.mainActor.actor.mesh;
            var distance = Math.sqrt(
                    Math.pow(actor.position.x - picker.mesh.position.x, 2) +
                    Math.pow(actor.position.y - picker.mesh.position.y, 2) +
                    Math.pow(actor.position.z - picker.mesh.position.z, 2));
            if (distance < 10) {
                picker.onPick();

                /*
                 * Animación de desaparecer y retiro de [GM.World.pickers]{@link GM.World}
                 */
                if (picker.removeOnPick) {
                    GM.World.pickers.splice(x, 1);

                    GM.beforeRender.add(id, function () {
                        picker.mesh.scale.x -= .1;
                        picker.mesh.scale.y -= .1;
                        picker.mesh.scale.z -= .1;
                        var pos = actor.position.clone();
                        picker.mesh.position.x += (pos.x - picker.mesh.position.x) / 4;
                        picker.mesh.position.y += (pos.y - picker.mesh.position.y) / 4;
                        picker.mesh.position.z += (pos.z - picker.mesh.position.z) / 4;
                        if (picker.mesh.scale.x <= 0) {
                            delete picker;
                            GM.scene.remove(picker.mesh);
                            GM.beforeRender.remove(id);
                        }
                    });
                }
            }
        }
    }

    /*
     * detecta si existe algún objeto bajo el mouse que pueda interactuar para
     * cambiar el estilo de cursor entre pointer y default
     */
    function mouseMove(event) {
        var ray = me.getRay(event);
        var intersect = new Array();
        for (var x in GM.World.pickers) {
            intersect = ray.intersectObject(GM.World.pickers[x].mesh);
            if (intersect.length > 0) {
                break;
            }
        }
        if (intersect.length > 0) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }
    }
};