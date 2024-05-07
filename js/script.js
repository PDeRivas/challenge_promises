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
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ nombre, edad, posicion });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    let contenedor = document.getElementById("contenedor")
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    let jugadores = obtenerJugadoresLocalStorage()
    for(let x = 0; x < jugadores.length; x++){
        let row = document.createElement('div')

        let card = document.createElement('div')

        let nombre = document.createElement('h3')
        nombre.innerHTML = jugadores[x].nombre
        card.appendChild(nombre)
                
        let edad = document.createElement('p')
        edad.innerHTML = jugadores[x].edad
        card.appendChild(edad)

        let posicion = document.createElement('p')
        posicion.innerHTML = jugadores[x].posicion
        card.appendChild(posicion)

        row.appendChild(card)
        contenedor.appendChild(row)
    }
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (nombreJugador, nuevaPosicion) => {
    // Implementación para asignar una nueva posición a un jugador
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
