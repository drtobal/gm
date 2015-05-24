window.onload = function () {
    Gm.World.createWorld = createWorld;
    Gm.start();

    function createWorld(world, scene) {
        //*************************
        //WORLD
        //*************************
        var textures = [
            THREE.ImageUtils.loadTexture("src/textures/flora/grass-block-xp.png"),
            THREE.ImageUtils.loadTexture("src/textures/flora/grass-block-xn.png"),
            THREE.ImageUtils.loadTexture("src/textures/flora/grass-block-yp.png"),
            THREE.ImageUtils.loadTexture("src/textures/flora/grass-block-yn.png"),
            THREE.ImageUtils.loadTexture("src/textures/flora/grass-block-zp.png"),
            THREE.ImageUtils.loadTexture("src/textures/flora/grass-block-zn.png")
        ];

        textures.forEach(function (tex) {
            tex.magFilter = THREE.NearestFilter;
            tex.minFilter = THREE.LinearMipMapLinearFilter;
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        });

        var cubeMaterialArray = [
            new THREE.MeshBasicMaterial({map: textures[0]}),
            new THREE.MeshBasicMaterial({map: textures[1]}),
            new THREE.MeshBasicMaterial({map: textures[2]}),
            new THREE.MeshBasicMaterial({map: textures[3]}),
            new THREE.MeshBasicMaterial({map: textures[4]}),
            new THREE.MeshBasicMaterial({map: textures[5]})
        ];

        // order to add materials: x+,x-,y+,y-,z+,z-
        var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);

        var ground = new THREE.Mesh(new THREE.BoxGeometry(300, 10, 300), cubeMaterials);

        textures[0].repeat.set(30, 1);
        textures[1].repeat.set(30, 1);
        textures[2].repeat.set(30, 30);
        textures[3].repeat.set(30, 30);
        textures[4].repeat.set(30, 1);
        textures[5].repeat.set(30, 1);

        ground.position.y = -5;
        //ground.receiveShadow = true;
        scene.add(ground);
        world.colliders.push(ground);

        var trunk = Gm.Mesh.Flora.Trunk.horizontal(new THREE.BoxGeometry(50, 10, 10));
        trunk.position.z = -30;
        trunk.position.y = 5;
        scene.add(trunk);
        world.colliders.push(trunk);

        var tree = Gm.Mesh.Flora.Tree();
        tree.position.z = 80;
        tree.position.y = 25;
        scene.add(tree);
        world.colliders.push(tree);

        //*************************
        //LIGHTS
        //*************************

        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        //hemiLight.color.setHSV(0.6, 0.75, 0.5);
        //hemiLight.groundColor.setHSV(0.095, 0.5, 0.5);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);

        var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(15, 10, 15);
        dirLight.position.multiplyScalar(50);
        dirLight.name = "dirlight";
        dirLight.shadowCameraVisible = true;

        scene.add(dirLight);

        dirLight.castShadow = true;
        dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024 * 2;

        var d = 200;

        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;

        dirLight.shadowCameraFar = 3500;
        dirLight.shadowBias = -0.0001;
        dirLight.shadowDarkness = 0.35;
    }
};