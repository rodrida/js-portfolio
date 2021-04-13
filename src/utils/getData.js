// const API = 'https://randomuser.me/api/';

// ahora la API la vamos a leer directamente de las variables de entorno
const API = process.env.API;

// de esta manera estamos protegiendo la url de nuestra API que puede ser privada ó las credenciales que
// se utilicen para conectarnos a recursos

const getData = async (id) => {
  const apiURl = id ? `${API}${id}` : API;
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    console.log('Fetch Error', error);
  };
};

export default getData;