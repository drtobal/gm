Mesh.Flora.Trunk = new function () {
    this.base = function (geometry) {
        /*             6
         *1  ------ ---
         *  |  xy  | z |
         *   ------ ---
         *         l
         */

        var texture = THREE.ImageUtils.loadTexture('src/textures/flora/trunk.png');
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter;

        var mesh = new THREE.Mesh(
                geometry,
                new THREE.MeshLambertMaterial({
                    transparent: true,
                    opacity: 1,
                    map: texture
                }));
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        return mesh;
    };
    this.vertical = function (geometry) {
        var mesh = this.base(geometry);

        var l = (1 / 6) * 5;
        var faces = {
            y: [
                new THREE.Vector2(l, 0),
                new THREE.Vector2(1, 0),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(l, 1)
            ],
            xz: [
                new THREE.Vector2(0, 0),
                new THREE.Vector2(l, 0),
                new THREE.Vector2(l, 1),
                new THREE.Vector2(0, 1)
            ]
        };

        for (var x in mesh.geometry.faceVertexUvs[0]) {
            if (x % 2 === 0)
                mesh.geometry.faceVertexUvs[0][x] = [faces.xz[0], faces.xz[1], faces.xz[3]];
            else
                mesh.geometry.faceVertexUvs[0][x] = [faces.xz[1], faces.xz[2], faces.xz[3]];
        }

        mesh.geometry.faceVertexUvs[0][4] = mesh.geometry.faceVertexUvs[0][6] = [faces.y[3], faces.y[0], faces.y[2]];
        mesh.geometry.faceVertexUvs[0][5] = mesh.geometry.faceVertexUvs[0][7] = [faces.y[0], faces.y[1], faces.y[2]];

        return mesh;
    };
    this.horizontal = function (geometry) {
        var mesh = this.base(geometry);
        var l = (1 / 6) * 5;
        var faces = {
            xy: [
                new THREE.Vector2(0, 0),
                new THREE.Vector2(l, 0),
                new THREE.Vector2(l, 1),
                new THREE.Vector2(0, 1)
            ],
            z: [
                new THREE.Vector2(l, 0),
                new THREE.Vector2(1, 0),
                new THREE.Vector2(1, 1),
                new THREE.Vector2(l, 1)
            ]
        };

        //left - right
        mesh.geometry.faceVertexUvs[0][0] = mesh.geometry.faceVertexUvs[0][2] = [faces.z[3], faces.z[0], faces.z[2]];
        mesh.geometry.faceVertexUvs[0][1] = mesh.geometry.faceVertexUvs[0][3] = [faces.z[0], faces.z[1], faces.z[2]];

        for (var x = 4; x < 12; x++) {
            if (x % 2 === 0)
                mesh.geometry.faceVertexUvs[0][x] = [faces.xy[3], faces.xy[0], faces.xy[2]];
            else
                mesh.geometry.faceVertexUvs[0][x] = [faces.xy[0], faces.xy[1], faces.xy[2]];
        }

        return mesh;
    };
};