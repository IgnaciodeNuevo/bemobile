# BeMobile - Marvel Characters

Aplicación web para explorar personajes de cómics utilizando la API de ComicVine.

## Demo

La aplicación permite:
- Ver un listado de 50 personajes de cómics
- Buscar personajes por nombre
- Añadir/quitar personajes de favoritos (persistente en localStorage)
- Ver el detalle de cada personaje con sus cómics asociados

## Tecnologías

- **React 18** con TypeScript
- **Vite** como bundler
- **React Router** para navegación
- **SASS** para estilos
- **Vitest** + React Testing Library para tests
- **Context API** para gestión de estado

## Requisitos

- Node.js >= 18
- pnpm (recomendado) o npm

## Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd bemobile

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
```

## Scripts disponibles
```bash
# Desarrollo
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview

# Tests
pnpm test        # Watch mode
pnpm test:run    # Single run
pnpm coverage    # Con cobertura
```

## Estructura del proyecto
```
src/
├── components/        # Componentes reutilizables
│   ├── CharacterCard/
│   ├── Favorite/
│   ├── Header/
│   ├── Logo/
│   └── SearchBar/
├── context/           # Context API (Favoritos)
├── pages/             # Páginas/Vistas
│   ├── Home/
│   └── CharacterDetail/
├── services/          # Llamadas a la API
├── types/             # Tipos TypeScript
├── tests/             # Configuración de tests
└── App.tsx            # Componente raíz
```

## Tests

El proyecto incluye tests unitarios para:
- Componentes (Header, SearchBar, CharacterCard, etc.)
- Context (FavoritesContext)
- Servicios (API)
- Páginas (Home, CharacterDetail)
```bash
# Ejecutar todos los tests
pnpm test:run

# Ver cobertura
pnpm coverage
```

## Características

### Accesibilidad
- Etiquetas ARIA para lectores de pantalla
- Navegación por teclado
- Labels descriptivos en botones e inputs
- Roles semánticos (banner, main, search, etc.)

### Responsive
- Grid fluido con CSS Grid (`auto-fill` + `minmax`)
- Adaptación automática de columnas según el ancho
- Diseño mobile-first

### Favoritos
- Persistencia en localStorage
- Contador en tiempo real en el header
- Toggle desde la card o el detalle del personaje

## API

La aplicación utiliza la [API de ComicVine](https://comicvine.gamespot.com/api/). En desarrollo, las peticiones se proxean a través de Vite para evitar problemas de CORS.

## Autor

Desarrollado como prueba técnica para BeMobile.
```

Crea también `.env.example`:
```
VITE_API_KEY=tu_api_key_aqui