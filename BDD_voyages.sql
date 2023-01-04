/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 9.x                                */
/* Date de cr�ation :  28/11/2022 09:42:13                      */
/*==============================================================*/

--  On vérifie si les table exist avant de les créer pour éviter les bugs
DROP index IF EXISTS GET_FK;

DROP index IF EXISTS DETAIL_PK;

DROP table IF EXISTS DETAIL;

DROP index IF EXISTS CREATE_FK;

DROP index IF EXISTS LIST_PK;

DROP table IF EXISTS LIST;

DROP index IF EXISTS USER_PK;

DROP table IF EXISTS "USER";

/*==============================================================*/
/* Table : DETAIL                                               */
/*==============================================================*/
create table DETAIL (
   DETAIL_ID            SERIAL PRIMARY KEY,
   LIST_ID              INT                 not null,
   DETAIL_DESCRIPTION   VARCHAR(1024)        not null
   -- constraint PK_DETAIL primary key (DETAIL_ID)
);

/*==============================================================*/
/* Index : DETAIL_PK                                            */
/*==============================================================*/
create unique index DETAIL_PK on DETAIL (
DETAIL_ID
);

/*==============================================================*/
/* Index : GET_FK                                               */
/*==============================================================*/
create  index GET_FK on DETAIL (
LIST_ID
);

/*==============================================================*/
/* Table : LIST                                                 */
/*==============================================================*/
create table LIST (
   LIST_ID              SERIAL PRIMARY KEY,
   USER_ID              INT                 not null,
   LIST_TITLE           VARCHAR(1000)        not null
   -- constraint PK_LIST primary key (LIST_ID)
);

/*==============================================================*/
/* Index : LIST_PK                                              */
/*==============================================================*/
create unique index LIST_PK on LIST (
LIST_ID
);

/*==============================================================*/
/* Index : CREATE_FK                                            */
/*==============================================================*/
create  index CREATE_FK on LIST (
USER_ID
);

/*==============================================================*/
/* Table : "USER"                                               */
/*==============================================================*/
create table "USER" (
   USER_ID              SERIAL PRIMARY KEY,
   USER_FIRSTNAME       VARCHAR(100)         null,
   USER_LASTNAME        VARCHAR(100)         null,
   USER_MAIL            VARCHAR(200)         not null UNIQUE,
   USER_MDP             VARCHAR(250)         not null,
   -- constraint PK_USER primary key (USER_ID),
   constraint USER_MAIL UNIQUE (user_mail)
);

/*==============================================================*/
/* Index : USER_PK                                              */
/*==============================================================*/
create unique index USER_PK on "USER" (
USER_ID
);

alter table DETAIL
   add constraint FK_DETAIL_GET_LIST foreign key (LIST_ID)
      references LIST (LIST_ID)
      -- on delete restrict on update restrict;
      ON DELETE CASCADE;

alter table LIST
   add constraint FK_LIST_CREATE_USER foreign key (USER_ID)
      references "USER" (USER_ID)
      -- on delete restrict on update restrict;
      ON DELETE CASCADE;

