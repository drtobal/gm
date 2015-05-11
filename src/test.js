function hola(nombre) {
    console.log("Hola " + nombre);
}

gm.hola = hola;

console.log(gm.hola("asd"));