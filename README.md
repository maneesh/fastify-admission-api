## Setup Instructions

1.  **Clone the repository:**

2.  **Install dependencies:**

    npm install

3.  **Add .env file:**

    Create a `.env` file in the root directory and add the following environment variables:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Admin@123
DB_DATABASE=manage_admission
JWT_SECRET="Your JWT SECRET KEY"
 

4.  **Configure the database:**

    *   Create a `manage_admission` database in MySQL.
    *   Update the database configuration in `config/config.json` with your MySQL credentials.

        Please update user, password accordingly
        {
          "development": {
            "username": "root",
            "password": "your_password",
            "database": "manage_admission",
            "host": "127.0.0.1",
            "dialect": "mysql"
          },
          "test": {
            "username": "root",
            "password": "your_password",
            "database": "manage_admission",
            "host": "127.0.0.1",
            "dialect": "mysql"
          },
          "production": {
            "username": "root",
            "password": "your_password",
            "database": "manage_admission",
            "host": "127.0.0.1",
            "dialect": "mysql"
          }
        }

5.  **Run migrations and seeders:**

   
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    

6.  **Start the application:**

    
    npm run dev

    or

    npm start


**Notes**

*   The API is built using Fastify and Sequelize.
*   The database schema is defined in `schema/000All_in_one_combined.sql`. under schema folder
*   Migrations are located in the `migrations` directory.
*   Seeders are located in the `seeders` directory.

