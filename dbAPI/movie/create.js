export function create(db, film) {
  const {
    movie: { title, format, releaseyear },
    actor,
  } = film;
  return db
    .query(
      `SELECT createMovie('${title}',${releaseyear}::smallint,'${format}','{${actor.toString()}}') as id`
    )
    .then((data) => data.rows[0].id);
}
