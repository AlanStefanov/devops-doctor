
# DevOps Doctor 🏥

Una plataforma de recursos y herramientas para profesionales DevOps, diseñada para compartir conocimientos y mejores prácticas.

## Características 🚀

- **Gestión de Recursos**: Biblioteca completa de recursos DevOps
- **Categorías**: CI/CD, Infraestructura, Monitoreo, Seguridad
- **Multi-idioma**: Soporte para Español e Inglés
- **Panel de Administración**: Gestión de usuarios y recursos
- **Interfaz Moderna**: UI intuitiva con Tailwind y Shadcn/ui

## Tecnologías 💻

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Base de Datos**: PostgreSQL con Drizzle ORM
- **Autenticación**: Passport.js
- **Internacionalización**: React-Intl

## Inicio Rápido 🏃‍♂️

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```
3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto 📁

```
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Tipos y esquemas compartidos
└── public/          # Archivos estáticos
```

## API Endpoints 🛣️

- `GET /api/resources` - Obtener recursos
- `POST /api/resources` - Crear recurso
- `GET /api/users` - Obtener usuarios (admin)
- `POST /api/register` - Registrar usuario

## Contribuir 🤝

1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Envía un pull request

## Licencia 📄

MIT License

## Autor ✨

Alan Stefanov
