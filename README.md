Aplicacion usada para la gestion de un equipo de fútbol. Para correrla usaremos index.html.

Todo el proyecto corre en una unica pantalla que se actualiza al entrar a cada uno de los menues de la barra de navegación.

# Funciones

-Agregar Jugador: Pestaña con un formulario que consigue datos para agregar un nuevo jugador a la lista. No puede agregarse uno si hay un jugador con el mismo nombre ya guardado.

-Ver Jugadores: Muestra un listado con tarjetas de todos los jugadores que tengamos, podremos poner cada jugador a jugar, sacarlo si ya esta jugando o cambiar la posicion en la que juega.

-Ver Partido: simula un partido en juego. Muestra todos los jugadores que se encuentren jugando, podremos realizar cambios, para esto eligiremos un jugador para sacar y uno para poner.


# Notas

-No puede haber mas de 11 jugadores asignados para jugar.

-Solo se admiten hasta 3 cambios por partidos.
-La pantalla de agregar jugador permite agregar Arqueros, Delanteros, Defensores y Mediocampistas; pero si usamos la funcion de cambiar posición desde la lista de jugadores podremos ponerle el nombre de posición que deseemos.

-Si entramos a una pantalla donde aparezcan tarjetas de jugadores y nos cambiamos de lugar antes de que se rendericen estas apareceran en cualquier pantalla a la que nos movamos (Por ejemplo seleccionamos la pestaña ver jugadores y rapidamente apretamos en ver partido)

-Solo probe la aplicación en Mozilla Firefox, desconozco cualquier problema que se genere por usarse en otro navegador.


# Challenge-Promises
Ejercicio: Gestión de equipo de fútbol
Desarrolla una aplicación para gestionar un equipo de fútbol, que permita realizar operaciones como agregar jugadores, listar jugadores, asignar posiciones y realizar cambios durante un partido. Utiliza promesas, async/await, try/catch y composición de funciones asíncronas para manejar las operaciones de forma segura y eficiente.

# Requisitos:
1) La aplicación debe permitir agregar nuevos jugadores al equipo proporcionando su nombre, edad y posición.
2) Debe ser posible listar todos los jugadores del equipo, indicando su nombre, edad y posición.
3) Implementa un mecanismo para asignar posiciones a los jugadores, como delantero, centrocampista, defensa o portero.
4) Proporciona una función para realizar cambios durante un partido, que permita sustituir jugadores de acuerdo a las reglas del fútbol.
5) Utiliza un almacenamiento persistente para los datos del equipo y los jugadores, como una base de datos simple (puede ser simulado con archivos en el sistema de archivos).
6) Maneja los errores de manera adecuada utilizando try/catch para capturar errores asíncronos y promesas rechazadas.

# Pasos Sugeridos
1) Define una estructura de datos para representar a un jugador, que incluya su nombre, edad, posición y estado (titular, suplente o lesionado).
2) Implementa funciones asíncronas para agregar un nuevo jugador, listar jugadores, asignar posiciones y realizar cambios durante un partido.
3) Utiliza promesas para manejar la lectura y escritura de datos desde y hacia el almacenamiento persistente.
4) Crea una función principal asíncrona que interactúe con el usuario, permitiéndole realizar las operaciones mencionadas.
5) Utiliza la composición de funciones asíncronas para realizar operaciones complejas, como realizar cambios durante un partido.
