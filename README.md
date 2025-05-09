## Setup Instructions

1.  **Clone the repository:**

2. **Configure .env and config file accordingly**

3.  **Install dependencies:**

   
    npm install
  

4.  **Configure the database:**

    *   Create a `manage_admission` database in MySQL.
    *   Update the database configuration in `postgrator-config.js` with your MySQL credentials.

       
        module.exports = {
          "migrationDirectory": "migrations",
          "driver": "mysql",
          "connectionString": "mysql://root:Admin@123@localhost:3306/manage_admission"
        }
      

5.  **Run migrations and seeders:**

    
    npm run migrate
    npm run seed
  

6.  **Start the application:**

    
    npm run dev
    

**Notes**

*   The API is built using Fastify, MySQL and postgrator.
*   The database schema is defined in the SQL files in the `migrations` directory.
*   Seeders are located in the `seeders` directory.

