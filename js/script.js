// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = async () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

const limpiarContenedor = async (textoTitulo = 'Gestor de equipos de Futbol') => {
    let contenedor = document.getElementById("contenedor")
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
    let row1 = document.createElement('div')
    row1.className = 'row mx-0'

    let col1 = document.createElement('div')
    col1.className = 'col-4'

    let titulo = document.createElement('h2')
    titulo.innerHTML = `${textoTitulo}`
    titulo.className = 'col-4 text-center mx-0 p-3 bg-info border border-info'

    let col2 = document.createElement('div')
    col2.className = 'col-4'

    row1.appendChild(col1)
    row1.appendChild(titulo)
    row1.appendChild(col2)

    contenedor.appendChild(row1)
    return contenedor
}

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        let contenedor = await limpiarContenedor('Agregar Jugador')

        let form = document.createElement('form')

        let rowNombre = document.createElement('div')
        rowNombre.className = 'row justify-content-center my-4 mx-0'
        let labelNombre = document.createElement('label')
        labelNombre.for = 'nombre'
        let inputNombre = document.createElement('input')
        inputNombre.type = 'text'
        inputNombre.name = 'nombre'
        inputNombre.required = 'required'
        inputNombre.placeholder = 'Nombre'
        inputNombre.className = 'form-control w-50'
        rowNombre.appendChild(labelNombre)
        rowNombre.appendChild(inputNombre)

        let rowEdad = document.createElement('div')
        rowEdad.className = 'row justify-content-center my-4 mx-0'
        let labelEdad = document.createElement('label')
        labelEdad.for = 'edad'
        let inputEdad = document.createElement('input')
        inputEdad.type = "number"
        inputEdad.name = 'edad'
        inputEdad.placeholder = 'Edad'
        inputEdad.className = 'form-control w-50'
        
        rowEdad.appendChild(labelEdad)
        rowEdad.appendChild(inputEdad)

        let rowPosicion = document.createElement('div')
        rowPosicion.className = 'row justify-content-center my-4 mx-0'

        let selectPosicion = document.createElement('select')
        selectPosicion.name = 'posicion'
        selectPosicion.className = 'form-control w-50'

        let optionArquero = document.createElement('option')
        optionArquero.innerHTML = 'Arquero'
        optionArquero.value = 'Arquero'
        selectPosicion.appendChild(optionArquero)

        let optionDelantero = document.createElement('option')
        optionDelantero.innerHTML = 'Delantero'
        selectPosicion.appendChild(optionDelantero)
        optionDelantero.value = 'Delantero'

        let optionDefensor = document.createElement('option')
        optionDefensor.innerHTML = 'Defensor'
        selectPosicion.appendChild(optionDefensor)
        optionDefensor.value = 'Defensor'

        let optionMediocampo = document.createElement('option')
        optionMediocampo.innerHTML = 'Mediocampo'
        selectPosicion.appendChild(optionMediocampo)
        optionMediocampo.value = 'Mediocampo'

        rowPosicion.appendChild(selectPosicion)

        let rowSubmit = document.createElement('div')
        rowSubmit.className = 'row justify-content-center mx-0'
        let buttonSubmit = document.createElement('button')
        buttonSubmit.innerHTML = 'Agregar'
        buttonSubmit.type = 'submit'
        buttonSubmit.className = 'btn btn-success'
        buttonSubmit.id = 'agregar'
        rowSubmit.appendChild(buttonSubmit)

        form.addEventListener('submit', async (data) => {
            data.preventDefault()
            new Promise(async (resolve, reject) => {
                try{
                    let jugadores = obtenerJugadoresLocalStorage();
                    let formData = new FormData(data.target)
                    let id = obtenerJugadoresLocalStorage().length + 1
                    let nombre = formData.get('nombre')
                    if (jugadores.indexOf(jugadores.find(jugador => jugador.nombre === nombre)) != -1){
                        throw new Error('Un jugador con el mismo nombre esta en el equipo')
                    }
                    let edad = formData.get('edad')
                    edad = parseInt(edad)
                    let posicion = formData.get('posicion')
                    let jugando = false
        
                    jugadores.push({ id, nombre, edad, posicion, jugando });
                    guardarJugadoresLocalStorage(jugadores);
        
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    resolve(alert('Jugador agregado correctamente.'))
                    listarJugadores()
                }
                catch(error){
                    reject(alert(error))
                }

        })})
        form.appendChild(rowNombre)
        form.appendChild(rowEdad)
        form.appendChild(rowPosicion)
        form.appendChild(rowSubmit)
        contenedor.appendChild(form)

    } catch (error) {
        console.error('Error:', error.message);
    }
};

const tarjetaJugador = async (contenedor, jugador, jugadoresJugando, metodo, mostrarBotones = true, pantallaSacar = false, pantallaPoner = false, resolve = null) => {
    let row = document.createElement('div')
    row.className = `row justify-content-center mx-0 my-4`

    let card = document.createElement('div')
    card.className = `card w-50 p-0 text-center bg-success-subtle`

    let nombre = document.createElement('h3')
    nombre.innerHTML = jugador.nombre
    card.appendChild(nombre)

    let edad = document.createElement('p')
    edad.innerHTML = `Edad: ${jugador.edad}`
    card.appendChild(edad)

    let posicion = document.createElement('p')
    posicion.innerHTML = `Posicion: ${jugador.posicion}`
    card.appendChild(posicion)

    let jugando = document.createElement('p')
    jugando.innerHTML = `${jugador.jugando ? 'Jugando' : 'No esta jugando'} `
    card.appendChild(jugando)

    if (mostrarBotones) {
        let cambiarPosicion = document.createElement('button')
        cambiarPosicion.innerHTML = 'Cambiar Posicion'
        cambiarPosicion.type = 'button'
        cambiarPosicion.className = 'btn btn-info rounded-0'
        cambiarPosicion.addEventListener('click', (botonApretado) => {
            nuevaPosicion = prompt("Ingrese la nueva posicion del jugador:");
            asignarPosicion(jugador, nuevaPosicion, metodo)
        })
        card.appendChild(cambiarPosicion)

        let botonJugar = document.createElement('button')
        botonJugar.innerHTML = `${jugador.jugando ? 'Sacar' : 'Poner a Jugar'}`
        botonJugar.type = 'button'
        botonJugar.className = `btn btn-${jugador.jugando ? 'danger' : 'success'} rounded-0 rounded-bottom-2`
        botonJugar.addEventListener('click', (botonApretado) => {
            ponerAJugar(jugador, jugadoresJugando, metodo)
        })
        card.appendChild(botonJugar)
    }

    if (pantallaSacar) {
        let botonSacar = document.createElement('button')
        botonSacar.innerHTML = `Sacar`
        botonSacar.type = 'button'
        botonSacar.className = `btn btn-danger rounded-0 rounded-bottom-2`
        botonSacar.addEventListener('click', (botonApretado) => {
            resolve(jugador)
        })
        card.appendChild(botonSacar)
    }

    if (pantallaPoner) {
        let botonPoner = document.createElement('button')
        botonPoner.innerHTML = `Poner`
        botonPoner.type = 'button'
        botonPoner.className = `btn btn-success rounded-0 rounded-bottom-2`
        botonPoner.addEventListener('click', (botonApretado) => {
            resolve(jugador)
        })
        card.appendChild(botonPoner)
    }

    row.appendChild(card)
    contenedor.appendChild(row)
}

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    let contenedor = await limpiarContenedor('Listado de Jugadores')

    await new Promise(resolve => setTimeout(resolve, 1000));
    let jugadores = await obtenerJugadoresLocalStorage()
    let jugadoresJugando = 0
    jugadores.forEach(jugador => {
        if (jugador.jugando) {
            jugadoresJugando += 1
        }
    })
    
    jugadores.forEach(jugador => {
        tarjetaJugador(contenedor, jugador, jugadoresJugando, listarJugadores)
    })
};

const verPartido = async (cambiosRestantes = 3) => {
    let contenedor = await limpiarContenedor('Jugadores en el Partido')

    if (cambiosRestantes > 0){
        let row1 = document.createElement('div')
        row1.className = 'row mx-0'

        let col1 = document.createElement('div')
        col1.className = 'col-4'

        let realizarCambio = document.createElement('button')
        realizarCambio.innerHTML = 'Realizar Cambio'
        realizarCambio.type = 'button'
        realizarCambio.className = 'btn btn-info rounded-0'
        realizarCambio.addEventListener('click', (botonApretado) => {
            cambio(cambiosRestantes)
        })
        realizarCambio.className = 'col-4 text-center mx-0 p-3 bg-success border border-success'

        row1.appendChild(col1)
        row1.appendChild(realizarCambio)
        contenedor.appendChild(row1)

        let row2 = document.createElement('div')
        row2.className = 'row mx-0'

        let col2 = document.createElement('div')
        col2.className = 'col-4'

        let divCambios = document.createElement('div')
        divCambios.className = ('col-4 my-1')
        let cartelCambios = document.createElement('h2')
        cartelCambios.innerHTML = `Cambios restantes: ${cambiosRestantes}`
        cartelCambios.className = 'text-center mx-0 my-0 p-3 bg-danger border border-info'

        divCambios.appendChild(cartelCambios)

        row2.appendChild(col2)
        row2.appendChild(divCambios)
        contenedor.appendChild(row2)
    }
    else{
        let row1 = document.createElement('div')
        row1.className = 'row mx-0'

        let col1 = document.createElement('div')
        col1.className = 'col-4'

        let cartelSinCambios = document.createElement('h2')
        cartelSinCambios.innerHTML = `No quedan mas cambios`
        cartelSinCambios.className = 'col-4 text-center mx-0 my-0 p-3 bg-danger border border-info'

        row1.appendChild(col1)
        row1.appendChild(cartelSinCambios)
        contenedor.appendChild(row1)
    }

    let jugadores = await obtenerJugadoresLocalStorage()
    await new Promise(resolve => setTimeout(resolve, 1000));
    let jugadoresJugando = 0

    jugadores.forEach(jugador => {
        if (jugador.jugando) {
            jugadoresJugando += 1
            tarjetaJugador(contenedor, jugador, jugadoresJugando, verPartido, false)
        }
    }
    )
}

const cambio = async (cambiosRestantes) => {
    let contenedor = await limpiarContenedor('Cambio')

    let jugadores = await obtenerJugadoresLocalStorage()
    await new Promise(resolve => setTimeout(resolve, 1000));
    let jugadoresJugando = 0

    jugadorSacar = await new Promise(resolve => {
        jugadores.forEach(jugador => {
            if (jugador.jugando) {
                jugadoresJugando += 1
                tarjetaJugador(contenedor,
                    jugador,
                    jugadoresJugando,
                    cambio,
                    false,
                    true,
                    false,
                    resolve)
            }
        }
        )
    })

    contenedor = await limpiarContenedor('Cambio')

    jugadorPoner = await new Promise(resolve => {
        jugadores.forEach(jugador => {
            if (!jugador.jugando) {
                tarjetaJugador(contenedor,
                    jugador,
                    jugadoresJugando,
                    cambio,
                    false,
                    false,
                    true,
                    resolve)
            }
        }
        )
    })

    await ponerAJugar(jugadorSacar, jugadoresJugando)
    jugadoresJugando -=1
    await ponerAJugar(jugadorPoner, jugadoresJugando)
    cambiosRestantes -= 1
    verPartido(cambiosRestantes)
}

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (jugadorCambio, nuevaPosicion, metodo) => {
    let jugadores = await obtenerJugadoresLocalStorage();
    try {
        let posJugador = jugadores.indexOf(jugadores.find(jugador => jugador.id === jugadorCambio.id))
        jugadores[posJugador].posicion = nuevaPosicion
        guardarJugadoresLocalStorage(jugadores)
        metodo()
    }
    catch (error) {
        console.error('Error:', error.message);
    }
};

const ponerAJugar = async (jugadorJugar, jugadoresJugando, metodo = () => {}) => {
    let jugadores = await obtenerJugadoresLocalStorage();
    try {
        let posJugador = jugadores.indexOf(jugadores.find(jugador => jugador.id === jugadorJugar.id))
        console.log((jugadoresJugando == 11 && jugadores[posJugador].jugando) || jugadoresJugando < 11)
        if ((jugadoresJugando == 11 && jugadores[posJugador].jugando) || jugadoresJugando < 11) {
            jugadores[posJugador].jugando = !jugadores[posJugador].jugando
            guardarJugadoresLocalStorage(jugadores)
            metodo()
        }
        else {
            throw new Error('No se pueden meter mas jugadores')
        }
    }
    catch (error) {
        alert(error.message);
    }
};

limpiarContenedor()