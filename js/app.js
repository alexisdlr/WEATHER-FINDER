const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const form = document.querySelector('#formulario')

window.addEventListener('load', () => {
  form.addEventListener('submit', buscarClima)
})

function buscarClima (e) {
  e.preventDefault();

  validarForm();
}

function validarForm () {
  const ciudadInput = document.querySelector('#ciudad').value
  const paisInput = document.querySelector('#pais').value

  if(ciudadInput === ''|| paisInput === '') {
    imprimirAlerta('No field can be empty')
    return
  }
  consultarApi(ciudadInput, paisInput)
}
function imprimirAlerta(mensaje) {
  const alert = document.querySelector('.bg-red-200')
  if(!alert) {
    const alerta = document.createElement('div')
    alerta.classList.add('text-red-700', 'bg-red-200', 'border-red-400', 'px-4', 'py-3', 'rounded', 'mt-3')
    alerta.innerHTML = `
    <span class='block'>
    <p class='font-bold text-center'>${mensaje}</p></span>
    `
    form.appendChild(alerta)
    setTimeout(() => {
      alerta.remove()
    },3000)
  } 
}
function consultarApi (ciudad, pais) {

  const appId = '297fa75310e1ef00f5ce92d6573f8c75'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

  Spinner()

  fetch(url) 
    .then(respuesta => respuesta.json())
    .then(data => {
      limpiarHtml()
      if(data.cod === '404'){
        imprimirAlerta('This city do not exist')
        return
      }
      mostrarClima(data)

    })
}
//imprime los datos de la api en el DOM
function mostrarClima (datos) {
  const {name, main: {temp,temp_max, temp_min}} = datos
  const tempC =  Math.round(temp - 273.15) 
  const tempMaxC =  Math.round(temp_max - 273.15)
  const tempMinC = Math.round(temp_min - 273.15)
  const climaParrafo = document.createElement('p')
  climaParrafo.innerHTML = `
  Weather in: ${name} </br>
  Temperature: ${tempC} &#8451; </br>
  Max: ${tempMaxC} &#8451; </br>
  Min: ${tempMinC} &#8451; </br>`
  climaParrafo.classList.add('font-bold', 'text-center', 'rounded', 'text-white', 'text-2xl', 'parraf')

  const resultadoDiv = document.createElement('div')
  resultadoDiv.classList.add( 'px-4', 'py-4')
  resultadoDiv.appendChild(climaParrafo)
  resultado.appendChild(resultadoDiv)


}

function limpiarHtml() {
  while(resultado.firstChild) {
    resultado.removeChild(resultado.firstChild)
  }
}
function Spinner () {
  limpiarHtml()
  const spinnerDiv = document.createElement('div')
  spinnerDiv.classList.add('sk-cube-grid')

  spinnerDiv.innerHTML = `
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
  `
  resultado.appendChild(spinnerDiv)
}