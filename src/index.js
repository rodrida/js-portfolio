// Podemos tener está situación:
// import '../../../';
// se vuelven direcciones que aveces desconocemos donde realmente está ubicado nuestro recurso, lo anterior
// se resuelve utilizando Alias, que permite identificar de mejor manera nuestro recurso

// Antes los haciamos así:
// import Template from './templates/Template.js';
// importamos nuestros estilos directamente en mi archivo js principal, index.js
// import './styles/main.css';
// importamos nuestro archivo stylus
// import './styles/vars.styl';

// Ahora lo hacemos así:
import Template from '@templates/Template.js';
// importamos nuestros estilos directamente en mi archivo js principal, index.js
import '@styles/main.css';
// importamos nuestro archivo stylus
import '@styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();