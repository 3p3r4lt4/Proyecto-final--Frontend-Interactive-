# 🐉 Dragon Ball Characters

Aplicación web interactiva para explorar personajes del universo Dragon Ball, desarrollada con JavaScript vanilla, HTML5 y CSS3.

![Dragon Ball App](https://img.shields.io/badge/Dragon%20Ball-Characters-orange?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## 📋 Descripción

Esta aplicación consume la API de Dragon Ball para mostrar información detallada de los personajes del anime. Incluye funcionalidades de paginación, sistema de favoritos con persistencia en localStorage, y un diseño responsive.

## ✨ Características

- **Listado de personajes**: Visualización en tarjetas con imagen, nombre, género, raza y nivel de Ki
- **Sistema de favoritos**: Agrega/elimina personajes de favoritos con persistencia en localStorage
- **Paginación**: Navegación entre páginas (8 personajes por página)
- **Panel de detalles**: Información completa del personaje seleccionado
- **Diseño responsive**: Adaptable a diferentes tamaños de pantalla
- **Notificaciones**: Feedback visual al agregar/eliminar favoritos
- **Datos de respaldo**: Funcionalidad offline con datos fallback

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos con variables CSS, Flexbox, Grid y animaciones
- **JavaScript ES6+**: Lógica de la aplicación (async/await, módulos, arrow functions)
- **Font Awesome**: Iconografía
- **LocalStorage API**: Persistencia de favoritos
- **Fetch API**: Consumo de API REST

## 📁 Estructura del Proyecto

```
ProyectoFinal-Mod.2/
│
├── index.html      # Estructura HTML principal
├── estilos.css     # Estilos y diseño responsive
├── main.js         # Lógica de la aplicación
└── README.md       # Documentación
```

## 🚀 Instalación y Uso

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/3p3r4lt4/Proyecto-final--Frontend-Interactive-.git
   ```

2. **Navega al directorio**
   ```bash
   cd Proyecto-final--Frontend-Interactive-
   ```

3. **Abre el proyecto**
   - Abre `index.html` en tu navegador
   - O usa una extensión como Live Server en VS Code

## 🔗 API Utilizada

- **Dragon Ball API**: `https://dragonball-api.com/api/characters`

## 📱 Responsive Design

La aplicación se adapta a diferentes dispositivos:

| Dispositivo | Breakpoint |
|-------------|------------|
| Desktop     | > 1200px   |
| Tablet      | 768px - 1200px |
| Mobile      | < 768px    |

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Naranja primario | `#FF6B00` | Botones, acentos |
| Azul secundario | `#3366CC` | Enlaces, detalles |
| Fondo | `#f5f5f5` | Background general |
| Texto | `#333333` | Texto principal |

## 📝 Funcionalidades Principales

### Obtener Personajes
```javascript
const fetchCharacters = async (page = 1) => {
  const response = await fetch(API_URL);
  const data = await response.json();
  // Paginación manual
  return paginatedCharacters;
};
```

### Sistema de Favoritos
```javascript
const toggleFavorite = (character) => {
  // Agregar o quitar de favoritos
  localStorage.setItem('db-favorites', JSON.stringify(favorites));
};
```

## 👤 Autor

**Eduardo Peralta**
- GitHub: [@3p3r4lt4](https://github.com/3p3r4lt4)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

⭐ Si te gustó este proyecto, ¡dale una estrella en GitHub!