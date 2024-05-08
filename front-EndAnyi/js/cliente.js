var url = "http://localhost:8080/api/v1/cliente/";

function listarCliente() {
    var urlLocal = url;
    var filtro = document.getElementById("texto").value
    if (filtro != "")
        urlLocal += "busqueda/" + filtro;

    $.ajax({
        url: urlLocal,
        type: "GET",
        success: function (result) {
            var cuerpoTablaCliente = document.getElementById("cuerpoTablaCliente");
            cuerpoTablaCliente.innerHTML = "";
            for (var i = 0; i < result.length; i++) {
                var trResgistro = document.createElement("tr");

                var celdaId = document.createElement("td");
                var celdaTipoIdentificacion = document.createElement("td");
                var celdanNumeroIdentificacion = document.createElement("td");
                var celdaNombreCliente = document.createElement("td");
                var celdaApellidoCliente = document.createElement("td");
                var celdaNumeroTelefono = document.createElement("td");
                var celdaDireccion = document.createElement("td");
                var celdaCiudad = document.createElement("td");
                var celdaEstadoCliente = document.createElement("td");

                celdaId.innerText = result[i]["idCliente"];
                celdaTipoIdentificacion.innerText = result[i]["tipoDocumento"];
                celdanNumeroIdentificacion.innerText = result[i]["numeroDocumento"];
                celdaNombreCliente.innerText = result[i]["nombreCliente"];
                celdaApellidoCliente.innerText = result[i]["apellidoCliente"];
                celdaNumeroTelefono.innerText = result[i]["telefono"];
                celdaDireccion.innerText = result[i]["direccion"];
                celdaCiudad.innerText = result[i]["ciudad"];
                celdaEstadoCliente.innerText = result[i]["estado"];

                trResgistro.appendChild(celdaId);
                trResgistro.appendChild(celdaTipoIdentificacion);
                trResgistro.appendChild(celdanNumeroIdentificacion);
                trResgistro.appendChild(celdaNombreCliente);
                trResgistro.appendChild(celdaApellidoCliente);
                trResgistro.appendChild(celdaNumeroTelefono);
                trResgistro.appendChild(celdaDireccion);
                trResgistro.appendChild(celdaCiudad);
                trResgistro.appendChild(celdaEstadoCliente);

                var celdaOpcion = document.createElement("td");
                var botonEditarCliente = document.createElement("button");
                botonEditarCliente.value = result[i]["idCliente"];
                botonEditarCliente.innerHTML = "Editar";

                botonEditarCliente.onclick = function (e) {
                    $('#exampleModal').modal('show');
                    consultarClienteID(this.value);
                }
                botonEditarCliente.className = "btn btn-warning editar-cliente";

                var botonDeshabilitarCliente = document.createElement("button");
                botonDeshabilitarCliente.innerHTML = "Deshabilitar";
                botonDeshabilitarCliente.className = "btn btn-danger deshabilitar-cliente";

                var clienteIdParaDeshabilitar = result[i]["idCliente"];
                botonDeshabilitarCliente.onclick = function () {
                    deshabilitarCliente(clienteIdParaDeshabilitar);
                };

                celdaOpcion.appendChild(botonEditarCliente);
                celdaOpcion.appendChild(botonDeshabilitarCliente);

                trResgistro.appendChild(celdaOpcion)
                cuerpoTablaCliente.appendChild(trResgistro);
            }
        },
        error: function (error) {
            alert("Error en la petición " + error);
        }
    })
}

function consultarClienteID(id) {
    $.ajax({
        url: url + id,
        type: "GET",
        success: function (result) {
            document.getElementById("tipo_id").value = result["tipoDocumento"];
            document.getElementById("doc_cliente").value = result["numeroDocumento"];
            document.getElementById("nombre_cliente").value = result["nombreCliente"];
            document.getElementById("apellido_cliente").value = result["apellidoCliente"];
            document.getElementById("telefono_cliente").value = result["telefono"];
            document.getElementById("direccion_cliente").value = result["direccion"];
            document.getElementById("ciudad_cliente").value = result["ciudad"];
            document.getElementById("estado_cliente").value = result["estado"];
        }
    });
}

function actualizarCliente() {
    var id_cliente = document.getElementById("id_cliente").value
    var formData = {
        "tipoDocumento": document.getElementById("tipo_id").value,
        "numeroDocumento": document.getElementById("doc_cliente").value,
        "nombreCliente": document.getElementById("nombre_cliente").value,
        "apellidoCliente": document.getElementById("apellido_cliente").value,
        "telefono": document.getElementById("telefono_cliente").value,
        "direccion": document.getElementById("direccion_cliente").value,
        "ciudad": document.getElementById("ciudad_cliente").value,
        "estado": document.getElementById("estado_cliente").value
    };

    if (validarCampos()) {
        $.ajax({
            url: url + id_cliente,
            type: "PUT",
            data: formData,
            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                listarCliente();
            },
            error: function (error) {
                Swal.fire({
                    title: "¡Error!",
                    text: "No se guardó",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}

function deshabilitarCliente(id) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, deshabilitar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url + id,
                type: "DELETE",
                success: function (result) {
                    Swal.fire(
                        'Deshabilitado!',
                        'El registro ha sido deshabilitado.',
                        'success'
                    );
                    listarCliente();
                },
                error: function (error) {
                    Swal.fire(
                        'Error!',
                        'No se pudo deshabilitar el registro.',
                        'error'
                    );
                }
            });
        }
    });
}

function registrarCliente() {
    var formData = {
        "tipoDocumento": document.getElementById("tipo_id").value,
        "numeroDocumento": document.getElementById("doc_cliente").value,
        "nombreCliente": document.getElementById("nombre_cliente").value,
        "apellidoCliente": document.getElementById("apellido_cliente").value,
        "telefono": document.getElementById("telefono_cliente").value,
        "direccion": document.getElementById("direccion_cliente").value,
        "ciudad": document.getElementById("ciudad_cliente").value,
        "estado": document.getElementById("estado_cliente").value
    };

    if (validarCampos()) {
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (result) {
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
            },
        })
    } else {
        Swal.fire({
            title: "¡Error!",
            text: "Llene todos los campos correctamente",
            icon: "error"
        });
    }
}


