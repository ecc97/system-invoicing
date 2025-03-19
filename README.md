# System Invoicing

**System Invoicing** es una aplicación web para la gestión de facturas que integra autenticación, creación, listado, actualización y eliminación de facturas, junto con el registro de pagos. El proyecto está desarrollado con Next.js, TypeScript, Prisma, NextAuth y Tailwind CSS.

---

## Características

- **Autenticación con NextAuth:**  
  Autenticación por credenciales, que permite a cada usuario ver y gestionar únicamente sus propias facturas.

- **Gestión de Facturas (Invoices):**  
  - Crear facturas con campos como cliente (nombre y correo), items (cada item con descripción, precio unitario y cantidad) y el usuario que la crea.
  - Listado de facturas con paginación e Infinite Scroll.
  - Actualización y eliminación de facturas, incluyendo la gestión de items asociados.
  
- **Gestión de Pagos (Payments):**  
  La API registra pagos asociados a cada factura y actualiza su estado (por ejemplo, cambiando a "paid" cuando se alcanza el total). (Funcionalidad backend implementada; su interfaz se puede agregar en el futuro).

- **Interfaz de Usuario Moderna y Responsive:**  
  Se ha aplicado un diseño atractivo con Tailwind CSS, con componentes como tarjetas (cards) para visualizar cada factura y un NavBar para la navegación.

---

## Tecnologías Utilizadas

- **Next.js 15 (App Router):** Para la estructura y renderizado híbrido (Server Components y Client Components).
- **TypeScript:** Tipado estricto para mayor robustez.
- **Prisma:** ORM para interactuar con una base de datos PostgreSQL.
- **NextAuth:** Autenticación por credenciales.
- **Tailwind CSS:** Estilos modernos y responsive.
- **React Infinite Scroll Component:** Para cargar datos de forma incremental.

---

## Configuración y Ejecución

### Requisitos

- Node.js (versión 14 o superior)
- PostgreSQL (u otra base de datos compatible configurada en `.env`)

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ecc97/system-invoicing.git
   cd system-invoicing
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura el archivo `.env` con las variables necesarias, por ejemplo:
   ```env
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombrebasedatos
   DIRECT_URL=postgresql://usuario:contraseña@localhost:5432/nombrebasedatos
   NEXTAUTH_SECRET=tu_secreto
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Ejecuta el proyecto:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

La aplicación se iniciará en `http://localhost:3000`.

---

## Endpoints de la API

### Invoices

- **POST `/api/invoices`**  
  Crea una nueva factura. El cuerpo de la petición debe incluir `userId`, `clientName`, `clientEmail` y un arreglo de `items`.

- **GET `/api/invoices`**  
  Lista las facturas con paginación. Soporta parámetros `skip`, `take` y `userId` (para filtrar por usuario).

- **GET `/api/invoices/[id]`**  
  Obtiene una factura específica por su id, incluyendo relaciones (user, items, payments).

- **PUT `/api/invoices/[id]`**  
  Actualiza una factura (incluyendo la gestión de items: se eliminan los existentes y se crean nuevos).

- **DELETE `/api/invoices/[id]`**  
  Elimina una factura. Primero elimina los items y pagos asociados para cumplir con las restricciones de integridad.

### Payments

- **POST `/api/payments`**  
  Registra un pago para una factura y actualiza su estado según el total pagado.

---

## Frontend

- **Landing Page (`/`):**  
  Página pública con información del proyecto y enlaces para iniciar sesión y registrarse.

- **Dashboard de Facturas (`/invoices`):**  
  Página protegida que muestra las facturas del usuario autenticado mediante Infinite Scroll.

- **Crear Factura (`/invoices/new`):**  
  Formulario para crear una nueva factura.

- **Detalle de Factura (`/invoices/detail/[id]`):**  
  Página dinámica para ver, editar y eliminar una factura.

- **Autenticación:**  
  Utiliza NextAuth con credenciales. Los usuarios solo ven y gestionan sus propias facturas.

---

## Personalización y Mejoras

- Puedes agregar una interfaz para la gestión de pagos en el futuro.
- Se puede mejorar la experiencia de usuario agregando validaciones en el frontend.
- La UI está basada en Tailwind CSS, por lo que puedes personalizar colores, fuentes y estilos según tu identidad.

---

## Conclusión

**System Invoicing** es un proyecto sencillo pero escalable para la gestión de facturas. Integra autenticación, CRUD completo para facturas (con items) y un endpoint para pagos, todo ello utilizando tecnologías modernas y renderizado híbrido (Server y Client Components). ¡Es un excelente punto de partida para construir una solución de facturación personalizada!

---

## License
Este proyecto está disponible bajo la licencia MIT.