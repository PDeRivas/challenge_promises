// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
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
        inputNombre.placeholder = 'Nombre'
        inputNombre.className = 'form-control w-50'
        rowNombre.appendChild(labelNombre)
        rowNombre.appendChild(inputNombre)

        let rowEdad = document.createElement('div')
        rowEdad.className = 'row justify-content-center my-4 mx-0'
        let labelEdad = document.createElement('label')
        labelEdad.for = 'edad'
        let inputEdad = document.createElement('input')
        inputEdad.type = 'number'
        inputEdad.name = 'edad'
        inputEdad.placeholder = 'Edad'
        inputEdad.className = 'form-control w-50'
        rowEdad.appendChild(labelEdad)
        rowEdad.appendChild(inputEdad)

        let rowPosicion = document.createElement('div')
        rowPosicion.className = 'row justify-content-center my-4 mx-0'
        let labelPosicion = document.createElement('label')
        labelPosicion.for = 'posicion'
        let inputPosicion = document.createElement('input')
        inputPosicion.type = 'text'
        inputPosicion.name = 'posicion'
        inputPosicion.placeholder = 'Posicion'
        inputPosicion.className = 'form-control w-50'
        rowPosicion.appendChild(labelPosicion)
        rowPosicion.appendChild(inputPosicion)

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

            let jugadores = obtenerJugadoresLocalStorage();

            let formData = new FormData(data.target)
            let id = obtenerJugadoresLocalStorage().length + 1
            let nombre = formData.get('nombre')
            let edad = formData.get('edad')
            let posicion = formData.get('posicion')
            let jugando = false

            jugadores.push({ id, nombre, edad, posicion, jugando });
            guardarJugadoresLocalStorage(jugadores);

            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Jugador agregado correctamente.');
            listarJugadores()
        })
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
        tarjetaJugador(contenedor, jugador, jugadoresJugando, listarJugadores)
    }
    )
    console.log(`Cantidad de jugadores jugando ${jugadoresJugando}`)
};

const verPartido = async () => {
    let contenedor = await limpiarContenedor('Jugadores en el Partido')

    let row1 = document.createElement('div')
    row1.className = 'row mx-0'

    let col1 = document.createElement('div')
    col1.className = 'col-4'

    let realizarCambio = document.createElement('button')
    realizarCambio.innerHTML = 'Realizar Cambio'
    realizarCambio.type = 'button'
    realizarCambio.className = 'btn btn-info rounded-0'
    realizarCambio.addEventListener('click', (botonApretado) => {
        cambio(true)
    })
    realizarCambio.className = 'col-4 text-center mx-0 p-3 bg-success border border-success'
    row1.appendChild(col1)
    row1.appendChild(realizarCambio)
    contenedor.appendChild(row1)

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
    console.log(`Cantidad de jugadores jugando ${jugadoresJugando}`)
}

const cambio = async () => {
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
    console.log(jugadorSacar)

    contenedor = await limpiarContenedor('Cambio')

    jugadorPoner = await new Promise(resolve => {
        jugadores.forEach(jugador => {
            if (!jugador.jugando) {
                jugadoresJugando += 1
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

    await ponerAJugar(jugadorPoner, jugadoresJugando)
    await ponerAJugar(jugadorSacar, jugadoresJugando)
    verPartido()
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
        if ((jugadoresJugando == 11 && jugadores[posJugador].jugando) || jugadoresJugando < 11) {
            jugadores[posJugador].jugando = !jugadores[posJugador].jugando
            guardarJugadoresLocalStorage(jugadores)
            metodo()
        }
        else {
            console.log('No se pueden agregar mas jugadores')
        }
    }
    catch (error) {
        console.error('Error:', error.message);
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();

limpiarContenedor()