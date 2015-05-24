/**
 * Crea al personaje principal
 * @memberOf Mesh.Actor
 * @class Main
 * @constructor
 */

Mesh.Actor.Main = function () {
    
    var me = this;
    
    this.mesh;
    this.body;
    
    this.build = function () {
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
            head: THREE.ImageUtils.loadTexture('src/textures/actors/main/head.png'),
            hand: THREE.ImageUtils.loadTexture('src/textures/actors/main/hand.png'),
            foot: THREE.ImageUtils.loadTexture('src/textures/actors/main/foot.png')
        };

        textures.head.magFilter = THREE.NearestFilter;
        textures.head.minFilter = THREE.LinearMipMapLinearFilter;
        textures.hand.magFilter = THREE.NearestFilter;
        textures.hand.minFilter = THREE.LinearMipMapLinearFilter;
        textures.foot.magFilter = THREE.NearestFilter;
        textures.foot.minFilter = THREE.LinearMipMapLinearFilter;

        me.body = {
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

        Util.Mesh.cuboidMap({geometry: me.body.head.geometry});
        Util.Mesh.cuboidMap({geometry: me.body.hands.left.geometry});
        Util.Mesh.cuboidMap({geometry: me.body.hands.right.geometry});
        Util.Mesh.cuboidMap({geometry: me.body.foots.left.geometry});
        Util.Mesh.cuboidMap({geometry: me.body.foots.right.geometry});

        var baseY = 3;

        me.body.body.position.y = baseY + 4;
        me.body.head.position.y = 4;
        me.body.foots.left.position.y = -2;
        me.body.foots.left.position.x = -1;
        me.body.foots.right.position.y = -2;
        me.body.foots.right.position.x = 1;
        me.body.hands.left.position.y = 2;
        me.body.hands.left.position.x = -3;
        me.body.hands.right.position.y = 2;
        me.body.hands.right.position.x = 3;

        me.mesh = me.body.body;
        me.mesh.add(me.body.head);
        //me.mesh.add(me.body.body);
        me.mesh.add(me.body.foots.left);
        me.mesh.add(me.body.foots.right);
        me.mesh.add(me.body.hands.left);
        me.mesh.add(me.body.hands.right);

        me.body.head.receiveShadow = true;
        me.body.head.castShadow = true;
        me.body.body.receiveShadow = true;
        me.body.body.castShadow = true;
        me.body.foots.left.receiveShadow = true;
        me.body.foots.left.castShadow = true;
        me.body.foots.right.receiveShadow = true;
        me.body.foots.right.castShadow = true;
        me.body.hands.left.receiveShadow = true;
        me.body.hands.left.castShadow = true;
        me.body.hands.right.receiveShadow = true;
        me.body.hands.right.castShadow = true;
    };
};