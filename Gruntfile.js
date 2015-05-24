/**
 * Archivo de confifuración de grunt para generar el código dentro de la
 * carpeta ./dist
 * 
 * requiere los siguientes paquetes de grunt:
 * npm install grunt grunt-contrib-uglify --save-dev
 * npm install grunt-concat-deps --save-dev
 * npm install grunt-jsdoc --save-dev
 * npm install --save-dev minami    // template para JSDoc
 */

module.exports = function (grunt) {

    var archivos = [
        "src/util/Util.js",
        "src/util/Object.js",
        "src/util/**/*.js",
        "src/gm.js",
        "src/core/**/*.js",
        "src/mesh/Mesh.js",
        "src/mesh/Mesh/flora/Trunk.js",
        "src/mesh/**/*.js",
        "src/Actor/*.js",
    ];

    grunt.initConfig({
        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: "dist/gm.min.map",
                    banner: "(function(){",
                    footer: "\n}).call(this);",
                },
                files: {
                    "dist/gm.min.js": archivos,
                }
            }
        },
        concat_deps: {
            main: {
                options: {
                    separator: "\n\n",
                    out: "dist/gm.js",
                    intro: "src/gm.prefix",
                    outro: "src/gm.suffix",
                },
                files: {
                    src: archivos,
                }
            }
        },
        jsdoc: {
            dist: {
                src: archivos,
                options: {
                    destination: "doc",
                    "template": "node_modules/minami"
                },
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-concat-deps");
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask("default", ["uglify", "concat_deps", "jsdoc"]);
    grunt.registerTask("dist", ["uglify", "concat_deps"]);
    grunt.registerTask("ugly", ["uglify"]);
    grunt.registerTask("doc", ["jsdoc"]);
};