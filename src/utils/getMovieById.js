export const getMovieById = (id, movies) => {
  const movie = movies.find((movie) => movie.id === id);
  return movie;
}
