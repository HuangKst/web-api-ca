import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingPage from "./pages/upcomingPage";
import TopRatePage from "./pages/topRatePage";
import CreditsPage from "./pages/creditsPage";
import ListOfCreditsPage from "./pages/listOfCreditsPage";
import WatchListPage from "./pages/watchListPage";
import ProtectedRoutes from "./protectRoutes";
import LoginPage from "./pages/LoginPage";
import AuthContextProvider from "./contexts/authContext";
import SignUpPage from "./pages/signUpPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const Layout = () => {
  return (
    <>
      { <SiteHeader />} 
      <Routes>
        <Route >
          <Route path="/home" element={<HomePage />} />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/reviews/:id" element={<MovieReviewPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/reviews/form" element={<AddMovieReviewPage />} />
          <Route path="/movies/upcoming" element={<UpcomingPage />} />
          <Route path="/movies/top_rate" element={<TopRatePage />} />
          <Route path="/credits/:id" element={<CreditsPage />} />
          <Route path="/movies/:id/cast" element={<ListOfCreditsPage />} />
          <Route path="/movies/watchList" element={<WatchListPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <MoviesContextProvider element={<ProtectedRoutes/>}>
            <Layout /> {/* 将 Layout 放在 BrowserRouter 内部 */}
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);