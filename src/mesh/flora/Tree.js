Mesh.Flora.Tree = function () {
    var mesh = new THREE.Object3D();
    var trunk = meshes.flora.trunk.vertical(new THREE.BoxGeometry(10, 50, 10));

    var textures = [
        THREE.ImageUtils.loadTexture('src/textures/flora/leaves.png'),
        THREE.ImageUtils.loadTexture('src/textures/flora/leaves.png'),
        THREE.ImageUtils.loadTexture('src/textures/flora/leaves.png'),
        THREE.ImageUtils.loadTexture('src/textures/flora/leaves.png'),
        THREE.ImageUtils.loadTexture('src/textures/flora/leaves.png'),
        THREE.ImageUtils.loadTexture('src/textures/flora/leaves.png')
    ];

    textures.forEach(function (tex) {
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.LinearMipMapLinearFilter;
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    });

    var cubeMaterialArray = [
        new THREE.MeshLambertMaterial({map: textures[0], transparent: true, opacity: 1}),
        new THREE.MeshLambertMaterial({map: textures[1], transparent: true, opacity: 1}),
        new THREE.MeshLambertMaterial({map: textures[2], transparent: true, opacity: 1}),
        new THREE.MeshLambertMaterial({map: textures[3], transparent: true, opacity: 1}),
        new THREE.MeshLambertMaterial({map: textures[4], transparent: true, opacity: 1}),
        new THREE.MeshLambertMaterial({map: textures[5], transparent: true, opacity: 1})
    ];

    var leaves = new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshFaceMaterial(cubeMaterialArray));
    leaves.position.y = 40;

    textures[0].repeat.set(4, 4);
    textures[1].repeat.set(4, 4);
    textures[2].repeat.set(4, 4);
    textures[3].repeat.set(4, 4);
    textures[4].repeat.set(4, 4);
    textures[5].repeat.set(4, 4);

    mesh.add(trunk);
    mesh.add(leaves);
    leaves.receiveShadow = true;
    leaves.castShadow = true;

    return mesh;
};