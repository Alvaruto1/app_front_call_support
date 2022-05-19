# Aplicación App Call Support
Herramienta para optimizar las llamadas de soporte. Tiene las siguientes funcionalidades
* Sistema de login(inicio de sesión y registro de empleados)
* Modulo de empleados (CRUD)
* Modulo de clientes (CRUD)
* Modulo de registro de llamadas (en construcción)
* Descarga en csv de clientes, empleado y registro de llamadas
## Frontend
APP implementada con react version 18.1.0, redux para el manejo del estado de los datos, bootstrap version 5.1.3 para el estilo de la APP. Se utilizaron las siguientes librerias:
|Libreria | Version |
| ------ | ------ |
| flask | 2.1.2 |
| flask-sqlalchemy | 2.5.1 |
| flask-cors | 3.0.10 |
| flask-login | 0.6.1 |
| pandas | 1.4.2 |
| Flask-JWT-Extended | 4.4.0 |
### Guia de implementación
#### Ambiente de desarrollo
1. Instalar node version 16.14.2 y npm version 8.5.5
2. Instalación de librerias
```sh
npm install
```
3. Correr APP
```sh
npm run start
```
#### Ambiente de producción
1. Instalar node version 16.14.2 y npm version 8.5.5
2. Instalación de librerias
```sh
npm install
```
3. Construir APP
```sh
npm run build
```
4. Copiar carpeta build y colocarla donde se va a servir (ejemplo: /var/www/html)
