// ============================================================
// Banco de preguntas
// "correcta" es el índice (0-3) de la opción correcta.
// Para agregar o modificar preguntas, edita solo este arreglo.
// ============================================================
const preguntas = [
  {
    texto: "¿Qué es el Internet de las Cosas (IoT)?",
    opciones: [
      "Un tipo de navegador web para dispositivos móviles",
      "La red de objetos físicos con sensores, software y conectividad que intercambian datos por Internet",
      "Un lenguaje de programación para robots",
      "Una red social para compartir fotos de objetos"
    ],
    correcta: 1,
    explicacion: "IoT es la red de objetos físicos que incorporan sensores, software y conectividad para recopilar e intercambiar datos a través de Internet."
  },
  {
    texto: "¿Quién acuñó el término “Internet de las Cosas” y en qué año?",
    opciones: [
      "Tim Berners-Lee, en 1989",
      "Bill Gates, en 1995",
      "Kevin Ashton, en 1999",
      "Steve Jobs, en 2007"
    ],
    correcta: 2,
    explicacion: "Kevin Ashton acuñó el término en 1999 mientras trabajaba en el MIT con tecnología RFID."
  },
  {
    texto: "¿Qué componente de un sistema IoT se encarga de captar información del entorno, como la temperatura o el movimiento?",
    opciones: [
      "Los sensores",
      "Los actuadores",
      "La interfaz de usuario",
      "La plataforma en la nube"
    ],
    correcta: 0,
    explicacion: "Los sensores miden variables físicas del entorno y las convierten en datos. Es la primera etapa: la captura."
  },
  {
    texto: "¿Cuál es la función de un actuador?",
    opciones: [
      "Almacenar grandes volúmenes de datos",
      "Traducir protocolos entre dispositivos y la nube",
      "Asignar una dirección IP a cada dispositivo",
      "Realizar una acción física, como encender una luz o abrir una válvula"
    ],
    correcta: 3,
    explicacion: "Los actuadores ejecutan acciones físicas en respuesta a los datos, por ejemplo encender una luz, abrir una válvula o mover un motor."
  },
  {
    texto: "¿Qué tecnología de conectividad está pensada para enviar pocos datos a largas distancias con muy bajo consumo de energía?",
    opciones: [
      "Bluetooth",
      "LoRaWAN",
      "Cable HDMI",
      "USB"
    ],
    correcta: 1,
    explicacion: "LoRaWAN está diseñada para largas distancias y bajo consumo. Bluetooth, en cambio, se usa para distancias cortas."
  },
  {
    texto: "¿Qué es el edge computing (computación en el borde)?",
    opciones: [
      "Un tipo de sensor de movimiento",
      "Una red social para dispositivos",
      "Procesar los datos cerca del dispositivo para reducir la latencia",
      "Un método para apagar dispositivos a distancia"
    ],
    correcta: 2,
    explicacion: "El edge computing procesa la información cerca del dispositivo, en lugar de enviarla toda a la nube, lo que reduce la latencia."
  },
  {
    texto: "¿Cuál es la función principal de un gateway (pasarela) en IoT?",
    opciones: [
      "Servir de puente entre los dispositivos y la nube, traduciendo protocolos",
      "Medir la humedad del suelo",
      "Mostrar los datos al usuario en una aplicación móvil",
      "Generar energía para los sensores"
    ],
    correcta: 0,
    explicacion: "El gateway actúa como puente entre los dispositivos y la nube y traduce los distintos protocolos de comunicación."
  },
  {
    texto: "En el Internet Industrial de las Cosas (IIoT), ¿qué es el mantenimiento predictivo?",
    opciones: [
      "Reparar las máquinas solo cuando se rompen",
      "Reemplazar todas las máquinas cada año",
      "Apagar las máquinas durante la noche",
      "Detectar fallas en las máquinas antes de que ocurran"
    ],
    correcta: 3,
    explicacion: "El mantenimiento predictivo usa los datos de los sensores para anticipar fallas en las máquinas antes de que sucedan."
  },
  {
    texto: "¿Cuál de las siguientes es una DESVENTAJA del IoT?",
    opciones: [
      "La automatización de tareas repetitivas",
      "El monitoreo y control a distancia",
      "Las vulnerabilidades de seguridad en dispositivos con contraseñas débiles",
      "El ahorro de energía y recursos"
    ],
    correcta: 2,
    explicacion: "Las vulnerabilidades de seguridad son una desventaja. Las demás opciones aparecen en la investigación como ventajas."
  },
  {
    texto: "¿Qué ejemplo real muestra los riesgos de seguridad del IoT?",
    opciones: [
      "El termostato Google Nest",
      "La botnet Mirai de 2016",
      "El reloj Apple Watch",
      "El alumbrado inteligente de Barcelona"
    ],
    correcta: 1,
    explicacion: "La botnet Mirai (2016) infectó cámaras y routers con contraseñas predeterminadas para lanzar ataques masivos."
  }
];

// ============================================================
// Referencias al DOM
// ============================================================
const formulario = document.getElementById("formulario");
const contenedorPreguntas = document.getElementById("preguntas");
const aviso = document.getElementById("aviso");
const seccionResultados = document.getElementById("resultados");
const puntaje = document.getElementById("puntaje");
const mensaje = document.getElementById("mensaje");
const detalle = document.getElementById("detalle");
const botonCalificar = formulario.querySelector("button[type='submit']");
const botonReintentar = document.getElementById("reintentar");

// ============================================================
// Mostrar las preguntas
// ============================================================
function mostrarPreguntas() {
  contenedorPreguntas.innerHTML = preguntas.map((p, i) => `
    <fieldset class="pregunta" id="pregunta-${i}">
      <legend>${i + 1}. ${p.texto}</legend>
      ${p.opciones.map((opcion, j) => `
        <label class="opcion">
          <input type="radio" name="p${i}" value="${j}">
          <span>${opcion}</span>
        </label>
      `).join("")}
    </fieldset>
  `).join("");
}

// Devuelve el índice elegido en la pregunta i, o null si no respondió
function respuestaDe(i) {
  const marcada = formulario.querySelector(`input[name="p${i}"]:checked`);
  return marcada ? Number(marcada.value) : null;
}

// ============================================================
// Calificar
// ============================================================
function calificar(evento) {
  evento.preventDefault();

  const respuestas = preguntas.map((_, i) => respuestaDe(i));

  // Verificar que todas estén respondidas
  const faltantes = [];
  respuestas.forEach((r, i) => {
    const fieldset = document.getElementById(`pregunta-${i}`);
    fieldset.classList.toggle("sin-responder", r === null);
    if (r === null) faltantes.push(i + 1);
  });

  if (faltantes.length > 0) {
    aviso.textContent = `Te faltan por responder las preguntas: ${faltantes.join(", ")}.`;
    aviso.hidden = false;
    document.getElementById(`pregunta-${faltantes[0] - 1}`).scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  aviso.hidden = true;

  // Contar aciertos y marcar opciones
  let aciertos = 0;
  respuestas.forEach((r, i) => {
    const p = preguntas[i];
    const opciones = document.querySelectorAll(`#pregunta-${i} .opcion`);
    opciones[p.correcta].classList.add("es-correcta");
    if (r === p.correcta) aciertos++;
    else opciones[r].classList.add("es-incorrecta");
  });

  // Bloquear el formulario
  formulario.querySelectorAll("input").forEach(input => input.disabled = true);
  botonCalificar.disabled = true;

  mostrarResultados(respuestas, aciertos);
}

// ============================================================
// Mostrar resultados
// ============================================================
function mostrarResultados(respuestas, aciertos) {
  const total = preguntas.length;
  const porcentaje = Math.round((aciertos / total) * 100);

  puntaje.textContent = `${aciertos} / ${total} (${porcentaje}%)`;
  mensaje.textContent =
    porcentaje === 100 ? "¡Excelente! Dominas el tema." :
    porcentaje >= 70   ? "¡Muy bien! Tienes buenos conocimientos sobre IoT." :
    porcentaje >= 50   ? "Vas por buen camino. Repasa los temas en los que fallaste." :
                         "Te recomendamos leer de nuevo la investigación e intentarlo otra vez.";

  detalle.innerHTML = preguntas.map((p, i) => {
    const esCorrecta = respuestas[i] === p.correcta;
    return `
      <div class="resultado ${esCorrecta ? "correcta" : "incorrecta"}">
        <h4>${i + 1}. ${p.texto}</h4>
        <p class="etiqueta">${esCorrecta ? "✔ Correcta" : "✘ Incorrecta"}</p>
        <p><strong>Tu respuesta:</strong> ${p.opciones[respuestas[i]]}</p>
        ${esCorrecta ? "" : `<p><strong>Respuesta correcta:</strong> ${p.opciones[p.correcta]}</p>`}
        <p class="explicacion">${p.explicacion}</p>
      </div>
    `;
  }).join("");

  seccionResultados.hidden = false;
  seccionResultados.scrollIntoView({ behavior: "smooth" });
}

// ============================================================
// Reiniciar
// ============================================================
function reiniciar() {
  formulario.reset();
  mostrarPreguntas();
  botonCalificar.disabled = false;
  aviso.hidden = true;
  seccionResultados.hidden = true;
  document.getElementById("cuestionario").scrollIntoView({ behavior: "smooth" });
}

// ============================================================
// Inicio
// ============================================================
mostrarPreguntas();
formulario.addEventListener("submit", calificar);
botonReintentar.addEventListener("click", reiniciar);
