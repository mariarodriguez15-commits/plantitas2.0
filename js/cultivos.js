const formCultivo = document.getElementById("formCultivo");
const tablaCultivos = document.querySelector(".tabla-sensor tbody");

formCultivo.addEventListener("submit", evento => {
    evento.preventDefault();

    const datos = new FormData(formCultivo);
    const cultivo = Object.fromEntries(datos);
    console.log(cultivo);

    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${cultivo.nombreCultivo}</td>
        <td>${cultivo.tipoCultivo}</td>
        <td>Recién agregado</td>
    `;

    tablaCultivos.append(fila);
    formCultivo.reset();
});