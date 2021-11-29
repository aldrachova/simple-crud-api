# simple-crud-api
Pure Node.js simple CRUD API using in-memory database underneath

### API path /person

``` GET /person ``` returns all persons

``` GET /person/${personId} ``` returns person with corresponding personId

``` POST /person ``` is used to create record about new person and store it in database

``` PUT /person/${personId} ``` is used to update record about existing person

``` DELETE /person/${personId} ``` is used to delete record about existing person from database

### Persons are stored as objects that have following properties:

``` id ``` — unique identifier (string, uuid) generated on server side

``` name ``` — person's name (string, required)

``` age ``` — person's age (number, required)

``` hobbies ``` — person's hobbies (array of strings or empty array, required)

### To use the application 

1. ``` git clone https://github.com/aldrachova/simple-crud-api.git ```
2. ``` cd ./simple-crud-api ```
3. ``` git checkout develop ```
4. ``` npm install ```
5. ``` In root directory create new file .env ```
6. ``` Write PORT value to file .env For example, PORT = 3000 ```


### To run the application in production mode

``` npm run start:prod ```

### To run the application in development mode

``` npm run start:dev ```

### Usage scenario

``` GET-запросом получаем все объекты (ожидается пустой массив) ```

``` POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект) ```

``` GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект) ```

``` PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id) ```

``` DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления) ```

``` GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет) ```
