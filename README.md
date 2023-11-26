# nodeJsReactPack

# Hello this repository is a starterPack for an React NodeJs MySQL app.

## You will find all basic pages and endpoints to start your project. All in Docker containers.

## Front :
- Login/Register page 
- Home page
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

## to run with docker :

```bash
docker compose up
```