// Este archivo de configuración tendra sólamente las configuraciones del modo desarrollo.
// No necesitamos optimizar en modo desarrollo. 

// Este es el archivo de configuración de webpack, y representa nuestro recurso principal
// aquí es donde va a vivir toda esa configuración que nosotros vamos a realizar para nuestro proyecto

// Instanciamos nuestros módulos de node
// path ya esta disponible en node, por lo tanto, no hay que realizar una instalación de dependencias
const path = require('path');
// añadimos el recurso de HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
// añadimos el recurso MiniCSS
const MiniCssExtractPligin = require('mini-css-extract-plugin');
// añadimos el soporte para CopyWebpack
const CopyPlugin = require('copy-webpack-plugin');
// añadimos el soporte para las variables de entorno
const Dotenv = require('dotenv-webpack');

// vamos a crear un módulo que vamos a exportar con un objeto con la configuración deseada
module.exports = {
    // aquí añadimos todas estas configuraciones
    // la primera configuración es entry, que nos permite decir cuál es el punto de entrada de nuestra aplicación
    entry: './src/index.js',
    // output es hacia donde vamos a enviar lo que va a preparar webpack (la carpeta por default es dist)
    output: {
        // añadimos los elementos internos para trabajar
        // lo primero va ser path, para tener el uso de resolve que nos va a permitir saber donde se encuentra
        // nuestro proyecto y poderlo utilizar (se garantiza que siempre va a encontrar la carpeta donde se ubica el proyecto)
        path: path.resolve(__dirname, 'dist'),
        // podemos establecer un nombre al archivo js resultante que se va a unificar en la carpeta dist
        // filename: 'main.js',
        // ó las buenas prácticas dictan que utilicemos Hashes en nuestros archivos (es un identificador por cada cambio en el archivo)
        filename: '[name].[contenthash].js',
        // para insertar nuestras imagenes en una carpeta y que utilicen un hash, la extensión y la query
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    // desde el archivo podemos decirle que configuración (modo desarrollo ó modo producción) nos active
    mode: 'development',
    // vamos a activar el modo Watch, nos permite estar escuchando los cambios de nuestro proyecto
    // y se compile de forma automática (cuando en la terminal utilizamos el modo desarrollo, la terminal
    // no nos deja escribir un nuevo comando, se queda esperando los cambios que hagamos en el código
    // para compilar el proyecto nuevamente)
    // NOTA: Una alternativa para activar el modo Watch, es creando un nuevo script en el archivo package.json
    watch: true,
    // con que extensiones vamos a trabajar en este proyecto
    resolve: {
        // en un array definimos las extensiones
        extensions: ['.js'],
        // creamos nuestro apartado de Alias
        alias: {
            // aquí establecemos cada uno de nuestros Alias
            // @ nos permite identificarlo como un Alias y especificamos la ruta que estamos trabajando
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    // primero debemos crear el archivo .babelrc
    // ahora añadimos la configuración de Babel a webpack
    module: {
        // definimos las reglas
        rules: [
            {
                // este objeto es para trabajar con babel-loader
                // test nos permite saber que tipo de extensiones vamos a utilizar (es una expresión regular)
                // en este caso nos dice, utiliza cualquier extensión .mjs ó .js
                // NOTA: La extensión .mjs es la de módulos
                test: /\.m?js$/,
                // excluimos la carpeta node_modules
                exclude: /node_modules/,
                // pasamos internamente el loader a utilizar
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // definimos la regla para poder reconocer archivos CSS
                // expresión regular para poder reconocer los archivos CSS y los archivos stylus
                test: /\.css|.styl$/i,
                // pasamos internamente los loader a utilizar
                use: [MiniCssExtractPligin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                // definimos la regla para poder reconocer archivos PNG
                test: /\.png/,
                // con type tenemos la capacidad de importar los recursos, en nuestro caso, 
                // importar las imágenes .png en el archivo Template.js y así utilizar las buenas prácticas
                type: 'asset/resource'
            },
            {
                // trabajamos directamente con nuestras fonts (woff y woff2)
                // definimos la regla para poder reconocer archivos woff y woff2
                test: /\.(woff|woff2)$/,
                // pasamos internamente el loader a utilizar
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'aplication/font-woff',
                        // que respete el nombre del archivo, habilitamos el Hash y que respete la extensión que tiene el archivo
                        name: '[name].[contenthash].[ext]',
                        outputPath: './assets/fonts/',
                        // ahora nuestro archivo main.hash.css se encuentra dentro de la carpeta assets en la carpeta dist
                        // por esa razón, regresamos un nivel hacia atras para que consuma correctamente las fonts
                        publicPath: '../assets/fonts',
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        // aquí añadimos los plugins que estemos utilizando
        // añadimos el plugin de HTML
        new HtmlWebpackPlugin({
            // aquí le pasamos un objeto con las configuraciones que vamos a añadir a este plugin
            inject: true,
            template: './public/index.html',
            // aquí se define el nombre del archivo HTML resultante en la carpeta dist
            filename: './index.html'
        }),
        // añadimos el plugin de CSS y le pasamos un objeto configuración para colocar en una carpeta 
        // el archivo CSS resultante y habilitar el Hash
        new MiniCssExtractPligin({
            filename: 'assets/[name].[contenthash].css'
        }),
        // añadimos el plugin de CopyWebpack
        new CopyPlugin({
            // aquí pasamos la configuración que vamos a requerir, cuales son los elementos que vamos a utilizar
            patterns: [
                {
                    // aquí decimos donde se encuentra la carpeta con los archivos que vamos a mover ó copiar
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    // la carpeta anterior estará dentro de dist y decimos como se va a ubicar en dist
                    to: 'assets/images'
                }
            ]
        }),
        // añadimos el plugin de dotenv-webpack
        new Dotenv()
    ]
}

// Instalamos unas dependencias de desarrollo adicionales
// con la instalación de Babel preparamos nuestro código js para que sea compatible con todos los navegadores
// estando posicionados en la carpeta del proyecto,
// ejecutamos en la terminal: npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

// instalamos el plugin necesario para la configuración de webpack para trabajar con HTML
// ejecutamos en la terminal: npm install html-webpack-plugin -D

// instalamos las dependencias para trabajar con CSS
// ejecutamos en la terminal: npm install mini-css-extract-plugin css-loader -D

// instalamos el loader para el pre-procesador de stylus
// ejecutamos en la terminal: npm install stylus stylus-loader -D

// instalamos el plugin que nos permite realizar la copia de archivos de nuestra carpeta src hacia la
// carpeta distribution (dist)
// ejecutamos en la terminal: npm install copy-webpack-plugin -D

// instalamos 2 recursos que nos van a ayudar a leer archivos y también a moverlos según sea el caso
// ejecutamos en la terminal: npm install url-loader file-loader -D

// para trabajar la parte de optimización en minificación de archivos CSS y js
// ejecutamos en la terminal: npm install css-minimizer-webpack-plugin terser-webpack-plugin -D

// instalamos una dependencia que nos va a ayudar a poder trabajar con las variables de entorno
// ejecutamos en la terminal: npm install dotenv-webpack -D

// Al finalizar este archivo, vamos a ir a la terminal y
// ejecutamos: npx webpack --mode production --config webpack.config.js

// NOTA: Para hacer más amigable la ejecución del comando anterior, podemos crear un script en el archivo
// package.json y ahora solamente ejecutamos en la terminal: npm run build
// adicionalmente agregamos otro script que se llama dev y que utiliza el modo desarrollo,
// ejecutamos en la terminal: npm run dev