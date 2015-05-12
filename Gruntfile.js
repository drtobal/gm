/**
 * Archivo de confifuración de grunt para generar el código dentro de la
 * carpeta ./dist
 * 
 * requiere los siguientes paquetes de grunt:
 * npm install grunt grunt-contrib-uglify --save-dev
 * npm install grunt-concat-deps --save-dev
 * npm install grunt-jsdoc@beta --save-dev
 */

var archivos = [
    "src/gm.prefix",
    "src/gm.js",
    "src/*/*.js",
    "src/*.js",
    "src/gm.suffix",
];

module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            main: {
                options: {
                    sourceMap: true,
                    sourceMapName: "dist/gm.min.map",
                    banner: "(function(){\nvar root = this;\n",
                    footer: "\nGm = GM;\n}).call(this);",
                },
                files: {
                    "dist/gm.min.js": [
                        "src/gm.js",
                        "src/*/*.js",
                        "src/*.js",
                    ],
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
                    src: archivos,
                }
            }
        },
        jsdoc: {
            dist: {
                src: archivos,
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
    grunt.registerTask("jsdoc", ["jsdoc"]);
};