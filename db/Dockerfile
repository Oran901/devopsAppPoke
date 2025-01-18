FROM mysql:8.4.3
ENV MYSQL_DATABASE=quotesdb \
    MYSQL_ROOT_PASSWORD=root \
    MYSQL_USER=user \
    MYSQL_PASSWORD=password
COPY init.sql /docker-entrypoint-initdb.d/
