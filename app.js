window.addEventListener('load',getDatos);

async function getDatos(){
    const nasa_clave = 'z9uSiKxjggAVhfeWWwhv9JNOA9hXvtX1Qcah6vwg';
    const nasa_ruta =  `https://api.nasa.gov/planetary/apod?api_key=${nasa_clave}`;

    try {
        const response = await fetch(nasa_ruta);
        const results = await response.json();
        showResultados(results);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    
}

function showResultados({title, media_type, url, explanation, date}){
    const titulo = document.querySelector('#titulo');
    titulo.innerHTML = 'W'+title;
    
    const multimedia = document.querySelector('#multimedia');
    if(media_type == 'video'){
      multimedia.innerHTML = `
      <iframe class="embed-responsive-item" src="${url}"></iframe`;
    }else{
      multimedia.innerHTML = `
      <img class="img-fluid img-dia" src="${url}" alt="${url}">`;

          // Agregar botón de descarga
        const botonDescargar = document.createElement('button');
        botonDescargar.innerText = 'Ver imagen';
        botonDescargar.classList.add('btn_ver');
        botonDescargar.addEventListener('click', () => {
            descargarImagen(url, title);
        });
        multimedia.appendChild(botonDescargar);

    }
    
    const explicacion = document.querySelector('#explicacion');
    explicacion.innerHTML = explanation;
  
    const fecha = document.querySelector('#fecha');
    const fechaObtenida = new Date(date);
    const diaSemana = fechaObtenida.toLocaleString('es-ES', { weekday: 'long' });
    const dia = fechaObtenida.getDate();
    const mes = fechaObtenida.toLocaleString('es-ES', { month: 'long' });
    const anio = fechaObtenida.getFullYear();
    const fechaFormateada = `${diaSemana} ${dia} de ${mes} del ${anio}`;
    fecha.innerHTML = fechaFormateada;

  }
  
  function descargarImagen(url, title) {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.target = '_blank';

    link.click();
  }
  