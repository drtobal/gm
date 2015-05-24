/**
 * Constructor para el actor principal de la aplicación
 * @memberOf Actor
 * @class Main
 * @constructor
 */
Actor.Main = function () {

    var me = this;

    this.jumping = true;
    this.limitJumping = 0;
    this.onTheWay = {
        value: false,
        objetive: new THREE.Vector3()
    };
    var rays = {
        front: new THREE.Raycaster(),
        bottom: new THREE.Raycaster(),
        left: new THREE.Raycaster(),
        right: new THREE.Raycaster()
    };

    var keys = {
        letft: 0,
        right: 0,
        forward: 0,
        backward: 0,
        any: false,
        isAny: function () {
            if (this.left === 1 ||
                    this.forward === 1 ||
                    this.right === 1 ||
                    this.backward === 1) {
                this.any = true;
            } else
                this.any = false;
        }
    };

    var animate = {
        walk: function () {
            var x = (30 * Math.sin((new Date()).valueOf() / 50)) * (Math.PI / 180);
            actor.body.hands.left.rotation.x = x;
            actor.body.hands.right.rotation.x = -x;
            actor.body.foots.left.rotation.x = -x;
            actor.body.foots.right.rotation.x = x;
        },
        stand: function () {
            actor.body.hands.left.rotation.x = 0;
            actor.body.hands.right.rotation.x = 0;
            actor.body.foots.left.rotation.x = 0;
            actor.body.foots.right.rotation.x = 0;
        }
    };

    var actor = new Mesh.Actor.Main();
    GM.scene.add(actor.mesh);
    controller();
    GM.beforeRender.add("mainActorRender", render);
    GM.Camera.camera.lookAt(actor.mesh.position);

    this.setObjetive = function (point) {
        me.onTheWay.value = true;
        me.onTheWay.objetive = point;
    };

    this.goToObjetive = function () {
        if (Math.sqrt(Math.pow(actor.mesh.position.x - me.onTheWay.objetive.x, 2) + Math.pow(actor.mesh.position.z - me.onTheWay.objetive.z, 2)) > 3) {
            var point = me.onTheWay.objetive;
            var angle = Math.atan2(point.x - actor.mesh.position.x, point.z - actor.mesh.position.z);
            var rot = actor.mesh.rotation.y;
            var diff = angle - rot;

            if (Math.abs(diff) > Math.PI) {
                if (diff > 0)
                    rot += 2 * Math.PI;
                else
                    rot -= 2 * Math.PI;
                diff = angle - rot;
            }
            if (diff !== 0)
                rot += diff / 4;
            actor.mesh.rotation.set(0, rot, 0);
            if (!collide()) {
                actor.mesh.position.x += Math.sin(actor.mesh.rotation.y);
                actor.mesh.position.z += Math.cos(actor.mesh.rotation.y);
                animate.walk();
            } else
                animate.stand();
        } else {
            me.onTheWay.value = false;
            animate.stand();
        }
    };

    function render() {
        var oldPos = actor.mesh.position.clone();

        if (collideWithGround()) {
            if (!me.jumping && keys.space === 1)
                jump();
        } else {
            if (!me.jumping)
                actor.mesh.position.y -= (Math.pow(Math.abs(actor.mesh.position.y), .2));
        }

        if (keys.any) {
            me.onTheWay.value = false;
            move();
        } else {
            if (me.onTheWay.value)
                me.goToObjetive();
            else
                animate.stand();
        }

        GM.Camera.camera.position.x += actor.mesh.position.x - oldPos.x;
        GM.Camera.camera.position.y += actor.mesh.position.y - oldPos.y;
        GM.Camera.camera.position.z += actor.mesh.position.z - oldPos.z;

        GM.Camera.camera.lookAt(actor.mesh.position);
        GM.Camera.controls.center.fromArray([
            actor.mesh.position.x,
            actor.mesh.position.y,
            actor.mesh.position.z]);
    }

    function jump() {
        me.jumping = true;
        var pos = actor.mesh.position.clone();
        var tween = new TWEEN.Tween(pos).to(new THREE.Vector3(0, pos.y + 25, 0), 400);
        tween.easing(TWEEN.Easing.Cubic.Out);
        tween.onUpdate(function () {
            GM.Camera.camera.position.y += pos.y - actor.mesh.position.y;
            actor.mesh.position.y = pos.y;
        });
        tween.onComplete(function () {
            me.jumping = false;
        });
        tween.start();
    }

    function collide() {
        var vectorLeft = new THREE.Vector3(1, 0, 0);
        vectorLeft.applyAxisAngle(new THREE.Vector3(0, 1, 0), actor.mesh.rotation.y);
        rays.left.set(actor.mesh.position, vectorLeft);
        var collisionsLeft = rays.left.intersectObjects(GM.World.colliders, true);
        if (collisionsLeft.length > 0 && collisionsLeft[0].distance <= 5)
            actor.mesh.translateX(-1);

        var vectorRight = new THREE.Vector3(-1, 0, 0);
        vectorRight.applyAxisAngle(new THREE.Vector3(0, 1, 0), actor.mesh.rotation.y);
        rays.right.set(actor.mesh.position, vectorRight);
        var collisionsRight = rays.right.intersectObjects(GM.World.colliders, true);
        if (collisionsRight.length > 0 && collisionsRight[0].distance <= 5)
            actor.mesh.translateX(1);

        var vector = new THREE.Vector3(0, 0, 1);
        vector.applyAxisAngle(new THREE.Vector3(0, 1, 0), actor.mesh.rotation.y);
        rays.front.set(actor.mesh.position, vector);
        var collisions = rays.front.intersectObjects(GM.World.colliders, true);
        return collisions.length > 0 && collisions[0].distance <= 4;
    }

    function collideWithGround() {
        rays.bottom.set(actor.mesh.position, new THREE.Vector3(0, -1, 0));
        var collisions = rays.bottom.intersectObjects(GM.World.colliders, true);
        if (collisions.length > 0 && collisions[0].distance <= 6.5) {
            if (6.5 - collisions[0].distance >= 2)
                actor.mesh.position.y += 6.5 - collisions[0].distance;
            this.jumping = false;
            return true;
        }
        return false;
    }

    function move() {
        var colliding = collide();

        var v = new THREE.Vector3(0, 0, 0);
        if (keys.forward === 1)
            v.z = -1;
        if (keys.right === 1)
            v.x = 1;
        if (keys.backward === 1)
            v.z = 1;
        if (keys.left === 1)
            v.x = -1;

        var angle = GM.Camera.camera.rotation.y + Math.atan2(v.x, v.z);
        var rot = actor.mesh.rotation.y;
        var diff = angle - rot;

        if (Math.abs(diff) > Math.PI) {
            if (diff > 0)
                rot += 2 * Math.PI;
            else
                rot -= 2 * Math.PI;
            diff = angle - rot;
        }
        if (diff !== 0) {
            rot += diff / 4;
        }
        actor.mesh.rotation.set(0, rot, 0);
        if (!colliding) {
            actor.mesh.position.x += Math.sin(actor.mesh.rotation.y);
            actor.mesh.position.z += Math.cos(actor.mesh.rotation.y);
            animate.walk();
        } else {
            animate.stand();
        }
    }

    function controller() {
        window.addEventListener("keydown", function (event) {
            if (event.keyCode === 65 || event.keyCode === 37)//a - left
                keys.left = 1;
            if (event.keyCode === 68 || event.keyCode === 39)//d - right
                keys.right = 1;
            if (event.keyCode === 87 || event.keyCode === 38)//w - up
                keys.forward = 1;
            if (event.keyCode === 83 || event.keyCode === 40)//s - down
                keys.backward = 1;
            if (event.keyCode === 32) //space
                keys.space = 1;
            keys.isAny();
        });
        window.addEventListener("keyup", function (event) {
            if (event.keyCode === 65 || event.keyCode === 37)
                keys.left = 0;
            if (event.keyCode === 68 || event.keyCode === 39)
                keys.right = 0;
            if (event.keyCode === 87 || event.keyCode === 38)
                keys.forward = 0;
            if (event.keyCode === 83 || event.keyCode === 40)
                keys.backward = 0;
            if (event.keyCode === 32)
                keys.space = 0;
            keys.isAny();
        });
    }
};