# Frequency Control Mobile System

## About the project
It's a mobile frequency control system which intens do substitute the time book, turning it into a reliable, easy-to-use and full of informations mobile application.
<br/>
## Main Features
- **Authentication system:** the system has two roles: admin and employee. The employees are only capable of saving entries in the frequency system, and also take a look at their extra/missing hours and faults;
- **JWT Authorization:** all endpoints of application requires the JWT authorization, that way, providing more security to the system features;
- **Native Camera System:** to save the entries, the employees have to select their profiles and then take a photo, which will be saved in the database (base64) along with their ID and current moment;
- **Detailed user report:** in order to check the detailed user's report, the system provides a XLSX file returning all the frequencies with it's moment, day and user, for a specific time period;
- **Daily user report:** beside the detailed user report, the system also provides the daily user report, where you can select specific day and user, and then track all the pictures and moment of frequencies;
- **Custom employee work configuration:** this system allows the admin to create any kind of employee by inserting it's workload, worktime, days off, ...

## Techonoglies used
- **Back end:** Express.js; PostgreSQL; 
