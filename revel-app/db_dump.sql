--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2020-10-23 11:35:46

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
-- TOC entry 3098 (class 1262 OID 16395)
-- Name: AssessmentManagement; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE "AssessmentManagement" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';


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

--
-- TOC entry 3075 (class 0 OID 16756)
-- Dependencies: 200
-- Data for Name: Candidate; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (24, 'Иван', 'Иванов', 'Иванович', 'ivan.ivan@ivan.ru', '12312312312', 1);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (21, 'qwe', 'qwe', 'qwe', 'qwe.qwe@eqwr.ru', '12312312312', 1);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (23, 'ячс', 'ячс', 'ячс', 'zxc.zc@zxc.ru', '12312312123', 1);
INSERT INTO public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") VALUES (22, 'asd', 'sda', 'asd', 'asd.asd@asd.ru', '12312312312', 1);


--
-- TOC entry 3076 (class 0 OID 16762)
-- Dependencies: 201
-- Data for Name: CandidateEvent; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (235, 'Не явился', 24, 68, 4);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (237, 'Успешно', 23, 68, 6);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (234, 'Не успешно', 21, 68, 7);
INSERT INTO public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") VALUES (236, 'Успешно', 22, 68, 6);


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
INSERT INTO public."Employee" (id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user) VALUES (18, 'asd', 'asd', 'asd', 'asd', 'asd.asd@asd.ru', '12312312312', NULL);


--
-- TOC entry 3082 (class 0 OID 16780)
-- Dependencies: 207
-- Data for Name: EmployeeEvent; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."EmployeeEvent" (id, id_employee, id_event) VALUES (217, 17, 68);
INSERT INTO public."EmployeeEvent" (id, id_employee, id_event) VALUES (218, 18, 68);


--
-- TOC entry 3085 (class 0 OID 16787)
-- Dependencies: 210
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public."Event" (id, "Theme", "Beginning", "id_eventsStatus") VALUES (2, 'Meeting', '2020-10-14 05:54:25.717341', 2);
INSERT INTO public."Event" (id, "Theme", "Beginning", "id_eventsStatus") VALUES (3, 'Совещание', '2020-10-14 05:55:07.357844', 1);
INSERT INTO public."Event" (id, "Theme", "Beginning", "id_eventsStatus") VALUES (68, 'test', '2020-10-21 11:25:00', 4);


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

INSERT INTO public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") VALUES (7, 'user', NULL, NULL, 3, 'user');
INSERT INTO public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") VALUES (6, 'admin', '\x', '2020-10-22 13:48:48.257', 1, 'admin');
INSERT INTO public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") VALUES (10, '098f6bcd4621d373cade4e832627b4f6', '\x', '0001-01-01 00:00:00', NULL, 'test');


--
-- TOC entry 3108 (class 0 OID 0)
-- Dependencies: 202
-- Name: CandidateEvent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."CandidateEvent_id_seq"', 237, true);


--
-- TOC entry 3109 (class 0 OID 0)
-- Dependencies: 203
-- Name: Candidate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Candidate_id_seq"', 24, true);


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

SELECT pg_catalog.setval('public."EmployeeEvent_id_seq"', 218, true);


--
-- TOC entry 3112 (class 0 OID 0)
-- Dependencies: 209
-- Name: Employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Employee_id_seq"', 18, true);


--
-- TOC entry 3113 (class 0 OID 0)
-- Dependencies: 211
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."Event_id_seq"', 68, true);


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

SELECT pg_catalog.setval('public."User_id_seq"', 10, true);


-- Completed on 2020-10-23 11:35:47

--
-- PostgreSQL database dump complete
--

