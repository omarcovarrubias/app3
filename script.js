const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const boton = document.getElementById('capturar');
const resultado = document.getElementById('resultado');
const ctx = canvas.getContext('2d');

// Activar cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("No se pudo acceder a la cámara");
  });

// Tomar foto y detectar texto
boton.addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0);

  resultado.textContent = "Procesando imagen... ⏳";

  Tesseract.recognize(
    canvas,
    'spa', // idioma español
    { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    resultado.textContent = text;
  }).catch(err => {
    resultado.textContent = "Error al detectar texto";
  });
});
