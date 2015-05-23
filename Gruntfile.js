/**
 * Archivo de confifuración de grunt para generar el código dentro de la
 * carpeta ./dist
 * 
 * requiere los siguientes paquetes de grunt:
 * npm install grunt grunt-contrib-uglify --save-dev
 * npm install grunt-concat-deps --save-dev
 * npm install grunt-jsdoc@beta --save-dev
 */

module.exports = function (grunt) {

    var archivos = [
        "src/utils/*.js",
        "src/gm.js",
        "src/*.js",
        "src/*/*.js",
        "src/*/*/*.js",
    ];

    var archivosB = [
        "src/gm.prefix",
        "src/utils/*.js",
        "src/gm.js",
        "src/*.js",
        "src/*/*.js",
        "src/*/*/*.js",
        "src/gm.suffix",
    ];

    grunt.initConfig({
        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: "dist/gm.min.map",
                    banner: "(function(){\nvar root = this;\n",
                    footer: "}).call(this);",
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
                },
                files: {
                    src: archivosB,
                }
            }
        },
        jsdoc: {
            dist: {
                src: archivosB,
                options: {
                    destination: 'doc',
                },
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-concat-deps");
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask("default", ["uglify", "concat_deps", "jsdoc"]);
    grunt.registerTask("dist", ["uglify", "concat_deps"]);
    grunt.registerTask("doc", ["jsdoc"]);
};