// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const id = obtenerJugadoresLocalStorage().length + 1
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const jugando = false;

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);

        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ id, nombre, edad, posicion, jugando });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
        listarJugadores()
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const limpiarContenedor = async (textoTitulo) => {
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

const tarjetaJugador = async (contenedor, jugador, jugadoresJugando, metodo) => {
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

    let cambiarPosicion = document.createElement('button')
    cambiarPosicion.innerHTML = 'Cambiar Posicion'
    cambiarPosicion.type = 'button'
    cambiarPosicion.className = 'btn btn-info rounded-0'
    cambiarPosicion.addEventListener('click', (botonApretado) => {
        nuevaPosicion = prompt("Ingrese la nueva posicion del jugador:");
        asignarPosicion(jugador.id, nuevaPosicion, metodo)
    })
    card.appendChild(cambiarPosicion)

    let botonJugar = document.createElement('button')
    botonJugar.innerHTML = `${jugador.jugando ? 'Sacar' : 'Poner a Jugar'}`
    botonJugar.type = 'button'
    botonJugar.className = `btn btn-${jugador.jugando ? 'danger' : 'success'} rounded-0 rounded-bottom-2`
    botonJugar.addEventListener('click', (botonApretado) => {
        ponerAJugar(jugador.id, jugadoresJugando, metodo)
    })
    card.appendChild(botonJugar)

    row.appendChild(card)
    contenedor.appendChild(row)
}

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    let contenedor = await limpiarContenedor('Listado de Jugadores')

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

    let jugadores = await obtenerJugadoresLocalStorage()
    let jugadoresJugando = 0

    jugadores.forEach(jugador => {
        if (jugador.jugando) {
            jugadoresJugando += 1
            tarjetaJugador(contenedor, jugador, jugadoresJugando, verPartido)
        }
    }
    )
    console.log(`Cantidad de jugadores jugando ${jugadoresJugando}`)
}

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (id, nuevaPosicion, metodo) => {
    let jugadores = await obtenerJugadoresLocalStorage();
    try {
        posJugador = jugadores.indexOf(jugadores.find(jugador => jugador.id === id))
        jugadores[posJugador].posicion = nuevaPosicion
        guardarJugadoresLocalStorage(jugadores)
        metodo()
    }
    catch (error) {
        console.error('Error:', error.message);
    }
};

const ponerAJugar = async (id, jugadoresJugando, metodo) => {
    let jugadores = await obtenerJugadoresLocalStorage();
    try {
        posJugador = jugadores.indexOf(jugadores.find(jugador => jugador.id === id))
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

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
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
