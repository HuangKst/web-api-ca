# Assignment 2 - Web API.

Name: Zihan Huang

StudentID：20108869

Youtube Link： https://youtu.be/xtpByoMqBWc 

## Features.

1. **User Management**
   - **`users/index.js`**: Handles user-related routes, such as registration, login, and retrieving user profiles.
   - **`userModel.js`**: Defines the user schema (e.g., username, password, email).
2. **Authentication**
   - **`authenticate/index.js`**: Manages user authentication, for example using JWT or session-based auth.
3. **Movies & Credits Management**
   - Movies:
     - **`movieModel.js`**: Defines the schema for movie data.
     - **`movies/index.js`**: Provides endpoints for fetching movie lists, details, and search functionality.
   - Credits:
     - **`creditModel.js`**: Defines the schema for credits (actors, directors, etc.).
     - **`credits/index.js`**: Offers routes to retrieve credits details and lists.
4. **Favourites Feature**
   - **`favourite/FavouriteModel.js`**: Defines the schema for storing users’ favorite items (movies or other types).
   - **`favourite/index.js`**: Provides endpoints to add, remove, and view a user’s list of favorites.
5. **TMDb API Integration**
   - **`tmdb-api.js`**: Encapsulates communication with the third-party TMDb service for fetching movie, cast, and crew data, making it easy to reuse across different routes.
6. **Database Connectivity & Initialization**
   - **`db/index.js`**: Handles database connections and configuration.
   - **`initialise-dev/initDevDB.js`**: Offers scripts to initialize and seed the database in development, helping with setup and testing.
7. **Error Handling**
   - **`errHandler/index.js`**: Centralized error handling to gracefully capture and handle exceptions, preventing detailed stack traces from leaking in production.

## Setup requirements.

`React-Movies`

You only need to run `npm strat`, then you can see the web run in the 3000port.

`Movies-api`

You can run `npm run dev` to debug the api which will create the init user and movies data in the MongoDB  and you can see the detail of the bug . What's more, you can only run `npm run start` which is only start the api, you will not see the detail of the bug in this situation.



## API Configuration

`Movies-api/.env`

Below is an explanation of each environment variable:

- **NODE_ENV=development**
   Indicates that the application is running in a development environment. Different environments (e.g., development, testing, production) typically have varying configurations, logging levels, and optimizations.
- **PORT=8080**
   Specifies the port on which the application listens. Incoming requests will be served through this port.
- **HOST=localhost**
   Defines the host address for the application. In this case, it’s pointing to your local machine (`localhost`).
- **MONGO_DB=**
   Provides the connection string for MongoDB, including the protocol (`mongodb://`), host (`localhost`), port (`27017`), and database name (`tasky_db`).
- **TMDB_KEY=**
   The API key for accessing [TMDb (The Movie Database)](https://www.themoviedb.org/), which provides information about movies, actors, and related data.
- **SECRET=**
   A secret key typically used for signing or encrypting tokens (for instance, JSON Web Tokens). This key helps secure authentication processes or other sensitive operations.

______________________

`React-movie`

**FAST_REFRESH=false**
This setting toggles React’s Fast Refresh feature for hot reloading in development. Setting it to `false` disables automatic component updates without losing state, which some developers prefer to turn off when debugging.

## API Design

## **Movies API**

| Endpoint                          | HTTP Verb | Description                                            |
| --------------------------------- | --------- | ------------------------------------------------------ |
| **/api/movies**                   | GET       | Gets a paginated list of movies, e.g., `?page=2`.      |
| **/api/movies/upcoming**          | GET       | Retrieves a list of upcoming movies, e.g., `?page=2`.  |
| **/api/movies/top-rate**          | GET       | Retrieves a list of top-rated movies, e.g., `?page=2`. |
| **/api/movies/tmdb/genres**       | GET       | Returns a list of movie genres from TMDb.              |
| **/api/movies/{movieId}**         | GET       | Gets the details of a specific movie by `movieId`.     |
| **/api/movies/{movieId}/images**  | GET       | Gets all images for a specific movie.                  |
| **/api/movies/{movieId}/reviews** | GET       | Gets all reviews for a specific movie.                 |
| **/api/movies/{movieId}/credits** | GET       | Gets the credits/cast list for a specific movie.       |

**Example:**

- `GET /api/movies?page=2` returns the second page of movie listings.
- `GET /api/movies/123/credits` returns the cast and crew for the movie with ID 123.

------

## **Credits API**

| Endpoint                          | HTTP Verb | Description                                                  |
| --------------------------------- | --------- | ------------------------------------------------------------ |
| **/api/credit/{creditId}**        | GET       | Gets the credit details (cast/crew) by `creditId`.           |
| **/api/credit/{creditId}/movies** | GET       | Retrieves all movies associated with a specific credit entry. |

------

## **Favourites API**

| Endpoint                              | HTTP Verb | Description                                                  |
| ------------------------------------- | --------- | ------------------------------------------------------------ |
| **/api/favourite/{userId}**           | GET       | Gets all favorite movies for the specified user.             |
| **/api/favourite**                    | POST      | Adds a new favorite movie, expects `{ userId, movieId }` in the request body. |
| **/api/favourite/{userId}/{movieId}** | DELETE    | Removes the specified movie from the user’s favorites list.  |

**Example:**

- `GET /api/favourite/10` returns all favorite movies for user with ID 10.
- `POST /api/favourite` with body `{ "userId": 10, "movieId": 123 }` saves movie 123 to user 10’s favorites.

------

## **Users API**

| Endpoint                | HTTP Verb | Description                                                  |
| ----------------------- | --------- | ------------------------------------------------------------ |
| **/api/users**          | GET       | Gets a list of all users (primarily for admin or testing purposes). |
| **/api/users**          | POST      | Depending on the `action` query param: `?action=register`: Registers a new user (expects `username`, `password`).Otherwise, attempts to authenticate an existing user (login). |
| **/api/users/{userId}** | PUT       | Updates user information (e.g., password, email).            |

**Example:**

- `POST /api/users?action=register` with body `{ "username": "john", "password": "secret" }` registers a new user.
- `POST /api/users` with body `{ "username": "john", "password": "secret" }` (no `action=register`) attempts to authenticate the user.
- `PUT /api/users/123` updates the user with ID 123.

------

## **Authentication**

1. **User Submits Credentials**

   - On the **Login Page**, the user enters their **username** and **password**.
   - Your front end calls the `login` function (imported from `users-api.js`) with those credentials.

2. **Server Response**

   - If authentication is 

     successful

     , the server responds with an object containing (at minimum) two properties:

     ```json
     {
       "success": true,
       "token": "BEARER <JWT token>",
       "user": {
         "userId": "XYZ"  // Example user ID
       }
     }
     ```

   - If authentication **fails**, the server responds with an error message (e.g., `"Authentication failed. User not found."` or `"Wrong password."`).

3. **Storing the Token**

   - In your `AuthContextProvider` if the server response contains a `token`the authenticate function:
     1. Saves the token in the browser’s `localStorage` via `localStorage.setItem("token", data)`.
     2. Updates `isAuthenticated` to `true`.
     3. Stores `userId` (and potentially the username) for later use.

4. **Accessing Protected Routes**

   - Your `ProtectedRoutes` component checks `context.isAuthenticated`.
   - If `isAuthenticated` is `true`, it allows the user to continue to the desired route (using `<Outlet />`).
   - If `isAuthenticated` is `false`, it redirects the user to the `/login` page.

5. **Page Refreshes**

   - Because the token is stored in `localStorage`, a page refresh won’t automatically log the user out.
   - The `AuthContextProvider` reads `existingToken` from `localStorage` upon initialization, which sets `isAuthenticated` back to `true` if the token still exists.

6. **Sign Out**

   - When signing out, the `signout` function sets `isAuthenticated` to `false` and can also clear the token from `localStorage` if you choose (though this is optional in your current code).

------

## **Typical Server Response (Successful Login)**

A successful login might look like this (as returned by your Node/Express back end):

```json
{
  "success": true,
  "token": "BEARER eyJhbGciOiJI...<rest_of_the_jwt>...",
  "user": {
    "userId": "12345"
  }
}
```

- **token**: A Bearer token (JWT) to be sent in an `Authorization` header when making subsequent requests to protected endpoints.
- **user**: An object containing user-specific data (e.g., `userId`, `username`, etc.).

**Example usage on the front end**:

```js
if (result.token) {
  setToken(result.token);       // Save token to localStorage
  setIsAuthenticated(true);     // App knows user is logged in
  setUserName(username);        // Save username in context
  localStorage.setItem("userId", result.user.userId);
}
```

------

## **Protected Routes**

- **Mechanism**: Wrapped with the `<ProtectedRoutes>` component, which checks `context.isAuthenticated`.
- Behavior:
  - **Authenticated**: The user gains access to routes such as `/movies`, `/movies/favorites`, etc.
  - **Not Authenticated**: The user is redirected to the `/login` page, with the previous location stored in `state` (so you can redirect them back after login if desired).



## Integrating with React App

## 1. **Replacing TMDB Endpoints with Local API Endpoints**

### **1.1 Favorites-Related Endpoints**

- `getFavouriteMovies(id)`
  - Previously, I might have been storing favorites in local state or using placeholders. Now, I use a fetch call to `http://localhost:8080/api/favourite/{userId}` to retrieve the authenticated user’s favorite movies from my own database.
- `addFavouriteMovie(userId, movieId)`
  - A new POST request to `http://localhost:8080/api/favourite/` is made to add a movie to a user’s favorites list.
- `deleteFavouriteMovie(userId, movieId)`
  - A new DELETE request to `http://localhost:8080/api/favourite/{userId}/{movieId}` is used to remove a favorite.

### **1.2 Movie Retrieval & Details**

- `getMovies(page)`/ `getUpcomingMovies(page)` / `getTopRateMovies(page)`
  - Instead of calling TMDB directly, these functions now fetch from my local API (`/api/movies`, `/api/movies/upcoming`, `/api/movies/top-rate`) while still supporting pagination via the `?page` query parameter.
- `getMovie(args)`, `getMovieImages(args)`, `getMovieReviews(args)`, `getMovieCredits(args)`
  - These functions fetch movie details, images, reviews, or credits from the local endpoint (`http://localhost:8080/api/movies/{id}/...`). Internally, the server may still call TMDB, but the front end only interacts with my Node API.
- `getGenres()`
  - Retrieves movie genres from `http://localhost:8080/api/movies/tmdb/genres` (which the server obtains from TMDB, but the front end calls my own server).

### **1.3 Credits**

- `getCreditDetails(args)` and `getCreditMovies(args)`
  - Provide cast/crew (credits) data, fetched from `/api/credit/{id}` or `/api/credit/{id}/movies`. Again, the server calls TMDB on the backend, so the client remains consistent with local endpoints.

------

## 2. **Introducing Authentication & User Account Management**

### **2.1 Login and Signup**

- `login(username, password)`
  - Sends a POST request to `http://localhost:8080/api/users`, retrieving a JWT token (and user info) if successful.
- `signup(username, password)`
  - Registers a new user via `http://localhost:8080/api/users?action=register`.

### **2.2 Securing Requests with a JWT**

- The token returned by `login` or `signup` is stored in `localStorage`.

- Every subsequent request includes an 

  ```
  Authorization
  ```

   header containing the token:

  ```js
  headers: {
    'Authorization': window.localStorage.getItem('token')
  }
  ```

- The server checks the token before granting access to routes like `/api/favourite`, `/api/movies`, and `/api/credit`.

------

## 3. **React App Updates vs. Assignment One**

1. **Authentication Flow & Protected Routes**
   - Implemented `AuthContextProvider` to manage user state (i.e., `isAuthenticated`, `authToken`, `userId`).
   - Created `<ProtectedRoutes>` component that checks `context.isAuthenticated`. If false, the user is redirected to `/login`.
   - Updated the Router to nest protected routes inside `<ProtectedRoutes>`, enforcing that only authenticated users can visit `/movies`, `/favourite`, etc.
2. **Favorites Features**
   - Instead of using dummy data or storing favorites locally, integrated a real database-backed approach. The React front end now uses the new endpoints (e.g., `/api/favourite`) to view, add, or remove favorites.
3. **User Signup / Login Views**
   - Added a **LoginPage** and **SignUpPage** to let users authenticate with the API.
   - Storing the user’s token and ID in local storage to maintain session after refreshing.
4. **Local API Calls**
   - Moved all direct TMDB calls into the Node/Express backend. The front end only ever calls my local server (`localhost:8080`) for data. This change ensures consistent routing and token checks.
5. **Minor UI Adjustments**
   - Revised some components to reflect changes in the data structure (e.g., referencing movie ID vs. TMDB’s ID if different, or capturing the user’s favorites from the server side).
   - Any pages that display movie details, lists, or a user’s watchlist now work directly with the Node-based API endpoints.

## Independent learning (if relevant)

I independently learned how to use the `nanoid` library for unique ID generation. Using dynamic imports, I simply called `nanoid(12)` to create a 12-character unique user ID for each new user.