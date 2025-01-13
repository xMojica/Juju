# Prueba técnica Juju

Esta es una API RESTful construida utilizando **Node.js** y **Express**. Esta API permite gestionar libros y usuarios. A continuación, encontrarás las instrucciones necesarias para instalar, configurar y ejecutar la API, tambien se ha creado una interfaz con react un poco ligera.

## Requisitos minimos

-   Git
-   Node.js v22.13.0
-   Editor de codigo
-   Conexion a internet

## Instalación (API)

1. Abre una terminal en tu maquina local y clona el repositorio con:

```bash
git clone https://github.com/xMojica/Juju.git
```

2. Accede a la carpeta Juju que contiene el proyecto con:

```bash
cd Juju
```

3. Accede a la carpeta que contiene la Api con:

```bash
cd Api
```

4. Instala las dependencias necesarias con:

```bash
npm install
```

5. Crea un archivo **.env** y agrega las variables de entorno, en este caso son:

```bash
PORT = 3001
MONGODB_URI = mongodb+srv://samojica08:admin@cluster0.mcnne.mongodb.net/librosdb?retryWrites=true&w=majority
JWT_TOKEN_SECRET=FCBKRmaexazIcQOgGqnaVyZXHkOwuchweQeRqrJTChcDgutJBMZaLMkHDdMTxTKjKxFAQeVTkgpxmXoXJjSrhGtRePYrnfeDsrNjDIROsGLCRfVeDsoZXVRWzVNqjFfx
```

6. Ejecuta el comando para levantar el servidor:

```bash
node app.js
```

Debes de tener el siguiente mensaje en consola:

```bash
Servidor corriendo en: http://localhost:3001
Base de datos conectada con exito.
```

Esto quiere decir que tienes el servidor que contiene la API disponible para usarse.

## Instalacion (Cliente)

1. Abre una terminal en la raiz del proyecto Juju

2. Abre la carpeta del cliente con el comando:

```bash
cd Client
```

3. Instala las dependencias necesarias con:

```bash
npm install
```

4. Ejecuta el comando para levantar el cliente:

```bash
npm run dev
```

Debes de tener el siguiente mensaje en consola:

```bash
> gestorlibros@0.0.0 dev
> vite
> Local:   http://localhost:5173/
```

Esto quiere decir que tienes el servidor que contiene la interfaz para el cliente disponible para usarse.

## Autor

-   [Santiago Mojica Jiménez](https://github.com/xMojica)
