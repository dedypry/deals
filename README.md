# DOCUMENTATION
## Test backend for DEALS
i use nestjs/typesript, objectionjs(orm), class-validation(validate body) and the database uses sqlite to make checking easier

### Structure Service
-  auth service
      - signin service for user already have an account
     - signup service for new user
     - in this service I use third parties such as bcrypt for password encryption, and jwt webtoken for authentication

- swipe service
  - list : This is a collection of  users registered in this application
  - create : is an action where the user can swipe right (pass) and left (like)

- premium service
  - list: this is a collection of list package
  - create: thi action for buy package premium

### for the first step
- open the terminal
- clone this repo `git clone https://github.com/dedypry/deals.git`
- `cd deals`
- `yarn install`
- `yarn start:dev`
- the application will run on `http://127.0.0.1:3000`

you can see the postman documentation in the link https://documenter.getpostman.com/view/9682865/2s9YkocLjA

- i have developed this project, you can see in link https://deals.wekode.co.id
