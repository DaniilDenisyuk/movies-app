CREATE TABLE Movie (
  Id serial,
  Title varchar(127) NOT NULL,
  ReleaseYear SMALLINT NOT NULL,
  Format varchar(31) NOT NULL
);

ALTER TABLE
  Movie
ADD
  CONSTRAINT pkMovie PRIMARY KEY (Id);

CREATE UNIQUE INDEX akMovie ON Movie (Title, ReleaseYear);

CREATE TABLE Actor (
  Id serial,
  FirstName varchar(127) NOT NULL,
  LastName varchar(127) NOT NULL
);

ALTER TABLE
  Actor
ADD
  CONSTRAINT pkActor PRIMARY KEY (Id);

CREATE UNIQUE INDEX akActor ON Actor (FirstName, LastName);

CREATE TABLE ActorMovie (
  ActorId INTEGER NOT NULL,
  MovieId INTEGER NULL
);

ALTER TABLE
  ActorMovie
ADD
  CONSTRAINT pkActorMovie PRIMARY KEY (MovieId, ActorId);

ALTER TABLE
  ActorMovie
ADD
  CONSTRAINT fkActorMovieMovieId FOREIGN KEY (MovieId) REFERENCES Movie (Id) ON DELETE CASCADE;

ALTER TABLE
  ActorMovie
ADD
  CONSTRAINT fkActorMovieActorId FOREIGN KEY (ActorId) REFERENCES Actor (Id) ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION insertIfActorIsNotExists(firstName VARCHAR, lastName VARCHAR) RETURNS INTEGER AS $$
DECLARE actorId INT;
BEGIN
SELECT
  Id INTO actorId
FROM
  Actor
WHERE
  Actor.FirstName = $1
  AND Actor.LastName = $2;
IF NOT FOUND THEN
INSERT INTO
  Actor (FirstName, LastName)
VALUES
  ($1, $2) RETURNING Id INTO STRICT actorId;
ELSE RETURN actorId;
END IF;
RETURN actorId;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION removeMovie(id INT) RETURNS INT AS $$
DELETE FROM
  movie
WHERE
  id = $1
RETURNING id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION allMovies() RETURNS TABLE(
  id int,
  title varchar,
  releaseyear smallint,
  format varchar,
  stars varchar
) AS $$
SELECT
  m.*, STRING_AGG(a.FirstName || ' ' || a.LastName, ', ') as stars
FROM
  Movie AS m
  INNER JOIN ActorMovie AS am ON m.Id = am.movieId
  INNER JOIN Actor AS a ON a.Id = am.actorId
GROUP BY
  m.Id
ORDER BY
  m.Id;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION createMovie(title VARCHAR, year SMALLINT, format VARCHAR, actors VARCHAR[]) RETURNS INTEGER AS $$
DECLARE retMovieId INT;
DECLARE retActorId INT;
DECLARE actor VARCHAR;
DECLARE actorName VARCHAR[];
BEGIN
  INSERT INTO movie (title, releaseyear, format) VALUES ($1,$2,$3) RETURNING id INTO STRICT retMovieId;
  FOREACH actor IN ARRAY actors
  LOOP
    actorName = string_to_array(actor, '');
    SELECT insertIfActorIsNotExists(actorName[1], COALESCE(actorName[2],' ')) INTO STRICT retActorId;
    INSERT INTO ActorMovie (movieId, actorId) VALUES (retMovieId, retActorId);
  END LOOP;
RETURN retMovieId;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE User (
  Id serial,
  Email varchar(127),
  Password varchar NOT NULL,
  Username varchar(31),
  Role varchar(31) NOT NULL
);

ALTER TABLE
  User
ADD
  CONSTRAINT pkUser PRIMARY KEY (Id);

CREATE UNIQUE INDEX akUserName ON User (UserName);
CREATE UNIQUE INDEX akEmail ON User (Email);

CREATE TABLE Profile (
  Id serial,
  UserId integer NOT NULL,
  Name varchar(127) NOT NULL,
  Gender varchar(31),
  Birthday varchar(31),
  City varchar(31)
);

ALTER TABLE
  Profile
ADD
  CONSTRAINT pkProfile PRIMARY KEY (Id);

CREATE UNIQUE INDEX akProfile ON Profile (UserId, Name, Gender, Birthday, City);
ALTER TABLE
  Profile
ADD
  CONSTRAINT fkProfileUserId FOREIGN KEY (UserId) REFERENCES User (Id) ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION createUser(Email varchar, Password varchar, Username varchar, Role varchar) RETURNS INT AS $$
INSERT INTO
  User (Email, Password, Username, Role) VALUES ($1, $2, $3, $4)
RETURNING id;
$$ LANGUAGE SQL;

-- CREATE OR REPLACE FUNCTION createProfile(Email varchar, Password varchar, Username varchar, Role varchar) RETURNS INT AS $$
-- INSERT INTO
--   User (Email, Password, Username, Role) VALUES ($1, $2, $3, $4)
-- RETURNING id;
-- $$ LANGUAGE SQL;