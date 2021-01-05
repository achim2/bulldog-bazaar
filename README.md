# bulldog-bazaar

## This is a simple cms test project to learn nodejs & nuxt

### Tech

* docker, docker-compose
* nodejs, express, multer
* mongodb, mongoose
* nuxt (Vuejs), i18n, routing, vuex
* axios
* bootstrap

### Install

* git pull
* make .env file from .env.example
* docker-compose up --build

### To stop docker

* docker-compose down

### Optional

* you can use mongo atlas too if set the correct information

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
* drop nuxt auth (if user not logged in then nuxt auth trying to get auth & BE response send back 'token expired') & write custom auth (not important), nuxt auth very annoying
* image optimalization (not finished, only build, check if build)
* nuxt ssr not works under docker (nuxt srr proxy problem)
