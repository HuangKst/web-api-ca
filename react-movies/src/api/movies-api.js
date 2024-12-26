export const getGenres = async() => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/genres', {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
};

export const getUpcomingMovies = async(page) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/upcoming?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

export const getMovies = async(page) => {
  const response = await fetch(
    `http://localhost:8080/api/movies?page=${page}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  }
  )
  return response.json();
};

//find movie by id 
export const getMovie = async(args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/${id}`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  } 
  )
  return response.json(); 
}; 

//find movie images by id 
export const getMovieImages = async(args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/images`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  } 
  )
  return response.json(); 
}; 

//find movie images by id 
export const getTopRateMovies = async(page) => {
  const response = await fetch(
    `http://localhost:8080/api/movies/top-rate`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  } 
  )
  return response.json(); 
}; 

//find movie reviews by id 
export const getMovieReviews = async(args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/reviews`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  } 
  )
  return response.json(); 
}; 

//find credits by movie id  
export const getMovieCredits = async(args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  const response = await fetch(
    `http://localhost:8080/api/movies/${id}/credits`, {
    headers: {
      'Authorization': window.localStorage.getItem('token')
    }
  } 
  )
  return response.json(); 
}; 