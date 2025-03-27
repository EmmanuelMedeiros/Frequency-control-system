# Frequency Control Mobile System

## About the project
It's a mobile frequency control system which intens do substitute the time book, turning it into a reliable, easy-to-use and full of informations mobile application.
<br/>
## Main Features
- **Authentication system:** the system has two roles: admin and employee. The employees are only capable of saving entries in the frequency system, and also take a look at their extra/missing hours and faults;
- **JWT Authorization:** all application endpoints requires the JWT authorization, that way, providing more security to the system features;
- **Native Camera System:** to save the entries, the employees have to select their profiles and then take a photo, which will be saved in the database (base64) along with their ID and current moment;
- **Detailed user report:** in order to check the detailed user's report, the system provides a XLSX file returning all the frequencies with it's moment, day and user, for a specific time period;
- **Daily user report:** beside the detailed user report, the system also provides the daily user report, where you can select specific day and user, and then track all the pictures and moment of frequencies;
- **Custom employee work configuration:** this system allows the admin to create any kind of employee by inserting it's workload, worktime, days off, ...

## Description

- This application is a workforce attendance tracking system designed to monitor and manage employee check-ins with added security and customization. It features a role-based authentication system with two roles: admin and employee. Employees can log their attendance, view their extra or missing hours, and check for any absences. Admins, on the other hand, have access to advanced management features.

- To register an entry, employees must select their profile and take a photo using the device’s native camera. This photo is saved in the database (as a base64 string) along with the employee's ID and the exact timestamp.

- All endpoints are protected by JWT-based authorization, ensuring secure access to all system features.

- For reporting, the system offers two key tools:
    - A detailed report, which generates an XLSX file with all attendance entries for a selected time period, including user, date, and time.
    - A daily report, where admins can view all check-ins for a specific user and day, including the corresponding photos and timestamps.
    - Additionally, the system supports custom work schedules, allowing admins to define each employee's workload, working hours, and days off based on specific needs.

## Techonoglies Applied
- **Back end:** JavaScript/TypeScript; Express.js; Node.js, JWT Auth
- **Front end:** React Native; EXPO (for native mobile features); Camera system; Mobile cache system; Storage system
- **Database:** PostgreSQL
