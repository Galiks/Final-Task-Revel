PGDMP                     	    x            AssessmentManagement    13.0    13.0 P               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16395    AssessmentManagement    DATABASE     s   CREATE DATABASE "AssessmentManagement" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
 &   DROP DATABASE "AssessmentManagement";
                postgres    false            �            1259    16756 	   Candidate    TABLE     M  CREATE TABLE public."Candidate" (
    id integer NOT NULL,
    "Firstname" character varying(255) NOT NULL,
    "Lastname" character varying(255) NOT NULL,
    "Patronymic" character varying(255),
    "Email" character varying(255) NOT NULL,
    "Phone" character varying(255) NOT NULL,
    "id_candidatesStatus" integer NOT NULL
);
    DROP TABLE public."Candidate";
       public         heap    postgres    false            �            1259    16762    CandidateEvent    TABLE     �   CREATE TABLE public."CandidateEvent" (
    id integer NOT NULL,
    "candidatesStatusValue" character varying(255),
    id_candidate integer NOT NULL,
    id_event integer NOT NULL,
    "id_candidateStatus" integer NOT NULL
);
 $   DROP TABLE public."CandidateEvent";
       public         heap    postgres    false            �            1259    16765    CandidateEvent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CandidateEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."CandidateEvent_id_seq";
       public          postgres    false    201                       0    0    CandidateEvent_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."CandidateEvent_id_seq" OWNED BY public."CandidateEvent".id;
          public          postgres    false    202            �            1259    16767    Candidate_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Candidate_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Candidate_id_seq";
       public          postgres    false    200                       0    0    Candidate_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Candidate_id_seq" OWNED BY public."Candidate".id;
          public          postgres    false    203            �            1259    16769    CandidatesStatus    TABLE     i   CREATE TABLE public."CandidatesStatus" (
    id integer NOT NULL,
    "Status" character varying(255)
);
 &   DROP TABLE public."CandidatesStatus";
       public         heap    postgres    false            �            1259    16772    CandidatesStatus_id_seq    SEQUENCE     �   CREATE SEQUENCE public."CandidatesStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."CandidatesStatus_id_seq";
       public          postgres    false    204                       0    0    CandidatesStatus_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."CandidatesStatus_id_seq" OWNED BY public."CandidatesStatus".id;
          public          postgres    false    205            �            1259    16774    Employee    TABLE     e  CREATE TABLE public."Employee" (
    id integer NOT NULL,
    "Firstname" character varying(255) NOT NULL,
    "Lastname" character varying(255) NOT NULL,
    "Patronymic" character varying(255),
    "Position" character varying(255) NOT NULL,
    "Email" character varying(255) NOT NULL,
    "Phone" character varying(255) NOT NULL,
    id_user integer
);
    DROP TABLE public."Employee";
       public         heap    postgres    false            �            1259    16780    EmployeeEvent    TABLE     �   CREATE TABLE public."EmployeeEvent" (
    id integer NOT NULL,
    id_employee integer NOT NULL,
    id_event integer NOT NULL
);
 #   DROP TABLE public."EmployeeEvent";
       public         heap    postgres    false            �            1259    16783    EmployeeEvent_id_seq    SEQUENCE     �   CREATE SEQUENCE public."EmployeeEvent_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."EmployeeEvent_id_seq";
       public          postgres    false    207                       0    0    EmployeeEvent_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public."EmployeeEvent_id_seq" OWNED BY public."EmployeeEvent".id;
          public          postgres    false    208            �            1259    16785    Employee_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Employee_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Employee_id_seq";
       public          postgres    false    206                       0    0    Employee_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."Employee_id_seq" OWNED BY public."Employee".id;
          public          postgres    false    209            �            1259    16787    Event    TABLE     �   CREATE TABLE public."Event" (
    id integer NOT NULL,
    "Theme" character varying(255) NOT NULL,
    "Beginning" timestamp without time zone NOT NULL,
    "id_eventsStatus" integer NOT NULL
);
    DROP TABLE public."Event";
       public         heap    postgres    false            �            1259    16790    Event_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Event_id_seq";
       public          postgres    false    210                        0    0    Event_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;
          public          postgres    false    211            �            1259    16792    EventsStatus    TABLE     n   CREATE TABLE public."EventsStatus" (
    id integer NOT NULL,
    "Status" character varying(255) NOT NULL
);
 "   DROP TABLE public."EventsStatus";
       public         heap    postgres    false            �            1259    16795    EventsStatus_id_seq    SEQUENCE     �   CREATE SEQUENCE public."EventsStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."EventsStatus_id_seq";
       public          postgres    false    212            !           0    0    EventsStatus_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."EventsStatus_id_seq" OWNED BY public."EventsStatus".id;
          public          postgres    false    213            �            1259    16881    Role    TABLE     d   CREATE TABLE public."Role" (
    id integer NOT NULL,
    "Role" character varying(255) NOT NULL
);
    DROP TABLE public."Role";
       public         heap    postgres    false            �            1259    16879    Role_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Role_id_seq";
       public          postgres    false    217            "           0    0    Role_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;
          public          postgres    false    216            �            1259    16797    User    TABLE     �   CREATE TABLE public."User" (
    id integer NOT NULL,
    "Password" character varying(255) NOT NULL,
    "UserPhoto" bytea,
    "LastVisite" timestamp without time zone,
    id_role integer,
    "Login" character varying(255) NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    16803    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    214            #           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    215            U           2604    16805    Candidate id    DEFAULT     p   ALTER TABLE ONLY public."Candidate" ALTER COLUMN id SET DEFAULT nextval('public."Candidate_id_seq"'::regclass);
 =   ALTER TABLE public."Candidate" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    200            V           2604    16806    CandidateEvent id    DEFAULT     z   ALTER TABLE ONLY public."CandidateEvent" ALTER COLUMN id SET DEFAULT nextval('public."CandidateEvent_id_seq"'::regclass);
 B   ALTER TABLE public."CandidateEvent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    201            W           2604    16807    CandidatesStatus id    DEFAULT     ~   ALTER TABLE ONLY public."CandidatesStatus" ALTER COLUMN id SET DEFAULT nextval('public."CandidatesStatus_id_seq"'::regclass);
 D   ALTER TABLE public."CandidatesStatus" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            X           2604    16808    Employee id    DEFAULT     n   ALTER TABLE ONLY public."Employee" ALTER COLUMN id SET DEFAULT nextval('public."Employee_id_seq"'::regclass);
 <   ALTER TABLE public."Employee" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    206            Y           2604    16809    EmployeeEvent id    DEFAULT     x   ALTER TABLE ONLY public."EmployeeEvent" ALTER COLUMN id SET DEFAULT nextval('public."EmployeeEvent_id_seq"'::regclass);
 A   ALTER TABLE public."EmployeeEvent" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207            Z           2604    16810    Event id    DEFAULT     h   ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);
 9   ALTER TABLE public."Event" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210            [           2604    16811    EventsStatus id    DEFAULT     v   ALTER TABLE ONLY public."EventsStatus" ALTER COLUMN id SET DEFAULT nextval('public."EventsStatus_id_seq"'::regclass);
 @   ALTER TABLE public."EventsStatus" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            ]           2604    16884    Role id    DEFAULT     f   ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);
 8   ALTER TABLE public."Role" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            \           2604    16812    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214                      0    16756 	   Candidate 
   TABLE DATA           y   COPY public."Candidate" (id, "Firstname", "Lastname", "Patronymic", "Email", "Phone", "id_candidatesStatus") FROM stdin;
    public          postgres    false    200   P\                 0    16762    CandidateEvent 
   TABLE DATA           u   COPY public."CandidateEvent" (id, "candidatesStatusValue", id_candidate, id_event, "id_candidateStatus") FROM stdin;
    public          postgres    false    201   �\                 0    16769    CandidatesStatus 
   TABLE DATA           :   COPY public."CandidatesStatus" (id, "Status") FROM stdin;
    public          postgres    false    204   @]       	          0    16774    Employee 
   TABLE DATA           v   COPY public."Employee" (id, "Firstname", "Lastname", "Patronymic", "Position", "Email", "Phone", id_user) FROM stdin;
    public          postgres    false    206   �]       
          0    16780    EmployeeEvent 
   TABLE DATA           D   COPY public."EmployeeEvent" (id, id_employee, id_event) FROM stdin;
    public          postgres    false    207   ^                 0    16787    Event 
   TABLE DATA           N   COPY public."Event" (id, "Theme", "Beginning", "id_eventsStatus") FROM stdin;
    public          postgres    false    210   G^                 0    16792    EventsStatus 
   TABLE DATA           6   COPY public."EventsStatus" (id, "Status") FROM stdin;
    public          postgres    false    212   �^                 0    16881    Role 
   TABLE DATA           ,   COPY public."Role" (id, "Role") FROM stdin;
    public          postgres    false    217   ._                 0    16797    User 
   TABLE DATA           ]   COPY public."User" (id, "Password", "UserPhoto", "LastVisite", id_role, "Login") FROM stdin;
    public          postgres    false    214   �_       $           0    0    CandidateEvent_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."CandidateEvent_id_seq"', 237, true);
          public          postgres    false    202            %           0    0    Candidate_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Candidate_id_seq"', 24, true);
          public          postgres    false    203            &           0    0    CandidatesStatus_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."CandidatesStatus_id_seq"', 7, true);
          public          postgres    false    205            '           0    0    EmployeeEvent_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."EmployeeEvent_id_seq"', 218, true);
          public          postgres    false    208            (           0    0    Employee_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Employee_id_seq"', 18, true);
          public          postgres    false    209            )           0    0    Event_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Event_id_seq"', 68, true);
          public          postgres    false    211            *           0    0    EventsStatus_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."EventsStatus_id_seq"', 1, false);
          public          postgres    false    213            +           0    0    Role_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."Role_id_seq"', 3, true);
          public          postgres    false    216            ,           0    0    User_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."User_id_seq"', 10, true);
          public          postgres    false    215            c           2606    16814     CandidateEvent CandidateEvent_pk 
   CONSTRAINT     b   ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_pk" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public."CandidateEvent" DROP CONSTRAINT "CandidateEvent_pk";
       public            postgres    false    201            _           2606    16816    Candidate Candidate_Email_key 
   CONSTRAINT     _   ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_Email_key" UNIQUE ("Email");
 K   ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT "Candidate_Email_key";
       public            postgres    false    200            a           2606    16818    Candidate Candidate_pk 
   CONSTRAINT     X   ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_pk" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT "Candidate_pk";
       public            postgres    false    200            e           2606    16820 $   CandidatesStatus CandidatesStatus_pk 
   CONSTRAINT     f   ALTER TABLE ONLY public."CandidatesStatus"
    ADD CONSTRAINT "CandidatesStatus_pk" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."CandidatesStatus" DROP CONSTRAINT "CandidatesStatus_pk";
       public            postgres    false    204            k           2606    16822    EmployeeEvent EmployeeEvent_pk 
   CONSTRAINT     `   ALTER TABLE ONLY public."EmployeeEvent"
    ADD CONSTRAINT "EmployeeEvent_pk" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."EmployeeEvent" DROP CONSTRAINT "EmployeeEvent_pk";
       public            postgres    false    207            g           2606    16824    Employee Employee_Email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_Email_key" UNIQUE ("Email");
 I   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_Email_key";
       public            postgres    false    206            i           2606    16826    Employee Employee_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_pk" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_pk";
       public            postgres    false    206            m           2606    16828    Event Event_pk 
   CONSTRAINT     P   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pk" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "Event_pk";
       public            postgres    false    210            o           2606    16830    EventsStatus EventsStatus_pk 
   CONSTRAINT     ^   ALTER TABLE ONLY public."EventsStatus"
    ADD CONSTRAINT "EventsStatus_pk" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."EventsStatus" DROP CONSTRAINT "EventsStatus_pk";
       public            postgres    false    212            q           2606    16904    User Login_unique 
   CONSTRAINT     S   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "Login_unique" UNIQUE ("Login");
 ?   ALTER TABLE ONLY public."User" DROP CONSTRAINT "Login_unique";
       public            postgres    false    214            u           2606    16888    Role Role_Role_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_Role_key" UNIQUE ("Role");
 @   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_Role_key";
       public            postgres    false    217            w           2606    16886    Role Role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pk" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Role" DROP CONSTRAINT "Role_pk";
       public            postgres    false    217            s           2606    16832    User User_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pk" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pk";
       public            postgres    false    214            y           2606    16833 !   CandidateEvent CandidateEvent_fk0    FK CONSTRAINT     �   ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_fk0" FOREIGN KEY (id_candidate) REFERENCES public."Candidate"(id);
 O   ALTER TABLE ONLY public."CandidateEvent" DROP CONSTRAINT "CandidateEvent_fk0";
       public          postgres    false    2913    201    200            z           2606    16838 !   CandidateEvent CandidateEvent_fk1    FK CONSTRAINT     �   ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_fk1" FOREIGN KEY (id_event) REFERENCES public."Event"(id);
 O   ALTER TABLE ONLY public."CandidateEvent" DROP CONSTRAINT "CandidateEvent_fk1";
       public          postgres    false    2925    201    210            {           2606    16843 !   CandidateEvent CandidateEvent_fk2    FK CONSTRAINT     �   ALTER TABLE ONLY public."CandidateEvent"
    ADD CONSTRAINT "CandidateEvent_fk2" FOREIGN KEY ("id_candidateStatus") REFERENCES public."CandidatesStatus"(id);
 O   ALTER TABLE ONLY public."CandidateEvent" DROP CONSTRAINT "CandidateEvent_fk2";
       public          postgres    false    204    2917    201            x           2606    16848    Candidate Candidate_fk0    FK CONSTRAINT     �   ALTER TABLE ONLY public."Candidate"
    ADD CONSTRAINT "Candidate_fk0" FOREIGN KEY ("id_candidatesStatus") REFERENCES public."CandidatesStatus"(id);
 E   ALTER TABLE ONLY public."Candidate" DROP CONSTRAINT "Candidate_fk0";
       public          postgres    false    2917    204    200            }           2606    16853    EmployeeEvent EmployeeEvent_fk0    FK CONSTRAINT     �   ALTER TABLE ONLY public."EmployeeEvent"
    ADD CONSTRAINT "EmployeeEvent_fk0" FOREIGN KEY (id_employee) REFERENCES public."Employee"(id);
 M   ALTER TABLE ONLY public."EmployeeEvent" DROP CONSTRAINT "EmployeeEvent_fk0";
       public          postgres    false    2921    206    207            ~           2606    16858    EmployeeEvent EmployeeEvent_fk1    FK CONSTRAINT     �   ALTER TABLE ONLY public."EmployeeEvent"
    ADD CONSTRAINT "EmployeeEvent_fk1" FOREIGN KEY (id_event) REFERENCES public."Event"(id);
 M   ALTER TABLE ONLY public."EmployeeEvent" DROP CONSTRAINT "EmployeeEvent_fk1";
       public          postgres    false    210    2925    207            |           2606    16863    Employee Employee_fk0    FK CONSTRAINT     y   ALTER TABLE ONLY public."Employee"
    ADD CONSTRAINT "Employee_fk0" FOREIGN KEY (id_user) REFERENCES public."User"(id);
 C   ALTER TABLE ONLY public."Employee" DROP CONSTRAINT "Employee_fk0";
       public          postgres    false    214    2931    206                       2606    16868    Event Event_fk0    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_fk0" FOREIGN KEY ("id_eventsStatus") REFERENCES public."EventsStatus"(id);
 =   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "Event_fk0";
       public          postgres    false    2927    212    210            �           2606    16889    User User_fk0    FK CONSTRAINT     q   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_fk0" FOREIGN KEY (id_role) REFERENCES public."Role"(id);
 ;   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_fk0";
       public          postgres    false    2935    217    214               w   x�32�0�¦.�3.컰	�sa��v�̲�<=� f�r��!��!gay*2�b����",��9/�_l�؈FUU$�U%;�($=@�ǈ3�8��8%L�;�h�c����  Q�         Y   x�326�0��V���6]�qa��Ƌ��F&�f�&\F��_l����֋�^��id�2J�@56����́�fZ� Zc���� u�5            x�U���@D��*\�f(� � � N�aK���7�|HF;3�7��Ak:.�$�d�N�=�U��Y`G.��d�����+��X8$Ӫ�~��h��Q%�k�6���N�/�潷�T߫��=�Db;      	   <   x�34�,,OE�z@� ��J9�������g���gbq
:�b� C 1z\\\ (rS      
      x�324�"3.#CN �b���� 4�         o   x�3��MM-��K�4202�5"S+S+#S=sCscCN#.c�/컰��֋�6\�{aǅ��:L����M�-LL8��,8KR�K����fZp�p��qqq "�"Q         X   x�3�0��/��{/��pa߅M`�>.#��.��]l���b���[��!Zv��~a+X�	�	.�^�qaW� S�6�         L   x�3�0�{.츰����.6\�p��¾�\F��\��ފ$h�ya>Pp�Şہ�&��V�+F��� �@2�         t   x�%�A�0����~ ��N�#xA.m�J�@���A��J��Dｽ��N�;��qR)R(� �bS�?�^ɿ��5o��5�J�d�\[l��5-q�@B7 Sw>m?����7(!     