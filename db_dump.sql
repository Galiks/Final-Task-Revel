--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2020-10-26 17:34:17

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

DROP DATABASE "AssessmentManagement";
--
-- TOC entry 3098 (class 1262 OID 16395)
-- Name: AssessmentManagement; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "AssessmentManagement";


\connect "AssessmentManagement"

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

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 16756)
-- Name: Candidate; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Candidate" (
    id integer NOT NULL,
    "Firstname" character varying(255) NOT NULL,
    "Lastname" character varying(255) NOT NULL,
    "Patronymic" character varying(255),
    "Email" character varying(255) NOT NULL,
    "Phone" character varying(255) NOT NULL,
    "id_candidatesStatus" integer NOT NULL
);


--
-- TOC entry 201 (class 1259 OID 16762)
-- Name: CandidateEvent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CandidateEvent" (
    id integer NOT NULL,
    "candidatesStatusValue" character varying(255),
    id_candidate integer NOT NULL,
    id_event integer NOT NULL,
    "id_candidateStatus" integer NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 16765)
-- Name: CandidateEvent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CandidateEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3099 (class 0 OID 0)
-- Dependencies: 202
-- Name: CandidateEvent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CandidateEvent_id_seq" OWNED BY public."CandidateEvent".id;


--
-- TOC entry 203 (class 1259 OID 16767)
-- Name: Candidate_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Candidate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3100 (class 0 OID 0)
-- Dependencies: 203
-- Name: Candidate_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Candidate_id_seq" OWNED BY public."Candidate".id;


--
-- TOC entry 204 (class 1259 OID 16769)
-- Name: CandidatesStatus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."CandidatesStatus" (
    id integer NOT NULL,
    "Status" character varying(255)
);


--
-- TOC entry 205 (class 1259 OID 16772)
-- Name: CandidatesStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."CandidatesStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3101 (class 0 OID 0)
-- Dependencies: 205
-- Name: CandidatesStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."CandidatesStatus_id_seq" OWNED BY public."CandidatesStatus".id;


--
-- TOC entry 206 (class 1259 OID 16774)
-- Name: Employee; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Employee" (
    id integer NOT NULL,
    "Firstname" character varying(255) NOT NULL,
    "Lastname" character varying(255) NOT NULL,
    "Patronymic" character varying(255),
    "Position" character varying(255) NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Phone" character varying(255) NOT NULL,
    id_user integer
);


--
-- TOC entry 207 (class 1259 OID 16780)
-- Name: EmployeeEvent; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EmployeeEvent" (
    id integer NOT NULL,
    id_employee integer NOT NULL,
    id_event integer NOT NULL
);


--
-- TOC entry 208 (class 1259 OID 16783)
-- Name: EmployeeEvent_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."EmployeeEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3102 (class 0 OID 0)
-- Dependencies: 208
-- Name: EmployeeEvent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."EmployeeEvent_id_seq" OWNED BY public."EmployeeEvent".id;


--
-- TOC entry 209 (class 1259 OID 16785)
-- Name: Employee_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Employee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3103 (class 0 OID 0)
-- Dependencies: 209
-- Name: Employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Employee_id_seq" OWNED BY public."Employee".id;


--
-- TOC entry 210 (class 1259 OID 16787)
-- Name: Event; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    "Theme" character varying(255) NOT NULL,
    "Beginning" timestamp without time zone NOT NULL,
    "id_eventsStatus" integer NOT NULL
);


--
-- TOC entry 211 (class 1259 OID 16790)
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3104 (class 0 OID 0)
-- Dependencies: 211
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- TOC entry 212 (class 1259 OID 16792)
-- Name: EventsStatus; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."EventsStatus" (
    id integer NOT NULL,
    "Status" character varying(255) NOT NULL
);


--
-- TOC entry 213 (class 1259 OID 16795)
-- Name: EventsStatus_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."EventsStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3105 (class 0 OID 0)
-- Dependencies: 213
-- Name: EventsStatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."EventsStatus_id_seq" OWNED BY public."EventsStatus".id;


--
-- TOC entry 217 (class 1259 OID 16881)
-- Name: Role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    "Role" character varying(255) NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 16879)
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3106 (class 0 OID 0)
-- Dependencies: 216
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- TOC entry 214 (class 1259 OID 16797)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "Password" character varying(255) NOT NULL,
    "UserPhoto" bytea,
    "LastVisite" timestamp without time zone,
    id_role integer,
    "Login" character varying(255) NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 16803)
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3107 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- TOC entry 2901 (class 2604 OID 16805)
-- Name: Candidate id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Candidate" ALTER COLUMN id SET DEFAULT nextval('public."Candidate_id_seq"'::regclass);


--
-- TOC entry 2902 (class 2604 OID 16806)
-- Name: CandidateEvent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidateEvent" ALTER COLUMN id SET DEFAULT nextval('public."CandidateEvent_id_seq"'::regclass);


--
-- TOC entry 2903 (class 2604 OID 16807)
-- Name: CandidatesStatus id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidatesStatus" ALTER COLUMN id SET DEFAULT nextval('public."CandidatesStatus_id_seq"'::regclass);


--
-- TOC entry 2904 (class 2604 OID 16808)
-- Name: Employee id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Employee" ALTER COLUMN id SET DEFAULT nextval('public."Employee_id_seq"'::regclass);


--
-- TOC entry 2905 (class 2604 OID 16809)
-- Name: EmployeeEvent id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeEvent" ALTER COLUMN id SET DEFAULT nextval('public."EmployeeEvent_id_seq"'::regclass);


--
-- TOC entry 2906 (class 2604 OID 16810)
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- TOC entry 2907 (class 2604 OID 16811)
-- Name: EventsStatus id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventsStatus" ALTER COLUMN id SET DEFAULT nextval('public."EventsStatus_id_seq"'::regclass);


--
-- TOC entry 2909 (class 2604 OID 16884)
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- TOC entry 2908 (class 2604 OID 16812)
-- Name: User id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- TOC entry 3075 (class 0 OID 16756)
-- Dependencies: 200
-- Data for Name: Candidate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (22, 'asd', 'sda', 'asd', 'asd.asd@asd.ru', '12312312312', 5);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (21, 'qwe', 'qwe', 'qwe', 'qwe.qwe@eqwr.ru', '12312312312', 5);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (25, 'free', 'free', 'free', 'free.free@free.ru', '12312312312', 5);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (24, 'Иван', 'Иванов', 'Иванович', 'ivan.ivan@ivan.ru', '12312312312', 5);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (23, 'ячс', 'ячс', 'ячс', 'zxc.zc@zxc.ru', '12312312123', 5);


--
-- TOC entry 3076 (class 0 OID 16762)
-- Dependencies: 201
-- Data for Name: CandidateEvent; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (258, NULL, 22, 69, 5);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (257, NULL, 21, 69, 5);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (256, NULL, 25, 69, 5);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (255, NULL, 24, 69, 5);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (254, NULL, 23, 69, 5);


--
-- TOC entry 3079 (class 0 OID 16769)
-- Dependencies: 204
-- Data for Name: CandidatesStatus; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (2, 'Приглашен');
INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (3, 'Явился');
INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (4, 'Не явился');
INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (5, 'Ожидает результат');
INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (6, 'Успешно');
INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (1, 'Не назначен');
INSERT INTO public."CandidatesStatus" (id, "Status") VALUES (7, 'Не успешно');


--
-- TOC entry 3081 (class 0 OID 16774)
-- Dependencies: 206
-- Data for Name: Employee; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Employee" (id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user) VALUES (17, 'qwe', 'qwe', 'qwe', 'qwe', 'qwe.qwe@qwe.ru', '12321312312', NULL);
INSERT INTO public."Employee" (id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user) VALUES (20, 'zxc', 'zxc', 'zxc', 'zxc', 'zxc.zc@zxc.rqw', '12312312312', NULL);


--
-- TOC entry 3082 (class 0 OID 16780)
-- Dependencies: 207
-- Data for Name: EmployeeEvent; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."EmployeeEvent" (id, id_employee, id_event) VALUES (231, 17, 73);
INSERT INTO public."EmployeeEvent" (id, id_employee, id_event) VALUES (232, 20, 73);
INSERT INTO public."EmployeeEvent" (id, id_employee, id_event) VALUES (234, 17, 69);


--
-- TOC entry 3085 (class 0 OID 16787)
-- Dependencies: 210
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Event" (id, "Theme", "Beginning", "id_eventsStatus") VALUES (73, 'asdasd', '2020-10-26 15:29:00', 3);
INSERT INTO public."Event" (id, "Theme", "Beginning", "id_eventsStatus") VALUES (69, 'qwe', '2020-10-25 17:47:00', 3);


--
-- TOC entry 3087 (class 0 OID 16792)
-- Dependencies: 212
-- Data for Name: EventsStatus; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."EventsStatus" (id, "Status") VALUES (1, 'Запланировано');
INSERT INTO public."EventsStatus" (id, "Status") VALUES (2, 'В процессе');
INSERT INTO public."EventsStatus" (id, "Status") VALUES (3, 'Закончено');
INSERT INTO public."EventsStatus" (id, "Status") VALUES (4, 'Архив');


--
-- TOC entry 3092 (class 0 OID 16881)
-- Dependencies: 217
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Role" (id, "Role") VALUES (1, 'Администратор');
INSERT INTO public."Role" (id, "Role") VALUES (2, 'Модератор');
INSERT INTO public."Role" (id, "Role") VALUES (3, 'Пользователь');


--
-- TOC entry 3089 (class 0 OID 16797)
-- Dependencies: 214
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") VALUES (10, '098f6bcd4621d373cade4e832627b4f6', '\x', '2020-10-26 16:04:40.567138', 1, 'test');
INSERT INTO public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") VALUES (12, '9ab97e0958c6c98c44319b8d06b29c94', '\x', '2020-10-26 16:05:04.993752', 2, 'moder');
INSERT INTO public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") VALUES (11, '21232f297a57a5a743894a0e4a801fc3', '\x', '2020-10-26 16:05:26.531304', 3, 'admin');


--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 202
-- Name: CandidateEvent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CandidateEvent_id_seq"', 258, true);


--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 203
-- Name: Candidate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Candidate_id_seq"', 25, true);


--
-- TOC entry 3110 (class 0 OID 0)
-- Dependencies: 205
-- Name: CandidatesStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CandidatesStatus_id_seq"', 7, true);


--
-- TOC entry 3111 (class 0 OID 0)
-- Dependencies: 208
-- Name: EmployeeEvent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."EmployeeEvent_id_seq"', 234, true);


--
-- TOC entry 3112 (class 0 OID 0)
-- Dependencies: 209
-- Name: Employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Employee_id_seq"', 20, true);


--
-- TOC entry 3113 (class 0 OID 0)
-- Dependencies: 211
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Event_id_seq"', 73, true);


--
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 213
-- Name: EventsStatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."EventsStatus_id_seq"', 1, false);


--
-- TOC entry 3115 (class 0 OID 0)
-- Dependencies: 216
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Role_id_seq"', 3, true);


--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 215
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."User_id_seq"', 12, true);


--
-- TOC entry 2915 (class 2606 OID 16814)
-- Name: CandidateEvent CandidateEvent_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_pk" PRIMARY KEY (id);


--
-- TOC entry 2911 (class 2606 OID 16816)
-- Name: Candidate Candidate_Email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_Email_key" UNIQUE ("Email");


--
-- TOC entry 2913 (class 2606 OID 16818)
-- Name: Candidate Candidate_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_pk" PRIMARY KEY (id);


--
-- TOC entry 2917 (class 2606 OID 16820)
-- Name: CandidatesStatus CandidatesStatus_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidatesStatus"
    ADD CONSTRAINT "CandidatesStatus_pk" PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 16822)
-- Name: EmployeeEvent EmployeeEvent_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeEvent"
    ADD CONSTRAINT "EmployeeEvent_pk" PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 16824)
-- Name: Employee Employee_Email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_Email_key" UNIQUE ("Email");


--
-- TOC entry 2921 (class 2606 OID 16826)
-- Name: Employee Employee_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pk" PRIMARY KEY (id);


--
-- TOC entry 2925 (class 2606 OID 16828)
-- Name: Event Event_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pk" PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 16830)
-- Name: EventsStatus EventsStatus_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EventsStatus"
    ADD CONSTRAINT "EventsStatus_pk" PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 16904)
-- Name: User Login_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "Login_unique" UNIQUE ("Login");


--
-- TOC entry 2933 (class 2606 OID 16888)
-- Name: Role Role_Role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_Role_key" UNIQUE ("Role");


--
-- TOC entry 2935 (class 2606 OID 16886)
-- Name: Role Role_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pk" PRIMARY KEY (id);


--
-- TOC entry 2931 (class 2606 OID 16832)
-- Name: User User_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pk" PRIMARY KEY (id);


--
-- TOC entry 2937 (class 2606 OID 16833)
-- Name: CandidateEvent CandidateEvent_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_fk0" FOREIGN KEY (id_candidate) REFERENCES public."Candidate"(id);


--
-- TOC entry 2938 (class 2606 OID 16838)
-- Name: CandidateEvent CandidateEvent_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_fk1" FOREIGN KEY (id_event) REFERENCES public."Event"(id);


--
-- TOC entry 2939 (class 2606 OID 16843)
-- Name: CandidateEvent CandidateEvent_fk2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_fk2" FOREIGN KEY ("id_candidateStatus") REFERENCES public."CandidatesStatus"(id);


--
-- TOC entry 2936 (class 2606 OID 16848)
-- Name: Candidate Candidate_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_fk0" FOREIGN KEY ("id_candidatesStatus") REFERENCES public."CandidatesStatus"(id);


--
-- TOC entry 2941 (class 2606 OID 16853)
-- Name: EmployeeEvent EmployeeEvent_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeEvent"
    ADD CONSTRAINT "EmployeeEvent_fk0" FOREIGN KEY (id_employee) REFERENCES public."Employee"(id);


--
-- TOC entry 2942 (class 2606 OID 16858)
-- Name: EmployeeEvent EmployeeEvent_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."EmployeeEvent"
    ADD CONSTRAINT "EmployeeEvent_fk1" FOREIGN KEY (id_event) REFERENCES public."Event"(id);


--
-- TOC entry 2940 (class 2606 OID 16863)
-- Name: Employee Employee_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_fk0" FOREIGN KEY (id_user) REFERENCES public."User"(id);


--
-- TOC entry 2943 (class 2606 OID 16868)
-- Name: Event Event_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_fk0" FOREIGN KEY ("id_eventsStatus") REFERENCES public."EventsStatus"(id);


--
-- TOC entry 2944 (class 2606 OID 16889)
-- Name: User User_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_fk0" FOREIGN KEY (id_role) REFERENCES public."Role"(id);


-- Completed on 2020-10-26 17:34:17

--
-- PostgreSQL database dump complete
--

