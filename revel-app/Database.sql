CREATE TABLE "Employee" (
	"id" serial NOT NULL,
	"Firstname" VARCHAR(255) NOT NULL,
	"Lastname" VARCHAR(255) NOT NULL,
	"Patronymic" VARCHAR(255),
	"Position" VARCHAR(255) NOT NULL,
	"Email" VARCHAR(255) NOT NULL,
	"Phone" VARCHAR(255) NOT NULL,
	"id_user" integer NOT NULL,
	CONSTRAINT "Employee_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Candidate" (
	"id" serial NOT NULL,
	"Firstname" VARCHAR(255) NOT NULL,
	"Lastname" VARCHAR(255) NOT NULL,
	"Patronymic" VARCHAR(255),
	"Email" VARCHAR(255) NOT NULL,
	"Phone" VARCHAR(255) NOT NULL,
	"id_candidatesStatus" integer NOT NULL,
	CONSTRAINT "Candidate_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "User" (
	"id" serial NOT NULL,
	"Login" VARCHAR(255) NOT NULL,
	"Password" VARCHAR(255) NOT NULL,
	"UserPhoto" BINARY,
	"LastVisite" DATETIME,
	"id_role" integer NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Event" (
	"id" serial NOT NULL,
	"Theme" VARCHAR(255) NOT NULL,
	"Beginning" DATETIME NOT NULL,
	"id_eventsStatus" integer NOT NULL,
	CONSTRAINT "Event_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "CandidatesStatus" (
	"id" serial NOT NULL,
	"Status" VARCHAR(255) NOT NULL,
	CONSTRAINT "CandidatesStatus_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "EventsStatus" (
	"id" serial NOT NULL,
	"Status" VARCHAR(255) NOT NULL,
	CONSTRAINT "EventsStatus_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "EmployeeEvent" (
	"id" serial NOT NULL,
	"id_employee" integer NOT NULL,
	"id_event" integer NOT NULL,
	CONSTRAINT "EmployeeEvent_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "CandidateEvent" (
	"id" serial NOT NULL,
	"candidatesStatusValue" VARCHAR(255) NOT NULL,
	"id_candidate" integer NOT NULL,
	"id_event" integer NOT NULL,
	"id_candidateStatus" integer NOT NULL,
	CONSTRAINT "CandidateEvent_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Role" (
	"id" serial NOT NULL,
	"Role" VARCHAR(255) NOT NULL UNIQUE,
	CONSTRAINT "Role_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Employee" ADD CONSTRAINT "Employee_fk0" FOREIGN KEY ("id_user") REFERENCES "User"("id");

ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_fk0" FOREIGN KEY ("id_candidatesStatus") REFERENCES "CandidatesStatus"("id");

ALTER TABLE "User" ADD CONSTRAINT "User_fk0" FOREIGN KEY ("id_role") REFERENCES "Role"("id");

ALTER TABLE "Event" ADD CONSTRAINT "Event_fk0" FOREIGN KEY ("id_eventsStatus") REFERENCES "EventsStatus"("id");



ALTER TABLE "EmployeeEvent" ADD CONSTRAINT "EmployeeEvent_fk0" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id");
ALTER TABLE "EmployeeEvent" ADD CONSTRAINT "EmployeeEvent_fk1" FOREIGN KEY ("id_event") REFERENCES "Event"("id");

ALTER TABLE "CandidateEvent" ADD CONSTRAINT "CandidateEvent_fk0" FOREIGN KEY ("id_candidate") REFERENCES "Candidate"("id");
ALTER TABLE "CandidateEvent" ADD CONSTRAINT "CandidateEvent_fk1" FOREIGN KEY ("id_event") REFERENCES "Event"("id");
ALTER TABLE "CandidateEvent" ADD CONSTRAINT "CandidateEvent_fk2" FOREIGN KEY ("id_candidateStatus") REFERENCES "CandidatesStatus"("id");

