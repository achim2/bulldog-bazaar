# bulldog-bazaar

## This is a simple cms test project to learn nodejs & nuxt

### Tech

* nginx
* docker, docker-compose
* nodejs, express, multer
* mongodb, mongoose
* nuxt (Vuejs), i18n, routing, vuex
* axios
* bootstrap

### Install

* git pull
* make .env file from .env.example
* make ./Docker/nginx/conf.d/default.conf file from ./Docker/nginx/conf.d/default.example.conf
* docker-compose up --build

### To stop docker

* docker-compose down

### Enter to mongodb with compass
#### Inspect your docker db container: docker inspect <-- your db -->
* hostname:  Networks/IPAddress of your Docker container
* port: .env MONGO_PORT
* username: .env MONGO_USERNAME
* password: .env MONGO_PASSWORD

### To get admin page

* register at /signup
* login at /login (login confirmed commented out)

### On admin page

* update info,
* update gallery (multiple image crud & sorting)
* update products (multiple image crud & sorting)

### Todos:

* Send email via contact form
* Send email if error occurred
* password encryption to FE
* multer file filter & limits
* image optimization 
