document.addEventListener("DOMContentLoaded", cargarJson)


function cargarJson (){

const datos = new XMLHttpRequest();

datos.onload = function () {

    
    if(this.status === 200){

        const usuario = JSON.parse(this.responseText);
        
        document.getElementById("name").value = usuario.personalInfo.firstName;
        document.getElementById("email").value = usuario.personalInfo.email;
        document.getElementById("phone").value = usuario.personalInfo.phone;
        document.getElementById("street").value = usuario.address.street;
        document.getElementById("city").value = usuario.address.city;
        document.getElementById("postal").value = usuario.address.zipCode;
       
       
        document.getElementById("country").value = usuario.address.country;
        document.getElementById("theme").value = usuario.preferences.theme;
        document.getElementById("notifications").value = usuario.preferences.notifications;
        document.getElementById("language").value = usuario.preferences.language;

        document.getElementById("hobbies").value = usuario.hobbies.join(", ");
        

    }

    else console.log("Error al cargar los datos")


};

datos.open("GET","./datos/user_data.json",true);
datos.send();

}


window.onload = cargarJson;

const boton = document.getElementById("edit-btn")

boton.addEventListener("click", function (){

const inputs = document.querySelectorAll("input")

inputs.forEach(input => {

    input.removeAttribute("readonly")

    input.setAttribute("aria-readonly", false)
    
})

const botonGuardar = document.getElementById("save-btn")

botonGuardar.removeAttribute("hidden")

})

const botonGuardar = document.getElementById("save-btn")

botonGuardar.addEventListener("submit", function (){

const data = {}

const inputs = document.querySelectorAll("input")
inputs.forEach(input =>{

    data[input.name] = input.value;

})

const xhr = new XMLHttpRequest()
const url = "https://cors-anywhere.herokuapp.com/https://webhook.site/"


xhr.open("POST", url, true)
xhr.setRequestHeader("Content-Type", "application/json")

xhr.onload = function (){

   botonGuardar.setAttribute("hidden", "")

    if(xhr.status >= 200 && xhr.status < 300) {

        inputs.forEach(input => {

            input.setAttribute("readonly", "")
            input.setAttribute("aria-readonly", "true")
        })

    }

    else alert(("Error al guardar los cambios. Intenta de nuevo."))

}


xhr.send(JSON.stringify(data));
})
