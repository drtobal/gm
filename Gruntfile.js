/**
 * Archivo de confifuración de grunt para generar el código dentro de la
 * carpeta ./dist
 * 
 * requiere los siguientes paquetes de grunt:
 * npm install grunt grunt-contrib-uglifyjs --save-dev
 * npm install grunt-concat-deps --save-dev
 */

module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: "dist/gm.min.map",
                    wrap: "gm",
                },
                files: {
                    "dist/gm.min.js": [
                        "src/gm.js",
                        "src/*.js",
                    ]
                }
            }
        },
        concat_deps: {
            main: {
                options: {
                    separator: "\n\n",
                    intro: "src/gm.prefix",
                    outro: "src/gm.suffix",
                    out: "dist/gm.js",
                },
                files: {
                    src: [
                        "src/gm.js",
                        "src/*.js",
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-concat-deps");
    grunt.registerTask("default", ["uglify", "concat_deps"]);
};