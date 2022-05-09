### Instruction on how to run and test the application
The application is not hosted therefore it will be tested via local machine.
Below is a step by step instruction on how to test the application
1. click on clone button to copy the link to the repo
2. Open you terminal in you local machine and type the command 
   # Git clone git url link
3. After the repo have been cloned , CD into the repo in your local machine and hit the command below to pull from the test branch
   # Git pull origin test
4. Once done , npm install command to install dependencies
5. After that you create a root .env file , and add the database url there
6. Once you have the DB url in your .env file , we are good to go. Next step is to hit the command below 
   # npm run dev
7. This spins up the server and runs it on port 8080
Below is link to the api postman documentations involving the whole endpoints and available,their request methods ,parameters and responses .
8. Finally in other to run the test , Hit the command below to run the unit test
   # npm run test
### APi Doc Link
https://documenter.getpostman.com/view/9905708/UyxdL9cD