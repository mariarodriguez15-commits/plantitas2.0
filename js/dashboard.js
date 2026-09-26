const datosCultivos = {
    Cultivo1: [
      { nombre: "Sensor A", tipo: "Temperatura", estado: "Activo" },
      { nombre: "Sensor B", tipo: "Humedad", estado: "Activo" }
    ],
    Cultivo2: [
      { nombre: "Sensor C", tipo: "pH", estado: "Mantenimiento" }
    ]
  };

  const selectCultivo = document.getElementById("Cultivo");
  const cuerpoTabla = document.getElementById("cuerpoTablaSensores");
  const infoCount = document.getElementById("InfoSensorCount");
  const formSensor = document.getElementById("formAgregarSensor");

  function renderizarTabla() {
    if (!selectCultivo || !cuerpoTabla) return;

    const cultivoSeleccionado = selectCultivo.value;
    
    if (!datosCultivos[cultivoSeleccionado]) {
      datosCultivos[cultivoSeleccionado] = [];
    }

    const sensores = datosCultivos[cultivoSeleccionado];

    sensores.forEach((sensor) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${sensor.nombre}</td>
        <td>${sensor.tipo}</td>
        <td><span class="badge-estado">${sensor.estado}</span></td>
      `;
      cuerpoTabla.appendChild(fila);
    });

    if (infoCount) {
      infoCount.textContent = `${sensores.length} sensor(es)`;
    }
  }

  if (formSensor) {
    formSensor.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputNombre = document.getElementById("nombreSensor");
      const inputTipo = document.getElementById("tipoSensor");
      const selectEstado = document.getElementById("estadoSensor");

      if (!inputNombre || !inputTipo || !selectEstado) return;

      const cultivoActual = selectCultivo.value;
      const nombre = inputNombre.value.trim();
      const tipo = inputTipo.value.trim();
      const estado = selectEstado.value;

      if (!nombre || !tipo) return;

      datosCultivos[cultivoActual].push({
        nombre: nombre,
        tipo: tipo,
        estado: estado
      });

      renderizarTabla();

      formSensor.reset();
    });
  }

  if (selectCultivo) {
    selectCultivo.addEventListener("change", renderizarTabla);
  }

  renderizarTabla();
});
