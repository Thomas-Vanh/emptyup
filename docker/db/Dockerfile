FROM postgres
ENV POSTGRES_PASSWORD=K}63z-4NraxU~8
ENV POSTGRES_USER=empty_up_db_admin
ENV POSTGRES_DB=empty_up_db
COPY docker/db/db-dump /var/lib/postgresql/data
EXPOSE 5432
CMD [ "tail", "-f", "/dev/null" ]