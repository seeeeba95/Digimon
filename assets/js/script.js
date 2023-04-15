const URL_BASE = "https://digimon-api.vercel.app/api/digimon";
const URL_LEVEL = URL_BASE + "/level/"
const URL_NAME = URL_BASE + "/name/"
let contenido;
let dataImagenes;
let carta;
let dataOriginal;




function tabla(datos) {
        contenido.innerHTML = "";
        
        for (let temp of datos) {
                contenido.innerHTML += ` <tr> 
                        <th scope="row">${temp.name}</ th> 
                        <td><img width="50px" height="50px" src="${temp.img}"></td>
                        <td>${temp.level}</td> 
                    </tr> `;
        }
} 

function tarjeta(data) {
    carta = document.getElementById("carta");
    carta.innerHTML = "";
    for (let temp of data) {
        carta.innerHTML += `
        <div id="tarjSola" class="card mb-3 container" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-4">
            <img src="${temp.img}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">"NOMBRE: ${temp.name}"</h5>
            <p class="card-text">LEVEL: "${temp.level}"</p>
            </div>
        </div>
        </div>
        </div>
        `;
    }
}

function mostrarImagenes() {
    let img = document.getElementById("galeria");
    document.getElementById("tabla_principal").style.display = "none";
    document.getElementById("carta").style.display = "none";
    document.getElementById("galeria").style.display = "block";

    img.innerHTML = "";
    for (let temp of dataImagenes) {
        img.innerHTML += ` 
        <div id="card" class="card">
        <img src="${temp.img}" class="card-img-top" alt=" imagen ${temp.name}">
        <div class="card-body">
        <h6 class="card-title">${temp.name}</h6>
        <p class="card-text">${temp.level}</p>
        </div>
    </div>
    `;
    }
}


function mostrarLevels(level) {
    let img = document.getElementById("galeria");
    document.getElementById("tabla_principal").style.display = "none";
    document.getElementById("carta").style.display = "none";
    document.getElementById("galeria").style.display = "block";

    img.innerHTML = "";
    let filtro = dataOriginal.filter(function(item) {
        return item.level== level;
    });

    for (let temp of filtro) {
        img.innerHTML += ` 
        <div id="card" class="card">
        <img src="${temp.img}" class="card-img-top" alt=" imagen ${temp.name}">
        <div class="card-body">
        <h6 class="card-title">${temp.name}</h6>
        <p class="card-text">${temp.level}</p>
        </div>
    </div>
    `;
    }
}

function capturarDato(){
    let nombreDigimon = document.getElementById("dato").value;
    nombreDigimon = nombreDigimon.toLowerCase();
    document.getElementById("tabla_principal").style.display = "none";
    document.getElementById("galeria").style.display = "none";
    document.getElementById("carta").style.display = "block";
    
    fetch(URL_NAME + nombreDigimon)
    .then(response => response.json())
    .then(datos => {
        console.log(datos);
        tarjeta(datos);
    });
} 



$(document).ready (function (){
    contenido = document.getElementById("contenido");

    fetch(URL_BASE)
    .then(response => response.json())
    .then(datos => {
        console.log(datos);
        tabla(datos);
        dataImagenes = datos;
        dataOriginal = datos;
    });
});

