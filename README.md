# nodeJsReactPack

# Hello this repository is a starterPack for an React NodeJs MySQL app.

## You will find all basic pages and endpoints to start your project. All in Docker containers.

## Front :
- Login/Register page 
- Home page  (get data from the DB)
- Add data page (post data in the DB)
- Admin page

## Back :
- Users endpoints: 
    - users/getConnection  (login)
    - users/postUser       (register)
    - users/deleteUser     
    - users/getUsers       
    - users/getAdmin
    - users/patchAdmin
    - users/verrifyConnexion (verrify the token)

- data endpoints:
    - data/getData    (select datas from the DB)
    - data/postData   (post data in the DB)
    - data/deleteData (delete data from the DB)

You have a postman collection in the `postman` folder, you can import it in postman to test the endpoints.
All bodys and prams examples are in this collection.

# How to start the project :

## to run manualy :

go in `front` folder and run :
```bash
npm start
```

then open a seconde terminal, go in `back` and run :
```bash
npm start
```
Dont forget to connect your DB to the back in `back/db/init.js`, or you can use the docker-compose.yml file to run a mariaDb container.


## to run with docker (run all the project):
go in the root folder and run :
```bash
docker compose up
```