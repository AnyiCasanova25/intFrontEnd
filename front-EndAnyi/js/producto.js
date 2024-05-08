var url = "http://localhost:8080/api/shoes/producto/";

function listarCliente() {
    //METODO PARA LISTAR LOS CLIENTES

    // cual es la diferencia entre busqueda normal
    // y con FileSystemDirectoryHandle
    // normal url= http://localhost:8080/api/hospital/medico/
    // con filtro url= http://localhost:8080/api/hospital/medico/busqueda/parametro

    // si el campo filtro es diferente a vacio haga busqueda con filtro

    // si no haga busqueda normal

    var urlLocal = url;
    var filtro = document.getElementById("texto").value
    if (filtro != "")
        urlLocal += "busqueda/" + filtro;


    //SE CREA LA PETICION AJAX
    $.ajax({
        url: urlLocal,
        type: "GET",
        success: function (result) {
            //success: funcion que se ejecuta
            //cuando la peticion tiene exito
            //console.log(result);

            var cuerpoTablaProducto = document.getElementById("cuerpoTablaProducto");
            //Se limpia el cuepro de la tabla
            cuerpoTablaProducto.innerHTML = "";
            //se hace un ciclo que recorra l arreglo con los datos
            for (var i = 0; i < result.length; i++) {
                //UNA ETIQUETA tr por cada registro
                var trResgistro = document.createElement("tr");

                var celdaId = document.createElement("tr");
                let celdaNombre = document.createElement("td")
                let celdanDescripcion = document.createElement("td")
                let celdaCantidad = document.createElement("td")
                let celdaPrecio = document.createElement("td")
                let celdaIva = document.createElement("td")
                let celdaDescuento = document.createElement("td")
                let celdaEstado = document.createElement("td")



                celdaId.innerText = result[i]["id_produc"];
                celdaNombre.innerText = result[i]["nombre"];
                celdanDescripcion.innerText = result[i]["descripcion"];
                celdaCantidad.innerText = result[i]["cantidad"];
                celdaPrecio.innerText = result[i]["precio"];
                celdaIva.innerText = result[i]["iva"];
                celdaDescuento.innerText = result[i]["descuento"];
                celdaEstado.innerText = result[i]["estado_produc"];


                trResgistro.appendChild(celdaId);
                trResgistro.appendChild(celdaNombre);
                trResgistro.appendChild(celdanDescripcion);
                trResgistro.appendChild(celdaCantidad);
                trResgistro.appendChild(celdaPrecio);
                trResgistro.appendChild(celdaIva);
                trResgistro.appendChild(celdaDescuento);
                trResgistro.appendChild(celdaEstado);

                //botones editar y deshabilitar
                let celdaOpcion = document.createElement("td");
                let botonEditarProducto = document.createElement("button");
                botonEditarProducto.value = result[i]["id_produc"];
                botonEditarProducto.innerHTML = "Editar";

                botonEditarProducto.onclick = function (e) {
                    $('#exampleModal').modal('show');
                    consultarProductoID(this.value);
                }
                botonEditarProducto.className = "btn btn-warning editar-producto";

                let botonDeshabilitarProducto = document.createElement("button");
                botonDeshabilitarProducto.innerHTML = "Deshabilitar";
                botonDeshabilitarProducto.className = "btn btn-danger deshabilitar-producto";

                let productoIdParaDeshabilitar = result[i]["id_cliente"];
                botonDeshabilitarProducto.onclick = function () {
                    deshabilitarCliente(productoIdParaDeshabilitar);
                };


                celdaOpcion.appendChild(botonEditarProducto);
                celdaOpcion.appendChild(botonDeshabilitarProducto);

                trResgistro.appendChild(celdaOpcion)
                cuerpoTablaProducto.appendChild(trResgistro);


                //creamos un td por cada campo de resgistro

            }
        },
        error: function (error) {
            /*
            ERROR: funcion que se ejecuta cuando la peticion tiene un error
            */
            alert("Error en la petición " + error);
        }
    })
}


//1.Crear petición que traiga la información del medico por id
function consultarProductoID(id) {
    //alert(id);
    $.ajax({
        url: url + id,
        type: "GET",
        success: function (result) {
            document.getElementById("nombre_produc").value = result["tipo_id"];
            document.getElementById("id_produc").value = result["id_cliente"];
            document.getElementById("descripcion").value = result["doc_cliente"];
            document.getElementById("cantidad").value = result["nombre_cliente"];
            document.getElementById("precio").value = result["apellido_cliente"];
            document.getElementById("iva").value = result["telefono_cliente"];
            document.getElementById("descuento").value = result["direccion_cliente"];
            document.getElementById("estado_produc").value = result["estado_produc"];
        }
    });
}
//2.Crear petición que actualice la información del medico

function actualizarProducto() {
    var id_produc = document.getElementById("id_produc").value
    let formData = {
        "nombre_produc": document.getElementById("nombre_produc").value,
        "descripcion": document.getElementById("descripcion").value,
        "cantidad": document.getElementById("cantidad").value,
        "precio": document.getElementById("precio").value,
        "iva": document.getElementById("iva").value,
        "descuento": document.getElementById("descuento").value,
        "estado_produc": document.getElementById("estado_produc").value
    };

    if (validarCampos()) {
        $.ajax({
            url: url + id_cliente,
            type: "PUT",
            data: formData,
            success: function (result) {
                // Manejar la respuesta exitosa según necesites
                Swal.fire({
                    title: "¡Excelente!",
                    text: "Se guardó correctamente",
                    icon: "success"
                });
                // Puedes hacer algo adicional como recargar la lista de médicos
                listarProducto();
            },
            error: function (error) {
                // Manejar el error de la petición
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


// funcion de deshabilitar medico
function deshabilitarProducto(id) {
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
                    listarProducto(); // Recarga la lista de médicos
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


function registrarProducto() {

    let formData = {
        "id_produc": document.getElementById("id_produc").value,
        "nombre_produc": document.getElementById("nombre_produc").value,
        "descripcion": document.getElementById("descripcion").value,
        "cantidad": document.getElementById("cantidad").value,
        "precio": document.getElementById("precio").value,
        "iva": document.getElementById("iva").value,
        "descuento": document.getElementById("descuento").value,
        "estado_produc": document.getElementById("estado_produc").value

    };

    if (validarCampos()) {
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            success: function (result) {
                //
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

//validación número de documento medico
function validarCampos() {
    var id_produc = document.getElementById("id_produc");
    var nombre = document.getElementById("nombre");

    return validarId(id_produc) && 
    validarNombre(nombre) && 
    validarDescripcion(descripcion) &&
    validarIva(iva) &&
    validarDescuento(descuento);
    


}
function validarId(cuadroId) {
    var valor = cuadroId.value;
    var valido = true;
    if (valor.length < 5 || valor.length > 11) {
        valido = false
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }
    return valido;
}

function validarNombre(cuadroNombre) {
    var valor = cuadroNombre.value;
    var valido = true;
    if (valor.length < 3 || valor.length > 21) {
        valido = false
    }

    if (valido) {
        cuadroNombre.className = "form-control is-valid";
    } else {
        cuadroNombre.className = "form-control is-invalid";
    }
    return valido;
}

function validarCantidad(cuadroCantidad) {
    var valor = cuadroCantidad.value;
    var valido = true;
    if (valor.length < 2 || valor.length > 21) {
        valido = false
    }

    if (valido) {
        cuadroCantidad.className = "form-control is-valid";
    } else {
        cuadroCantidad.className = "form-control is-invalid";
    }
    return valido;
}

function validarPrecio(cuadroPrecio) {
    var valor = cuadroPrecio.value;
    var valido = true;
    if (valor.length < 7 || valor.length > 16) {
        valido = false
    }

    if (valido) {
        cuadroPrecio.className = "form-control is-valid";
    } else {
        cuadroPrecio.className = "form-control is-invalid";
    }
    return valido;
}

function limpiar() {
    document.getElementById("nombre_produc").value = "";
    document.getElementById("id_produc").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("iva").value = "";
    document.getElementById("descuento").value = "";
    document.getElementById("estado_produc").value = "";

}


