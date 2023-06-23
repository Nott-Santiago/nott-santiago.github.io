window.addEventListener('load', getDatos);

const nasa_clave = 'z9uSiKxjggAVhfeWWwhv9JNOA9hXvtX1Qcah6vwg';

async function getDatos() {
    
    const nasa_ruta = `https://api.nasa.gov/planetary/apod?api_key=${nasa_clave}`;

  try {
    const response = await fetch(nasa_ruta);
    const results = await response.json();
    showResultados(results);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

async function buscarImagenPorFecha(fechaInput) {
    const nasa_ruta = `https://api.nasa.gov/planetary/apod?api_key=${nasa_clave}&date=${fechaInput}`;
  
    try {
      const response = await fetch(nasa_ruta);
      const result = await response.json();
      showResultados(result);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }
  

document.querySelector('#formBusc').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario
  
    const fechaInput = document.querySelector('#fecha-input').value;
    console.log('fechaInput: '+fechaInput);

    buscarImagenPorFecha(fechaInput);
  });


function showResultados({ title, media_type, url, explanation, date }) {
  const titulo = document.querySelector('#titulo');
  titulo.innerHTML = title;

  const multimedia = document.querySelector('#multimedia');
  if (media_type == 'video') {
    showVideo(url);
  } else {
    showImagen(url, title);
  }

  const explicacion = document.querySelector('#explicacion');
  explicacion.innerHTML = explanation;

  const fecha = document.querySelector('#fecha');
  const fechaObtenida = new Date(date);
  console.log(fechaObtenida);
  const diaSemana = fechaObtenida.toLocaleString('es-ES', { weekday: 'long' });
  const dia = fechaObtenida.getDate();
  const mes = fechaObtenida.toLocaleString('es-ES', { month: 'long' });
  const anio = fechaObtenida.getFullYear();
  const fechaFormateada = `${diaSemana} ${dia} de ${mes} del ${anio}`;
  fecha.innerHTML = fechaFormateada;
}

function showVideo(url) {
  const multimedia = document.querySelector('#multimedia');
  multimedia.innerHTML = `
    <iframe class="embed-responsive-item" src="${url}"></iframe`;

}

function showImagen(url, title) {
  const multimedia = document.querySelector('#multimedia');
  multimedia.innerHTML = `
    <img class="img-fluid img-dia" src="${url}" alt="${url}">`;

  const btn_verFoto = crearBtnVer(url, 'Ver imagen', title);
  multimedia.appendChild(btn_verFoto);
}

function crearBtnVer(url, texto, tituloImg) {
  const btn_verFoto = document.createElement('button');
  btn_verFoto.innerText = texto;
  btn_verFoto.classList.add('btn_ver');
  btn_verFoto.classList.add('btn')
  btn_verFoto.addEventListener('click', () => {
    verImg(url, tituloImg);
  });
  return btn_verFoto;
}

function verImg(url, tituloImg) {
  const link = document.createElement('a');
  link.href = url;
  link.download = tituloImg;
  link.target = '_blank';
  link.click();
}
