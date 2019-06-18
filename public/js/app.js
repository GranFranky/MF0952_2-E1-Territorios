// Autor: Fco. Javier Pérez
// MF0952_2 Ejercicio E1 usando servicios de Firebase y GitHub
// Fecha:17/06/2019


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCK0kM2LuasBdk5BTop5hrmO-q2YHYNa0M",
  authDomain: "usuarios-90271.firebaseapp.com",
  databaseURL: "https://usuarios-90271.firebaseio.com",
  projectId: "usuarios-90271",
  storageBucket: "usuarios-90271.appspot.com",
  messagingSenderId: "756070786641",
  appId: "1:756070786641:web:166278f50dbe91d5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Definción de eventos para botones de registro y conexión
var re = document.getElementById("registrar");
re.addEventListener("click", registrar, false);
var co = document.getElementById("conectar");
co.addEventListener("click", conectar, false);
//  let fch_hoy = (new Date().getFullYear()) + "/" + (new Date().getMonth()+1) + "/" + (new Date().getDate());
function registrar() {
  var email = document.getElementById("email1").value;
  var password = document.getElementById("password1").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {
      confirmar();
      $("#botones").css("visibility", "hidden");
      $("#cerrarconexion").css("display", "inline");
      $("#modalRegistro").modal('hide');
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error: " + errorCode + ". " + errorMessage);
    });
}

function conectar() {
  var email = document.getElementById("email2").value;
  var password = document.getElementById("password2").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function () {
      $("#botones").css("visibility", "hidden");
      $("#cerrarconexion").css("display", "inline");
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error: " + errorCode + ". " + errorMessage);
    });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Existe usuario activo.");
      contenidosUsuarioRegistrado(user);

      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;

      console.log("Usuario verificado: " + emailVerified);

      $("#botones").css("visibility", "hidden");
      $("#cerrarconexion").css("display", "inline");
    } else {
      // User is signed out.
      console.log("No existe ningún usuario activo.");
      var contenido = document.getElementById("contenido");
      contenido.innerHTML = `
      <p>Conéctate para acceder a tu cuenta de registro de itinerarios.</p>
      `;
    }
  });
}

function contenidosUsuarioRegistrado(usuario, fch_hoy) {
  var contenido = document.getElementById("contenido");
  if (usuario.emailVerified) {
    // Convierte la fecha actual al formato dd-mm-yyyy
    if ((new Date().getMonth() + 1) < 10) {
      var mes = "0" + (new Date().getMonth() + 1);
    } else {
      var mes = (new Date().getMonth() + 1);
    }
    let fch_hoy = (new Date().getFullYear()) + "-" + mes + "-" + (new Date().getDate());

    contenido.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
        <h4 class="alert-heading">¡Bienvenido ${usuario.email}!</h4>
        <p>Estás en el portal para <b>comerciales</b>.</p>
        <p>Crea, Visualiza, Modifica o Borra tus itinerarios.</p>
        <button type="button" data-toggle="tooltip" data-placement="top" title="Cerrar ventana" class="close" data-dismiss="alert" aria-label="Close"><i class='fas fa-eye-slash'></i>
        </button>
      </div>
    <form action="#" class="alert alert-warning">
      <h3>Gestión de Itinerarios</h3>
      <p>Todos los datos son obligatorios</p>
      <div class="form-inline">
        <label for="V_T_Territorio" class="col-sm-2 col-form-label">Tipo Territorio(*):</label>
        <input type="number" id="V_T_Territorio" min="1" max="10" onchange="val_T_Territorio(V_T_Territorio)" class="form-control mt-1 col-sm-1" required><span id="ok_T_Territorio" style="display:none;"><i class="fas fa-check"></i><span>
      </div>
      <div class="form-inline">
        <label for="V_Territorio" class="col-sm-2 col-form-label">Territorio(*):</label>
        <input type="number" id="V_Territorio" min="1" max="300" onchange="val_Territorio(V_Territorio)" class="form-control mt-1 col-sm-1" required><span id="ok_Territorio" style="display:none;"><i class="fas fa-check"></i><span>
      </div>
      <div class="form-inline">
        <label for="V_Fch_Ini" class="col-sm-2 col-form-label">Fecha Inicio(*):</label>
        <input type="date" id="V_Fch_Ini" max="${fch_hoy}" onchange="val_Fch_Ini(V_Fch_Ini)" class="form-control mt-1 col-sm-2" required><span id="ok_Fch_Ini" style="display:none;"><i class="fas fa-check"></i><span>
        </div>
       <div class="form-inline">
        <label for="V_Fch_Fin" class="col-sm-2 col-form-label">Fecha Fin(*):</label>
        <input type="date" id="V_Fch_Fin" max="${fch_hoy}" onchange="comparaFecha(V_Fch_Ini, V_Fch_Fin)" class="form-control mt-1 col-sm-2" required><span id="ok_Fch_Fin" style="display:none;"><i class="fas fa-check"></i><span>
        </div>
      <div class="form-inline">
        <label for="V_Cuando" class="col-sm-2 col-form-label">Cuando(*):</label>
        <input type="text" id="V_Cuando" maxlenght="50" pattern="[A-Za-zÑñÁÉÍÓúáéíóúÇç\s]" onchange="val_Cuando(V_Cuando)" class="form-control mt-1 col-sm-3" required><span id="ok_Cuando" style="display:none;"><i class="fas fa-check"></i><span>
      </div>
      <div class="form-inline">
        <label for="V_Quien" class="col-sm-2 col-form-label">Quien(*):</label>
        <input type="number" id="V_Quien" min="1" max="120" onchange="val_Quien(V_Quien)" class="form-control mt-1 col-sm-1"><span id="ok_Quien" style="display:none;"><i class="fas fa-check"></i><span>
      </div>
    </form>
      <button class="btn" id="guardar" data-toggle="tooltip" data-placement="top" title="Guardar datos"><i class='fas fa-save'></i></button>
      <div id="act"></div>
      <div class="table-responsive">
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th class="text-sm-center" scope="col">ID</th>
            <th class="text-sm-center" scope="col">Tipo Territorio</th>
            <th class="text-sm-center" scope="col">Territorio</th>
            <th class="text-sm-center" scope="col">Fecha Inicio</th>
            <th class="text-sm-center" scope="col">Fecha Fin</th>
            <th class="text-sm-center" scope="col">Cuando</th>
            <th class="text-sm-center" scope="col">Quien</th>
            <th class="text-sm-center" scope="col">Editar</th>
            <th class="text-sm-center" scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody id="tabla">
        </tbody>
      </table>
      </div>
    `;
    cargarTabla();
    $("#cerrarconexion").html(`<button id="cerrar" class="btn btn-danger btn-sm ml-2">Cerrar sesión</button>`);
    var ce = document.getElementById("cerrar");
    ce.addEventListener("click", cerrar, false);
    var gu = document.getElementById("guardar");
    gu.addEventListener("click", guardar, false);
  } else {
    contenido.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
        <h4 class="alert-heading">¡Bienvenido ${usuario.email}!</h4>
        <p>Revisa tu correo electrónico</p>
        <hr>
        <p class="mb-0">Activa tu cuenta para acceder a tus datos de itinerarios.</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
  }
}

function cerrar() {
  firebase.auth().signOut()
    .then(function () {
      console.log("Saliendo...");
      $("#botones").css("visibility", "visible");
      $("#cerrarconexion").css("display", "none");
      contenido.innerHTML = `
      <div class="alert alert-warning alert-dismissible fade show mt-2" role="alert">
        <strong>¡Cáspitas!</strong> Esperamos verte pronto otra vez por nuestro portal.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      `;
      cerrarconexion.innerHTML = "";
    })
    .catch(function (error) {
      console.log(error);
    });
}

function confirmar() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
    // Email sent.
    console.log("Enviando correo...");
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });
}

function guardar() {
  V_T_Territorio = document.getElementById("V_T_Territorio").value;
  V_Territorio = document.getElementById("V_Territorio").value;
  V_Fch_Ini = document.getElementById("V_Fch_Ini").value;
  V_Fch_Fin = document.getElementById("V_Fch_Fin").value;
  V_Cuando = document.getElementById("V_Cuando").value;
  V_Quien = document.getElementById("V_Quien").value;
  if (V_T_Territorio.trim() === "" || V_Territorio.trim() === "" || V_Fch_Ini.trim() === "" || V_Fch_Fin.trim() === "" || V_Cuando.trim() === "" || V_Quien.trim() === "") {
    alert("Todos los datos son obligatorios.");
  } else {
    var usuario = {
      V_T_Territorio: V_T_Territorio,
      V_Territorio: V_Territorio,
      V_Fch_Ini: V_Fch_Ini,
      V_Fch_Fin: V_Fch_Fin,
      V_Cuando: V_Cuando,
      V_Quien: V_Quien
    }
  }
  db.collection("usuarios").add(usuario)
    .then(function (docRef) {
      console.log("Documento escrito con ID: ", docRef.id);
      document.getElementById("V_T_Territorio").value = "";
      document.getElementById("V_Territorio").value = "";
      document.getElementById("V_Fch_Ini").value = "";
      document.getElementById("V_Fch_Fin").value = "";
      document.getElementById("V_Cuando").value = "";
      document.getElementById("V_Quien").value = "";
      $("#ok_T_Territorio").hide();
      $("#ok_Territorio").hide();
      $("#ok_Fch_Ini").hide();
      $("#ok_Fch_Fin").hide();
      $("#ok_Cuando").hide();
      $("#ok_Quien").hide();
    })
    .catch(function (error) {
      console.error("Error añadiendo el documento: ", error);
    });
}


// Lectura de los documentos
function cargarTabla() {
  db.collection("usuarios").onSnapshot(function (querySnapshot) {
    var tabla = document.getElementById("tabla");
    tabla.innerHTML = "";
    querySnapshot.forEach(function (doc) {
// Doy la vuelta a las fechas para que se vean con formato legible
      var a_F_Ini = doc.data().V_Fch_Ini;
      esFchIni = a_F_Ini.split('-').reverse().join('-')
      var a_F_Fin = doc.data().V_Fch_Fin;
      esFchFin = a_F_Fin.split('-').reverse().join('-')
      

      tabla.innerHTML += `
        <tr>
          <th class="text-sm-right table-secondary scope="row-sm">${doc.id}</th>
          <td class="text-sm-right table-secondary">${doc.data().V_T_Territorio}</td>
          <td class="text-sm-right table-secondary">${doc.data().V_Territorio}</td>
          <td class="text-sm-center table-secondary">${esFchIni}</td>
          <td class="text-sm-center table-secondary">${esFchFin}</td>
          <td class="text-sm-left table-secondary">${doc.data().V_Cuando}</td>
          <td class="text-sm-right table-secondary">${doc.data().V_Quien}</td>
          <td><button id="btn_edit" class="btn" data-toggle="tooltip" data-placement="top" title="Editar datos" onclick="editarDatos('${doc.id}', '${doc.data().V_T_Territorio}', '${doc.data().V_Territorio}', '${doc.data().V_Fch_Ini}', '${doc.data().V_Fch_Fin}', '${doc.data().V_Cuando}', '${doc.data().V_Quien}');"><i class='fas fa-edit'></i></button></td>
          <td><button id="btn_eliminar" class="btn" data-toggle="tooltip" data-placement="top" title="Borrar datos" onclick="borrarDatos('${doc.id}', '${doc.data().V_T_Territorio}', '${doc.data().V_Territorio}', '${doc.data().V_Fch_Ini}', '${doc.data().V_Fch_Fin}', '${doc.data().V_Cuando}', '${doc.data().V_Quien}');"><i class="fa fa-trash"></i></button></td>
        </tr>
      `;
    });
  });
}

// Borrar datos de documentos
function borrarDatos(parId, parV_T_Territorio, parV_Territorio, parV_Fch_Ini, parV_Fch_Fin, parV_Cuando, parV_Quien) {
  var re = confirm("¿Está seguro que quiere borrar este itinerario: " + parV_T_Territorio + ' ' + parV_Territorio + "?");
  if (re == true) {
    db.collection("usuarios").doc(parId).delete()
      .then(function () {
        console.log("Itinerario borrado correctamente.");
      }).catch(function (error) {
        console.error("Error borrando el Itinerario: ", error);
      });
  }
}

//  Editar datos de documentos
function editarDatos(parId, parV_T_Territorio, parV_Territorio, parV_Fch_Ini, parV_Fch_Fin, parV_Cuando, parV_Quien) {
  document.getElementById("V_T_Territorio").value = parV_T_Territorio;
  document.getElementById("V_Territorio").value = parV_Territorio;
  document.getElementById("V_Fch_Ini").value = parV_Fch_Ini;
  document.getElementById("V_Fch_Fin").value = parV_Fch_Fin;
  document.getElementById("V_Cuando").value = parV_Cuando;
  document.getElementById("V_Quien").value = parV_Quien;

  $("#guardar").css("display", "none");
  $(".linea").attr("disabled", true);
  $("#act").append("<button class='btn data-toggle='tooltip' data-placement='top' title='Actualizar datos' btn-info my-3' id='actualizar'><i class='fas fa-save'></i></button>");
  $("#actualizar").on("click", function () {
    var userRef = db.collection("usuarios").doc(parId);
    V_T_Territorio: document.getElementById("V_T_Territorio").value;
    V_Territorio: document.getElementById("V_Territorio").value;
    V_Fch_Ini: document.getElementById("V_Fch_Ini").value;
    V_Fch_Fin: document.getElementById("V_Fch_Fin").value;
    V_Cuando: document.getElementById("V_Cuando").value;
    V_Quien: document.getElementById("V_Quien").value;
    if ((V_T_Territorio.value).trim() === "" || (V_Territorio.value).trim() === "" || (V_Fch_Ini.value).trim() === "" || (V_Fch_Fin.value).trim() === "" || (V_Cuando.value).trim() === "" || (V_Quien.value).trim() === "") {
      alert("Todos los datos son obligatorios.");
    } else {
      return userRef.update({
          V_T_Territorio: document.getElementById("V_T_Territorio").value,
          V_Territorio: document.getElementById("V_Territorio").value,
          V_Fch_Ini: document.getElementById("V_Fch_Ini").value,
          V_Fch_Fin: document.getElementById("V_Fch_Fin").value,
          V_Cuando: document.getElementById("V_Cuando").value,
          V_Quien: document.getElementById("V_Quien").value
        })
        .then(function () {
          console.log("Usuario actualizado correctamente.");
          document.getElementById("V_T_Territorio").value = "";
          document.getElementById("V_Territorio").value = "";
          document.getElementById("V_Fch_Ini").value = "";
          document.getElementById("V_Fch_Fin").value = "";
          document.getElementById("V_Cuando").value = "";
          document.getElementById("V_Quien").value = "";
          $("#ok_T_Territorio").hide();
          $("#ok_Territorio").hide();
          $("#ok_Fch_Ini").hide();
          $("#ok_Fch_Fin").hide();
          $("#ok_Cuando").hide();
          $("#ok_Quien").hide();
          $("#guardar").css("display", "inline");
          $(".linea").attr("disabled", false);
          $("#act").empty();
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("Error actualizando Itinerario: ", error);
        });
    }
  })
}

function val_T_Territorio(V_T_Territorio) {
  var exp_T_Territorio = new RegExp("^(?:[1-9]|0[1-9]|10)$");
  if (exp_T_Territorio.test(V_T_Territorio.value)) {
    $("#ok_T_Territorio").show();
  } else {
    alert(V_T_Territorio.value + " No es correcto.");
    document.getElementById("V_T_Territorio").focus();
    return false;
  }
}

function val_Territorio(V_Territorio) {
  var exp_Territorio = new RegExp("^(?:[1-9]\d?|[12]\d{2}|300)$");
  if (exp_Territorio.test(V_Territorio.value)) {
    $("#ok_Territorio").show();
  } else {
    alert(V_Territorio.value + " No es correcto.");
    document.getElementById("V_Territorio").focus();
    return false;
  }
}

function val_Fch_Ini(V_Fch_Ini) {
  if (V_Fch_Ini.value <= Date()) {
    $("#ok_Fch_Ini").show();
  } else {
    alert(V_Fch_Ini.value + " No es correcta.");
    document.getElementById("V_Fch_Ini").focus();
    return false;
  }
}

function comparaFecha(V_Fch_Ini, V_Fch_Fin) {
  if (V_Fch_Fin.value < V_Fch_Ini.value) {
    alert("La <b> FECHA </b> de <b> FINALIZACION </b> no puede ser anterior a la fecha de inicio");
    document.getElementById("V_Fch_Fin").focus();
    return false;
  } else {
    $("#ok_Fch_Fin").show();
  }
}

function val_Cuando(V_Cuando) {
  var exp_Cuando = new RegExp("^[A-Za-zÑñÁÉÍÓúáéíóúÇç\s]*$");
  var comp_Cuando = (V_Cuando.value).trim();
  if (exp_Cuando.test(comp_Cuando)) {
    $("#ok_Cuando").show();
  } else {
    alert(V_Cuando.value + " No es correcto");
    document.getElementById("V_Cuando").focus();
    return false;
  }
}

function val_Quien(V_Quien) {
  var exp_Quien = new RegExp("^(12[0-0]|1[01][0-9]|[1-9]?[0-9])$");
  if (exp_Quien.test(V_Quien.value)) {
    $("#ok_Quien").show();
  } else {
    alert(V_Quien.value + " No es correcto.");
    document.getElementById("V_Quien").focus();
    return false;
  }
}

observador();