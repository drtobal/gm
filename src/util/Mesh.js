/**
 * Posee métodos para facilitar la construccion de meshes
 * @class Mesh
 * @memberOf Util
 */
Util.Mesh = new function () {
    
    /**
     * Realiza un mapa de un ortoedro o cubo para su texturizado, este método no retorna un objeto ya que se
     * modifica directamente la instancia de argumento
     * @method Util.Mesh.cuboidMap
     * @param {Object} args objeto a modificiar
     * @param {THREE.BoxGeometry} args.geometry geometría del objeto
     */
    this.cuboidMap = function (args) {
        /*
         * args
         * geometry: geometria
         * dimensions: ya: .33, yb: .66
         *              xa: .25, xb: .5, xc: .75
         * faces
         *
         *   0      .25      .5    .75     1
         * 1          --------
         *           | top    |
         *.66 ------- -------- ------ ------ yb
         *   | right | front  | left | back |
         *.33 ------- -------- ------ ------ ya
         *           | bottom |
         * 0          --------
         *           xa       xb     xc
         */

        var dimensions, faces;

        if (typeof args.faces === 'undefined') {
            dimensions = {
                ya: 1 / 3,
                yb: (1 / 3) * 2,
                xa: .25,
                xb: .5,
                xc: .75
            };

            Util.Object.extend(dimensions, args.dimensions);

            faces = {
                left: [
                    new THREE.Vector2(dimensions.xb, dimensions.ya),
                    new THREE.Vector2(dimensions.xc, dimensions.ya),
                    new THREE.Vector2(dimensions.xc, dimensions.yb),
                    new THREE.Vector2(dimensions.xb, dimensions.yb)
                ],
                right: [
                    new THREE.Vector2(0, dimensions.ya),
                    new THREE.Vector2(dimensions.xa, dimensions.ya),
                    new THREE.Vector2(dimensions.xa, dimensions.yb),
                    new THREE.Vector2(0, dimensions.yb)
                ],
                top: [
                    new THREE.Vector2(dimensions.xa, dimensions.yb),
                    new THREE.Vector2(dimensions.xb, dimensions.yb),
                    new THREE.Vector2(dimensions.xb, 1),
                    new THREE.Vector2(dimensions.xa, 1)
                ],
                bottom: [
                    new THREE.Vector2(dimensions.xa, 0),
                    new THREE.Vector2(dimensions.xb, 0),
                    new THREE.Vector2(dimensions.xb, dimensions.ya),
                    new THREE.Vector2(dimensions.xa, dimensions.ya)
                ],
                front: [
                    new THREE.Vector2(dimensions.xa, dimensions.ya),
                    new THREE.Vector2(dimensions.xb, dimensions.ya),
                    new THREE.Vector2(dimensions.xb, dimensions.yb),
                    new THREE.Vector2(dimensions.xa, dimensions.yb)
                ],
                back: [
                    new THREE.Vector2(dimensions.xc, dimensions.ya),
                    new THREE.Vector2(1, dimensions.ya),
                    new THREE.Vector2(1, dimensions.yb),
                    new THREE.Vector2(dimensions.xc, dimensions.yb)
                ]
            };
        } else
            faces = args.faces;

        //left
        args.geometry.faceVertexUvs[0][0] = [faces.left[3], faces.left[0], faces.left[2]];
        args.geometry.faceVertexUvs[0][1] = [faces.left[0], faces.left[1], faces.left[2]];

        //right
        args.geometry.faceVertexUvs[0][2] = [faces.right[3], faces.right[0], faces.right[2]];
        args.geometry.faceVertexUvs[0][3] = [faces.right[0], faces.right[1], faces.right[2]];

        //top
        args.geometry.faceVertexUvs[0][4] = [faces.top[3], faces.top[0], faces.top[2]];
        args.geometry.faceVertexUvs[0][5] = [faces.top[0], faces.top[1], faces.top[2]];

        //bottom
        args.geometry.faceVertexUvs[0][6] = [faces.bottom[3], faces.bottom[0], faces.bottom[2]];
        args.geometry.faceVertexUvs[0][7] = [faces.bottom[0], faces.bottom[1], faces.bottom[2]];

        //front
        args.geometry.faceVertexUvs[0][8] = [faces.front[3], faces.front[0], faces.front[2]];
        args.geometry.faceVertexUvs[0][9] = [faces.front[0], faces.front[1], faces.front[2]];

        //back
        args.geometry.faceVertexUvs[0][10] = [faces.back[3], faces.back[0], faces.back[2]];
        args.geometry.faceVertexUvs[0][11] = [faces.back[0], faces.back[1], faces.back[2]];
    };
};