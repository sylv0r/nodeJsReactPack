# Use the official MariaDB image as the base image
FROM mariadb

# Set environment variables for MariaDB
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_DATABASE=my_database
ENV MYSQL_USER=my_user
ENV MYSQL_PASSWORD=my_password

# Expose the default MySQL port
EXPOSE 3306

# Optionally, you can initialize the database with an SQL script
COPY ./init.sql /docker-entrypoint-initdb.d/
