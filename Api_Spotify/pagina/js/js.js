const clientId = 'cefedf7b11374809845d2ddc0cf6e89c';
const redirectUri = 'http://127.0.0.1:5500/index.html';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const scopes = ['user-read-private user-read-email playlist-read-private'];

// Obtener el botón de inicio de sesión
const loginButton = document.getElementById('login-button');
// Obtener el elemento del mensaje de inicio de sesión
const loginMessage = document.getElementById('login-message');
// Obtener el elemento del nombre de usuario
const userNameElement = document.getElementById('user-name');
// Obtener el elemento del nombre de usuario
const correoElement = document.getElementById('correo');

// Al hacer clic en el botón de inicio de sesión
loginButton.addEventListener('click', () => {
    // Redirigir al usuario a la página de inicio de sesión de Spotify
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
});

// Verificar si se ha iniciado sesión correctamente
const params = new URLSearchParams(window.location.hash.substring(1));


const accessToken = params.get('access_token');

if (params.has('access_token')) {
    // Ocultar el botón de inicio de sesión
    loginButton.style.display = 'none';

    // Mostrar el mensaje de inicio de sesión
    loginMessage.style.display = 'block';



    const userProfileEndpoint = 'https://api.spotify.com/v1/me';

    // Realizar la solicitud a la API de Spotify
    fetch(userProfileEndpoint, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then(response => response.json())
        .then(data => {
            const userName = data.display_name;
            console.log('Nombre de usuario:', userName);
            userNameElement.innerText = userName;
            const correo = data.email;

            correoElement.innerHTML = correo;
        })
        .catch(error => console.error('Error al obtener información del perfil del usuario:', error));
}



const playlistsEndpoint = 'https://api.spotify.com/v1/me/playlists';
fetch(playlistsEndpoint, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
})
    .then(response => response.json())
    .then(data => {
        // Código para manejar la respuesta de la API (listas de reproducción)
        console.log('Listas de reproducción del usuario:', data.items);

        const playlists = data.items;
        playlists.forEach(playlist => {
            console.log('Nombre de la lista de reproducción:', playlist.name);
            console.log('Propietario de la lista de reproducción:', playlist.owner.display_name);
            console.log('URL de la lista de reproducción:', playlist.external_urls.spotify);
            // Puedes mostrar esta información en tu interfaz de usuario
        });


    })
    .catch(error => console.error('Error al obtener listas de reproducción:', error));



/*
-Usuarios (/v1/me): Permite acceder a información del usuario autenticado. Por ejemplo, obtener detalles del perfil, listas de reproducción del usuario, etc.

-Listas de Reproducción (/v1/playlists): Proporciona acceso a las listas de reproducción, ya sean creadas por el usuario autenticado o listas de reproducción públicas.

-Canciones (/v1/tracks): Permite acceder a detalles sobre canciones específicas, como información del artista, nombre de la canción, etc.

-Álbumes (/v1/albums): Proporciona información sobre álbumes específicos, como la lista de canciones en el álbum, el artista, etc.

-Artistas (/v1/artists): Permite acceder a información sobre artistas específicos, como sus canciones principales, álbumes, etc.

-Búsqueda (/v1/search): Permite realizar búsquedas en la base de datos de Spotify para obtener información sobre canciones, artistas, álbumes, listas de reproducción, etc.

-Top List (/v1/me/top): Proporciona acceso a las principales canciones, artistas y listas de reproducción del usuario autenticado.*/
