export const getFavouriteMovies = async(id) => {
    const response = await fetch(
      `http://localhost:8080/api/favourite/${id}`, {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
  };

  // 给某个用户添加收藏
export const addFavouriteMovie = async (userId, movieId) => {
    const response = await fetch(`http://localhost:8080/api/favourite/`, {
      method: "POST",
      headers: {
        Authorization: window.localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, movieId }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };
  
  // 删除某个用户对某部电影的收藏
  export const deleteFavouriteMovie = async (userId, movieId) => {
    const response = await fetch(
      `http://localhost:8080/api/favourite/${userId}/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: window.localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  };