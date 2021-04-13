// Este script nos va a ayudar a crear las variables de entorno dentro del servidor y de esta forma poder
// leer este recurso.

// NOTA: Este script va a correr sobre node.

// instanciamos a fs (file system) para guardar ó enviar datos según sea el caso, en archivos que podamos
// escribir en nuestra computadora
const fs = require('fs');

// estamos escribiendo un archivo .env dentro del servidor
fs.writeFileSync('./.env', `API=${process.env.API}\n`);

// NOTA: process.env.API -> debemos asignarla en Netlify para que tenga está variable, en Deploy settings,
// Environment, damos click a la sección Edit variables (establecemos: API, https://randomuser.me/api/) y
// damos click en Save

// Adicionalmente tenemos que ejecutar este script antes del build, por lo tanto, modificamos el script build
// en el archivo package.json de una manera anidada.