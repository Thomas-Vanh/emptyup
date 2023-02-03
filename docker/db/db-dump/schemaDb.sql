--

-- PostgreSQL database dump

--

-- Dumped from database version 15.1

-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

--

-- Name: public; Type: SCHEMA; Schema: -; Owner: empty_up_db_admin

--

-- *not* creating schema, since initdb creates it

ALTER SCHEMA public OWNER TO empty_up_db_admin;

--

-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: empty_up_db_admin

--

COMMENT ON SCHEMA public IS '';

SET default_tablespace = '';

SET default_table_access_method = heap;

--

-- Name: annonces; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.annonces (
        id integer NOT NULL,
        user_id bigint NOT NULL,
        content text,
        date date,
        subject character varying,
        city character varying
    );

ALTER TABLE public.annonces OWNER TO empty_up_db_admin;

--

-- Name: annonces_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.annonces_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.annonces_id_seq OWNER TO empty_up_db_admin;

--

-- Name: annonces_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE public.annonces_id_seq OWNED BY public.annonces.id;

--

-- Name: buildings; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.buildings (
        id integer NOT NULL,
        adress character varying(255) NOT NULL,
        zipcode integer NOT NULL,
        city character varying(255) NOT NULL,
        type character varying(255) NOT NULL,
        dateofpost date,
        admin_id integer,
        initial_image text,
        lat text,
        lon text
    );

ALTER TABLE public.buildings OWNER TO empty_up_db_admin;

--

-- Name: buildings_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.buildings_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.buildings_id_seq OWNER TO empty_up_db_admin;

--

-- Name: buildings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE public.buildings_id_seq OWNED BY public.buildings.id;

--

-- Name: comments; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.comments (
        id integer NOT NULL,
        building_id integer NOT NULL,
        content text,
        user_id bigint NOT NULL,
        date date
    );

ALTER TABLE public.comments OWNER TO empty_up_db_admin;

--

-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.comments_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.comments_id_seq OWNER TO empty_up_db_admin;

--

-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;

--

-- Name: discussion; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.discussion (
        id integer NOT NULL,
        user_1 integer,
        user_2 integer
    );

ALTER TABLE public.discussion OWNER TO empty_up_db_admin;

--

-- Name: discussion_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.discussion_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.discussion_id_seq OWNER TO empty_up_db_admin;

--

-- Name: discussion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE
    public.discussion_id_seq OWNED BY public.discussion.id;

--

-- Name: images; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.images (
        id integer NOT NULL,
        cloudinary_id character varying NOT NULL,
        image_url character varying NOT NULL,
        building_id integer NOT NULL,
        dateofpost date
    );

ALTER TABLE public.images OWNER TO empty_up_db_admin;

--

-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.images_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.images_id_seq OWNER TO empty_up_db_admin;

--

-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;

--

-- Name: like_per_building; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.like_per_building (
        id integer NOT NULL,
        building_id integer NOT NULL,
        user_id bigint NOT NULL
    );

ALTER TABLE public.like_per_building OWNER TO empty_up_db_admin;

--

-- Name: like_per_building_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.like_per_building_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE
    public.like_per_building_id_seq OWNER TO empty_up_db_admin;

--

-- Name: like_per_building_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE
    public.like_per_building_id_seq OWNED BY public.like_per_building.id;

--

-- Name: messages; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.messages (
        id integer NOT NULL,
        user_id integer NOT NULL,
        content text,
        date date,
        discussion_id bigint NOT NULL
    );

ALTER TABLE public.messages OWNER TO empty_up_db_admin;

--

-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.messages_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.messages_id_seq OWNER TO empty_up_db_admin;

--

-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;

--

-- Name: users; Type: TABLE; Schema: public; Owner: empty_up_db_admin

--

CREATE TABLE
    public.users (
        id integer NOT NULL,
        username character varying(255) NOT NULL,
        email character varying(255) NOT NULL,
        password character varying(255) NOT NULL,
        profilpicture_url text
    );

ALTER TABLE public.users OWNER TO empty_up_db_admin;

--

-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: empty_up_db_admin

--

CREATE SEQUENCE
    public.users_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.users_id_seq OWNER TO empty_up_db_admin;

--

-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: empty_up_db_admin

--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--

-- Name: annonces id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.annonces
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.annonces_id_seq' :: regclass
    );

--

-- Name: buildings id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.buildings
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.buildings_id_seq' :: regclass
    );

--

-- Name: comments id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.comments
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.comments_id_seq' :: regclass
    );

--

-- Name: discussion id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.discussion
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.discussion_id_seq' :: regclass
    );

--

-- Name: images id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.images
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.images_id_seq' :: regclass
    );

--

-- Name: like_per_building id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.like_per_building
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.like_per_building_id_seq' :: regclass
    );

--

-- Name: messages id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.messages
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.messages_id_seq' :: regclass
    );

--

-- Name: users id; Type: DEFAULT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.users
ALTER COLUMN id
SET
    DEFAULT nextval(
        'public.users_id_seq' :: regclass
    );

--

-- Name: annonces annonces_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.annonces
ADD
    CONSTRAINT annonces_pkey PRIMARY KEY (id);

--

-- Name: buildings buildings_adress_unique; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.buildings
ADD
    CONSTRAINT buildings_adress_unique UNIQUE (adress);

--

-- Name: buildings buildings_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.buildings
ADD
    CONSTRAINT buildings_pkey PRIMARY KEY (id);

--

-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.comments
ADD
    CONSTRAINT comments_pkey PRIMARY KEY (id);

--

-- Name: discussion discussion_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.discussion
ADD
    CONSTRAINT discussion_pkey PRIMARY KEY (id);

--

-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.images
ADD
    CONSTRAINT images_pkey PRIMARY KEY (id);

--

-- Name: like_per_building like_per_building_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.like_per_building
ADD
    CONSTRAINT like_per_building_pkey PRIMARY KEY (id);

--

-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.messages
ADD
    CONSTRAINT messages_pkey PRIMARY KEY (id);

--

-- Name: annonces unique_content; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.annonces
ADD
    CONSTRAINT unique_content UNIQUE (content);

--

-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.users
ADD
    CONSTRAINT users_email_unique UNIQUE (email);

--

-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.users
ADD
    CONSTRAINT users_pkey PRIMARY KEY (id);

--

-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.users
ADD
    CONSTRAINT users_username_unique UNIQUE (username);

--

-- Name: annonces annonces_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.annonces
ADD
    CONSTRAINT annonces_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);

--

-- Name: comments comments_building_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.comments
ADD
    CONSTRAINT comments_building_id_foreign FOREIGN KEY (building_id) REFERENCES public.buildings(id);

--

-- Name: comments comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.comments
ADD
    CONSTRAINT comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);

--

-- Name: discussion discussion_user_1_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.discussion
ADD
    CONSTRAINT discussion_user_1_foreign FOREIGN KEY (user_1) REFERENCES public.users(id);

--

-- Name: discussion discussion_user_2_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.discussion
ADD
    CONSTRAINT discussion_user_2_foreign FOREIGN KEY (user_2) REFERENCES public.users(id);

--

-- Name: images images_building_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE ONLY public.images
ADD
    CONSTRAINT images_building_id_foreign FOREIGN KEY (building_id) REFERENCES public.buildings(id);

--

-- Name: like_per_building like_per_building_building_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.like_per_building
ADD
    CONSTRAINT like_per_building_building_id_foreign FOREIGN KEY (building_id) REFERENCES public.buildings(id);

--

-- Name: like_per_building like_per_building_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.like_per_building
ADD
    CONSTRAINT like_per_building_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);

--

-- Name: messages messages_discussion_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.messages
ADD
    CONSTRAINT messages_discussion_id_foreign FOREIGN KEY (discussion_id) REFERENCES public.discussion(id);

--

-- Name: messages messages_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: empty_up_db_admin

--

ALTER TABLE
    ONLY public.messages
ADD
    CONSTRAINT messages_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);

--

-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: empty_up_db_admin

--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;

--

-- PostgreSQL database dump complete

--