function validarDatos(id, nombre, nacionalidad, edad) {
  if (
    id.value == "" ||
    nombre.value == "" ||
    nacionalidad.value == "" ||
    edad.value == ""
  ) {
    alert("No deje campos vacios");
    return false;
  } else return true;
}

function validarID(id) {
  if (id.value == "") {
    alert("Debe ingresar el id");
    return false;
  } else return true;
}
function limpiarCampos() {
  document.getElementById("id").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("nacionalidad").value = "";
  document.getElementById("edad").value = "";
}

function post(id, nombre, nacionalidad, edad) {
  if (validarDatos(id, nombre, nacionalidad, edad)) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        limpiarCampos();
        get();
      }
    });
    xhr.open("POST", "http://127.0.0.1:3000/est");
    xhr.setRequestHeader("Content-Type", "application/json");
    let json = `{"_id":${id},"nombre":"${nombre}","nacionalidad":"${nacionalidad}","edad":${edad}}`;
    xhr.send(json);
  }
}

function put(id, nombre, nacionalidad, edad) {
  if (validarDatos(id, nombre, nacionalidad, edad)) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        limpiarCampos();
        get();
      }
    });
    xhr.open("PUT", "http://127.0.0.1:3000/est/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    let json = `{"_id":${id},"nombre":"${nombre}","nacionalidad":"${nacionalidad}","edad":${edad}}`;
    xhr.send(json);
  }
}

function deleteEst(id) {
  if (validarID(id)) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        limpiarCampos();
        get();
      }
    });
    xhr.open("DELETE", "http://127.0.0.1:3000/est/" + id);
    xhr.send();
  }
}

function get() {
  tabla = document.getElementById("response");
  tag =
    '<table id="Table"  class="table-primary text-center justify-content-center">';
  tag += "</table>";
  tabla.innerHTML = tag;
  $("#Table").append(
    "<tr>" +
      '<th style="width: 80px">Id</th>' +
      '<th style="width: 180px">Nombre</th>' +
      '<th style="width: 380px">Nacionalidad</th>' +
      '<th style="width: 80px">Edad</th>'
  );
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    if (xhr.status >= 200 && xhr.status <= 299) {
      const respuesta = xhr.response;
      respuesta.forEach((e) => {
        $("#Table").append(
          "<tr>" +
            "<td>" +
            e._id +
            "</td>" +
            "<td>" +
            e.nombre +
            "</td>" +
            "<td>" +
            e.nacionalidad +
            "</td>" +
            "<td>" +
            e.edad +
            "</td>" +
            "</tr>"
        );
      });
      $("#Table").append("</table>");
    } else {
      document.getElementById(
        "response"
      ).innerHTML = `Error: ${xhr.status}, el recurso no se ha encontrado.`;
    }
  });
  xhr.open("GET", "http://127.0.0.1:3000/est");
  xhr.responseType = "json";
  xhr.send();
}