// Configuración
const LIMIT = 8;
const API_URL = 'https://dragonball-api.com/api/characters';

// Estado de la aplicación
let currentPage = 1;
let totalPages = 1;
let totalCharacters = 0;
let favorites = JSON.parse(localStorage.getItem('db-favorites')) || [];

// Elementos del DOM
const charactersList = document.getElementById('charactersList');
const favoritesCount = document.getElementById('favoritesCount');
const totalCount = document.getElementById('totalCount');
const currentPageSpan = document.getElementById('currentPage');
const itemsPerPage = document.getElementById('itemsPerPage');

// Elementos de detalles
const detailImage = document.getElementById('detailImage');
const detailName = document.getElementById('detailName');
const detailGender = document.getElementById('detailGender');
const detailRace = document.getElementById('detailRace');
const detailKi = document.getElementById('detailKi');
const detailAffiliation = document.getElementById('detailAffiliation');
const detailAge = document.getElementById('detailAge');
const detailHairColor = document.getElementById('detailHairColor');

// Botones de paginación
const firstPageButton = document.getElementById('firstPage');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const lastPageButton = document.getElementById('lastPage');

// Función para obtener personajes de la API
const fetchCharacters = async (page = 1) => {
  try {
    // La API de Dragon Ball no soporta paginación con parámetros limit/offset
    // así que obtenemos todos los personajes y manejamos la paginación manualmente
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    totalCharacters = data.items ? data.items.length : data.length;
    
    // Si la API devuelve un objeto con propiedad items, usamos eso
    // de lo contrario, asumimos que es un array directo
    const allCharacters = data.items || data;
    
    // Calcular páginas
    totalPages = Math.ceil(totalCharacters / LIMIT);
    
    // Paginación manual
    const startIndex = (page - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;
    const paginatedCharacters = allCharacters.slice(startIndex, endIndex);
    
    // Procesar personajes para agregar información de favoritos
    const processedCharacters = paginatedCharacters.map(character => {
      const isFavorite = favorites.some(fav => fav.id === character.id);
      return {
        ...character,
        isFavorite
      };
    });
    
    return processedCharacters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    // Datos de ejemplo en caso de error en la API
    return getFallbackData(page);
  }
};

// Datos de ejemplo para cuando la API falle
const getFallbackData = (page) => {
  const fallbackCharacters = [
    {
      id: 1,
      name: "Goku",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfx9z2m-35485be6-8ed7-4d0d-aa8e-9ad3f1a293e4.png/v1/fill/w_1280,h_1920,q_80,strp/goku_ultra_instinct__fan_art__by_marllonrafael_dfx9z2m-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ4OXoybS0zNTQ4NWJlNi04ZWQ3LTRkMGQtYWE4ZS05YWQzZjFhMjkzZTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.5wGXAArmE85NqZzP6u2bunxwZ-EAui_7qWbls3Nt5mw",
      gender: "Male",
      race: "Saiyan",
      ki: "1,000,000+",
      affiliation: "Z Fighter",
      age: "43",
      hairColor: "Black"
    },
    {
      id: 2,
      name: "Vegeta",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy0kq2-b22f54fe-50c7-49db-b047-c78ea240d8f6.png/v1/fill/w_1280,h_1920,q_80,strp/vegeta_super_saiyan_blue_evo__fan_art__by_marllonrafael_dfy0kq2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5MGtxMi1iMjJmNTRmZS01MGM3LTQ5ZGItYjA0Ny1jNzhlYTI0MGQ4ZjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.H1S4M4bNcx7Dnsa2XvEhmD7tX5q9sp7kK_jt2XOGjC4",
      gender: "Male",
      race: "Saiyan",
      ki: "900,000+",
      affiliation: "Z Fighter",
      age: "48",
      hairColor: "Black"
    },
    {
      id: 3,
      name: "Piccolo",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy0v0y-a5dbfb22-878a-4cf7-b1d2-ec98b8f7e39c.png/v1/fill/w_1280,h_1920,q_80,strp/piccolo__fan_art__by_marllonrafael_dfy0v0y-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5MHYweS1hNWRiZmIyMi04NzhhLTRjZjctYjFkMi1lYzk4YjhmN2UzOWMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.bV8nYX7kWVyMi8kcpOC9dLcTvOq7w_ig4Rz1-3cNcEs",
      gender: "Male",
      race: "Namekian",
      ki: "500,000+",
      affiliation: "Z Fighter",
      age: "28+",
      hairColor: "None"
    },
    {
      id: 4,
      name: "Bulma",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy8djb-c34bd39b-3a74-4793-bc83-04b64e5df3b4.png/v1/fill/w_1280,h_1920,q_80,strp/bulma__fan_art__by_marllonrafael_dfy8djb-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5OGRqYi1jMzRiZDM5Yi0zYTc0LTQ3OTMtYmM4My0wNGI2NGU1ZGYzYjQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ncyJdfQ.h7C4Rh-jOGhFeJNqkEk88r2WcOD_XgTJWnfnpvPYJBo",
      gender: "Female",
      race: "Human",
      ki: "Low",
      affiliation: "Capsule Corp",
      age: "46",
      hairColor: "Purple/Blue"
    },
    {
      id: 5,
      name: "Frieza",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy6h64-7328de57-3fe6-44a5-bc2e-29b3d3e01f0e.png/v1/fill/w_1280,h_1920,q_80,strp/frieza__fan_art__by_marllonrafael_dfy6h64-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5Nmg2NC03MzI4ZGU1Ny0zZmU2LTQ0YTUtYmMyZS0yOWIzZDNlMDFmMGUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rNyl6AW0oxwyY_g_6DHO1m1kmrPipZkXr_FPQ5rcdSQ",
      gender: "Male",
      race: "Frieza Race",
      ki: "1,200,000+",
      affiliation: "Frieza Force",
      age: "70+",
      hairColor: "None"
    },
    {
      id: 6,
      name: "Cell",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy6tbv-808d9a23-eef5-4861-ae37-2d9afc627000.png/v1/fill/w_1280,h_1920,q_80,strp/cell__fan_art__by_marllonrafael_dfy6tbv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5NnRidi04MDhkOWEyMy1lZWY1LTQ4NjEtYWUzNy0yZDlhZmM2MjcwMDAucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DGQYbIK_LoYABYw82_T5h4PibWouM7Kbmy35_8WPDso",
      gender: "Male",
      race: "Bio-Android",
      ki: "900,000+",
      affiliation: "Self",
      age: "8+",
      hairColor: "None"
    },
    {
      id: 7,
      name: "Trunks",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy74re-59526434-53aa-4775-b5c9-6e49026f85ea.png/v1/fill/w_1280,h_1920,q_80,strp/future_trunks__fan_art__by_marllonrafael_dfy74re-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5NzRyZS01OTUyNjQzNC01M2FhLTQ3NzUtYjVjOS02ZTQ5MDI2Zjg1ZWEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ._E6g_edl7eJ7GXcRr6rMF3YrtXjPQUYKRT3ffWRtDkA",
      gender: "Male",
      race: "Half-Saiyan",
      ki: "800,000+",
      affiliation: "Z Fighter",
      age: "Future: 31",
      hairColor: "Lavender"
    },
    {
      id: 8,
      name: "Gohan",
      image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/84dc13b7-7b5c-444c-bc26-1c3a4d004081/dfy7a9r-12667707-88ed-4db7-99bb-5e070fb5f923.png/v1/fill/w_1280,h_1920,q_80,strp/ultimate_gohan__fan_art__by_marllonrafael_dfy7a9r-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyMCIsInBhdGgiOiJcL2ZcLzg0ZGMxM2I3LTdiNWMtNDQ0Yy1iYzI2LTFjM2E0ZDAwNDA4MVwvZGZ5N2E5ci0xMjY2NzcwNy04OGVkLTRkYjctOTliYi01ZTA3MGZiNWY5MjMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.HU0TikXj4rXQQq5mX4njQZrmIszR6jO1ZobpEdKQrRg",
      gender: "Male",
      race: "Half-Saiyan",
      ki: "900,000+",
      affiliation: "Z Fighter",
      age: "23",
      hairColor: "Black"
    }
  ];
  
  totalCharacters = fallbackCharacters.length;
  totalPages = Math.ceil(totalCharacters / LIMIT);
  
  const startIndex = (page - 1) * LIMIT;
  const endIndex = startIndex + LIMIT;
  const paginatedCharacters = fallbackCharacters.slice(startIndex, endIndex);
  
  return paginatedCharacters.map(character => ({
    ...character,
    isFavorite: favorites.some(fav => fav.id === character.id)
  }));
};

// Función para mostrar detalles de un personaje
const showCharacterDetails = (character) => {
  detailImage.src = character.image || 'https://placehold.co/300x300/3366CC/FFFFFF?text=Dragon+Ball';
  detailImage.alt = character.name;
  
  // Manejo de errores en la imagen
  detailImage.onerror = () => {
    detailImage.src = 'https://placehold.co/300x300/3366CC/FFFFFF?text=Imagen+no+disponible';
  };
  
  detailName.textContent = character.name;
  detailGender.textContent = character.gender || 'Desconocido';
  detailRace.textContent = character.race || 'Desconocida';
  detailKi.textContent = character.ki || 'Desconocido';
  detailAffiliation.textContent = character.affiliation || 'Desconocida';
  detailAge.textContent = character.age || 'Desconocida';
  detailHairColor.textContent = character.hairColor || 'Desconocido';
};

// Función para alternar favoritos
const toggleFavorite = (character) => {
  const index = favorites.findIndex(fav => fav.id === character.id);
  
  if (index === -1) {
    // Agregar a favoritos
    favorites.push({
      id: character.id,
      name: character.name,
      image: character.image,
      race: character.race,
      gender: character.gender
    });
  } else {
    // Quitar de favoritos
    favorites.splice(index, 1);
  }
  
  // Guardar en localStorage
  localStorage.setItem('db-favorites', JSON.stringify(favorites));
  
  // Actualizar contador
  updateFavoritesCount();
  
  // Volver a renderizar los personajes para actualizar los botones de favoritos
  loadCharacters(currentPage);
  
  return index === -1; // Devuelve true si se agregó, false si se quitó
};

// Actualizar contador de favoritos
const updateFavoritesCount = () => {
  favoritesCount.textContent = `Favoritos: ${favorites.length}`;
};

// Actualizar contador total
const updateTotalCount = () => {
  totalCount.textContent = `Total: ${totalCharacters}`;
};

// Renderizar personajes en la página
const renderCharacters = (characters) => {
  charactersList.innerHTML = '';
  
  if (characters.length === 0) {
    charactersList.innerHTML = `
      <div class="no-characters">
        <h3>No se encontraron personajes</h3>
        <p>Intenta recargar la página o verifica tu conexión a internet.</p>
      </div>
    `;
    return;
  }
  
  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.className = 'character-card';
    
    characterCard.innerHTML = `
      <img src="${character.image || 'https://placehold.co/300x200/3366CC/FFFFFF?text=Dragon+Ball'}" 
           alt="${character.name}" 
           class="character-image"
           onerror="this.src='https://placehold.co/300x200/3366CC/FFFFFF?text=Imagen+no+disponible'">
      <div class="character-info">
        <h3 class="character-name">
          ${character.name}
          <button class="favorite-button ${character.isFavorite ? 'active' : ''}" 
                  onclick="handleFavoriteClick(${character.id}, '${character.name.replace(/'/g, "\\'")}', '${character.image || ''}')">
            <i class="fas fa-heart"></i>
          </button>
        </h3>
        <div class="character-detail">
          <i class="fas fa-venus-mars"></i>
          <span>${character.gender || 'Desconocido'}</span>
        </div>
        <div class="character-detail">
          <i class="fas fa-user-tag"></i>
          <span>${character.race || 'Desconocida'}</span>
        </div>
        <div class="character-detail">
          <i class="fas fa-bolt"></i>
          <span>Ki: ${character.ki || 'Desconocido'}</span>
        </div>
        <div class="character-actions">
          <button class="details-button" onclick="showCharacterDetails(${JSON.stringify(character).replace(/"/g, '&quot;')})">
            <i class="fas fa-info-circle"></i> Ver Detalles
          </button>
        </div>
      </div>
    `;
    
    charactersList.appendChild(characterCard);
  });
};

// Manejador de clic en favoritos (expuesto globalmente)
window.handleFavoriteClick = (id, name, image) => {
  const character = {
    id,
    name,
    image,
    isFavorite: favorites.some(fav => fav.id === id)
  };
  
  const added = toggleFavorite(character);
  
  // Mostrar notificación visual
  showNotification(added ? `¡${name} agregado a favoritos!` : `¡${name} eliminado de favoritos!`);
};

// Mostrar notificación temporal
const showNotification = (message) => {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
};

// Agregar estilos de animación para notificaciones
const addNotificationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .notification {
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);
};

// Actualizar estado de los botones de paginación
const updatePaginationButtons = () => {
  firstPageButton.disabled = currentPage === 1;
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
  lastPageButton.disabled = currentPage === totalPages;
  
  currentPageSpan.textContent = `Página ${currentPage} de ${totalPages}`;
  itemsPerPage.textContent = LIMIT;
};

// Cargar personajes para una página específica
const loadCharacters = async (page) => {
  // Mostrar indicador de carga
  charactersList.innerHTML = '<div class="loading">Cargando personajes...</div>';
  
  try {
    const characters = await fetchCharacters(page);
    
    // Renderizar personajes
    renderCharacters(characters);
    
    // Actualizar estado de la aplicación
    currentPage = page;
    updatePaginationButtons();
    updateTotalCount();
    
    // Mostrar detalles del primer personaje si hay resultados
    if (characters.length > 0) {
      showCharacterDetails(characters[0]);
    }
  } catch (error) {
    console.error('Error loading characters:', error);
    charactersList.innerHTML = `
      <div class="error">
        <h3>Error al cargar los personajes</h3>
        <p>${error.message}</p>
        <button onclick="loadCharacters(${currentPage})">Reintentar</button>
      </div>
    `;
  }
};

// Configurar event listeners para paginación
const setupPagination = () => {
  firstPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      loadCharacters(1);
    }
  });
  
  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      loadCharacters(currentPage - 1);
    }
  });
  
  nextPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      loadCharacters(currentPage + 1);
    }
  });
  
  lastPageButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      loadCharacters(totalPages);
    }
  });
};

// Inicializar la aplicación
const init = () => {
  // Agregar estilos para notificaciones
  addNotificationStyles();
  
  // Configurar paginación
  setupPagination();
  
  // Cargar personajes iniciales
  loadCharacters(currentPage);
  
  // Actualizar contadores
  updateFavoritesCount();
  
  // Configurar detalle por defecto
  detailName.textContent = 'Selecciona un personaje';
};

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);