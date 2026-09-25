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

