/* 
En este ejercicio crearemos modelos de usuarios con de la siguiente manera
{
    nombre: string,
    apellido: string,
    telefono: string,
    email: string,
    genero: string (hombre | mujer),
}
*/

//declaro variable para la API
const api = `https://605e4a309386d200171bc0d6.mockapi.io/api/v1/usuarios`;


//funcion para registrar con POST
const postUser = (e) => {
    e.preventDefault();
    //obtenemos el valor de nuestros campos de texto
    const body = getInputValues();

    //publicar los datos del formulario al mock api
    fetch(api, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response);
            getUsers();
        });

    cleanInputs();
};



//funcion para obtner los usuarios GET
const getUsers = async() => {
    //obtener los datos del back end, y guardarlos dentro de un array llamado data
    const divData = document.getElementById("data");

    // Petición HTTP
    fetch(api, {
            method: 'GET',
        })
        .then(resp => resp.json())
        .then(data => {
            divData.innerHTML = "";
            data.map((item, idx) => {
                const childDiv = document.createElement("div");
                const nombre = document.createElement("span");
                const apellido = document.createElement("span");
                const email = document.createElement("span");
                const telefono = document.createElement("span");
                const genero = document.createElement("span");
                nombre.innerText = "Nombre: " + item.nombre;
                apellido.innerText = "Apellido: " + item.apellido;
                email.innerText = "Correo: " + item.email;
                telefono.innerText = "Telefono: " + item.telefono;
                genero.innerText = "Género: " + item.genero;

                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Eliminar";
                deleteButton.onclick = deleteFunc;
                deleteButton.id = item.id;
                childDiv.appendChild(nombre);
                childDiv.appendChild(apellido);
                childDiv.appendChild(email);
                childDiv.appendChild(telefono);
                childDiv.appendChild(genero);
                childDiv.appendChild(deleteButton);
                divData.appendChild(childDiv);
            });

        });
};


//usar la función fetch para eliminar un elemento, el id del elemnto debería estar guardado en el id del botón
const deleteFunc = async(event) => {
    // getUsers(datos);
    const id = event.path[0].id;
    fetch(`https://605e4a309386d200171bc0d6.mockapi.io/api/v1/usuarios/` + id, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            getUsers();
        });
    // debugger
};


const cleanInputs = () => {
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const email = document.getElementById("email");
    const telefono = document.getElementById("telefono");

    nombre.value = "";
    apellido.value = "";
    email.value = "";
    telefono.value = "";
};

const getInputValues = () => {
    const body = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        genero: document.getElementById("genero").value,
    };

    return body;
};