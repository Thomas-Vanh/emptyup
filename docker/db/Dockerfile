FROM postgres
ENV POSTGRES_PASSWORD='K}63z-4NraxU~8'
ENV POSTGRES_USER='empty_up_db_admin'
ENV POSTGRES_DB='empty_up_db'
ADD ./docker/db/db-dump/schemaDb.sql /docker-entrypoint-initdb.d
EXPOSE 5432
CMD [ "tail", "-f", "/dev/null" ]