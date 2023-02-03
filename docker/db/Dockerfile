FROM postgres
ENV POSTGRES_PASSWORD=
ENV POSTGRES_USER=
ENV POSTGRES_DB=
COPY docker/db/db-dump /var/lib/postgresql/data
EXPOSE 5432
CMD [ "tail", "-f", "/dev/null" ]