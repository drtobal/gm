/**
 * Crea al personaje principal
 * @memberOf Mesh.Actor
 * @class Main
 * @constructor
 */

Mesh.Actor.Main = function () {

    /**
     * @property {THREE.Mesh} mesh mesh que contiene las extremidades y cuerpo
     * @property {THREE.Mesh} body mesh que contiene el cuerpo
     */
    this.mesh;
    this.body;

    var geometry = {
        hands: {
            left: new THREE.BoxGeometry(2, 4, 2),
            right: new THREE.BoxGeometry(2, 4, 2)
        },
        foots: {
            left: new THREE.BoxGeometry(2, 4, 2),
            right: new THREE.BoxGeometry(2, 4, 2)
        }
    };

    geometry.hands.left.applyMatrix(new THREE.Matrix4().makeTranslation(0, -2, 0));
    geometry.hands.right.applyMatrix(new THREE.Matrix4().makeTranslation(0, -2, 0));
    geometry.foots.left.applyMatrix(new THREE.Matrix4().makeTranslation(0, -2, 0));
    geometry.foots.right.applyMatrix(new THREE.Matrix4().makeTranslation(0, -2, 0));

    var textures = {
        head: THREE.ImageUtils.loadTexture("src/textures/actors/main/head.png"),
        hand: THREE.ImageUtils.loadTexture("src/textures/actors/main/hand.png"),
        foot: THREE.ImageUtils.loadTexture("src/textures/actors/main/foot.png")
    };

    textures.head.magFilter = THREE.NearestFilter;
    textures.head.minFilter = THREE.LinearMipMapLinearFilter;
    textures.hand.magFilter = THREE.NearestFilter;
    textures.hand.minFilter = THREE.LinearMipMapLinearFilter;
    textures.foot.magFilter = THREE.NearestFilter;
    textures.foot.minFilter = THREE.LinearMipMapLinearFilter;

    this.body = {
        head: new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), new THREE.MeshPhongMaterial({map: textures.head})),
        body: new THREE.Mesh(new THREE.BoxGeometry(4, 4, 3), new THREE.MeshLambertMaterial({color: 0x323232})),
        foots: {
            left: new THREE.Mesh(geometry.foots.left, new THREE.MeshPhongMaterial({map: textures.foot})),
            right: new THREE.Mesh(geometry.foots.right, new THREE.MeshPhongMaterial({map: textures.foot}))
        },
        hands: {
            left: new THREE.Mesh(geometry.hands.left, new THREE.MeshPhongMaterial({map: textures.hand})),
            right: new THREE.Mesh(geometry.hands.right, new THREE.MeshPhongMaterial({map: textures.hand}))
        }
    };

    Util.Mesh.cuboidMap({geometry: this.body.head.geometry});
    Util.Mesh.cuboidMap({geometry: this.body.hands.left.geometry});
    Util.Mesh.cuboidMap({geometry: this.body.hands.right.geometry});
    Util.Mesh.cuboidMap({geometry: this.body.foots.left.geometry});
    Util.Mesh.cuboidMap({geometry: this.body.foots.right.geometry});

    var baseY = 3;

    this.body.body.position.y = baseY + 4;
    this.body.head.position.y = 4;
    this.body.foots.left.position.y = -2;
    this.body.foots.left.position.x = -1;
    this.body.foots.right.position.y = -2;
    this.body.foots.right.position.x = 1;
    this.body.hands.left.position.y = 2;
    this.body.hands.left.position.x = -3;
    this.body.hands.right.position.y = 2;
    this.body.hands.right.position.x = 3;

    this.mesh = this.body.body;
    this.mesh.add(this.body.head);
    //this.mesh.add(this.body.body);
    this.mesh.add(this.body.foots.left);
    this.mesh.add(this.body.foots.right);
    this.mesh.add(this.body.hands.left);
    this.mesh.add(this.body.hands.right);

    this.body.head.receiveShadow = true;
    this.body.head.castShadow = true;
    this.body.body.receiveShadow = true;
    this.body.body.castShadow = true;
    this.body.foots.left.receiveShadow = true;
    this.body.foots.left.castShadow = true;
    this.body.foots.right.receiveShadow = true;
    this.body.foots.right.castShadow = true;
    this.body.hands.left.receiveShadow = true;
    this.body.hands.left.castShadow = true;
    this.body.hands.right.receiveShadow = true;
    this.body.hands.right.castShadow = true;
};