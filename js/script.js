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

// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    let contenedor = document.getElementById("contenedor")
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
    let jugadores = await obtenerJugadoresLocalStorage()
    let jugadoresJugando = 0

    jugadores.forEach(jugador => {
        if(jugador.jugando){
            jugadoresJugando += 1
        }
        let row = document.createElement('div')

        let card = document.createElement('div')

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
        jugando.innerHTML = `${jugador.jugando ? 'Jugando': 'No esta jugando'} `
        card.appendChild(jugando)
        
        let cambiarPosicion = document.createElement('button')
        cambiarPosicion.innerHTML = 'Cambiar Posicion'
        cambiarPosicion.addEventListener('click', (botonApretado)=>{
            nuevaPosicion = prompt("Ingrese la nueva posicion del jugador:");
            asignarPosicion(jugador.id, nuevaPosicion)
        })
        card.appendChild(cambiarPosicion)
        
        let botonJugar = document.createElement('button')
        botonJugar.innerHTML = `${jugador.jugando ? 'Sacar':'Poner a Jugar'}`
        botonJugar.addEventListener('click', (botonApretado) => {
            ponerAJugar(jugador.id, jugadoresJugando)
        })
        card.appendChild(botonJugar)

        row.appendChild(card)
        contenedor.appendChild(row)
    }
    )
    console.log(`Cantidad de jugadores jugando ${jugadoresJugando}`)
};

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async (id, nuevaPosicion) => {
    let jugadores = await obtenerJugadoresLocalStorage();
    try{
        posJugador = jugadores.indexOf(jugadores.find(jugador => jugador.id === id))
        jugadores[posJugador].posicion = nuevaPosicion
        guardarJugadoresLocalStorage(jugadores)
        listarJugadores()
    }
    catch(error){
        console.error('Error:', error.message);
    }
};

const ponerAJugar = async (id, jugadoresJugando) => {
    let jugadores = await obtenerJugadoresLocalStorage();
    try{
        posJugador = jugadores.indexOf(jugadores.find(jugador => jugador.id === id))
        if((jugadoresJugando == 11 && jugadores[posJugador].jugando) || jugadoresJugando < 11){
            jugadores[posJugador].jugando = !jugadores[posJugador].jugando
            guardarJugadoresLocalStorage(jugadores)
            listarJugadores()
        }
        else{
            console.log('No se pueden agregar mas jugadores')
        }
    }
    catch(error){
        console.error('Error:', error.message);
    }
};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
};
listarJugadores()
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
