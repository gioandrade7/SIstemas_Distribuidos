import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import ResultForm from "./ResultForm";
import MovieList from "./MovieList";
import api from "../services/api";
import "./App.css";

function App() {
  const horrorEndpoint = "/horror";
  const actionEndpoint = "/action";
  const interEndpoint = "/intersection";
  const [searchResult, setSearchResult] = useState("");
  const [horror_movies, setHorror] = useState([]);
  const [action_movies, setAction] = useState([]);
  const [error, setError] = useState();

  const fetchHorror = async () => {
    try {
      const { data } = await api.get(horrorEndpoint);
      setHorror(data);
    } catch (error) {
      setError("Could not fetch the horror movies!");
    }
  };
  const fetchAction = async () => {
    try {
      const { data } = await api.get(actionEndpoint);
      setAction(data);
    } catch (error) {
      setError("Could not fetch the action movies!");
    }
  };

  const handleAddHorror = async (title) => {
    try {
      const horror_movie = { _id: Date.now(), title };
      setHorror([...horror_movies, horror_movie]);

      const { data: savedHorror } = await api.create(horrorEndpoint, horror_movie);

      setHorror([...horror_movies, savedHorror]);
    } catch (error) {
      setError("Could not save the horror movie!");
      setHorror(horror_movies);
    }
  };

  const titleSearch = async (title) => {
    if (title === ""){
      setSearchResult({
        horror_movie: null,
        action_movie: null
      });
      return;
    }
    try {
      const { data } = await api.get(interEndpoint+"/"+title);
      setSearchResult(data);
    } catch (error) {
      console.log("Could not search movies!");
    }
  };

  const handleAddAction = async (title) => {
    try {
      const action_movie = { _id: Date.now(), title };
      setAction([...action_movies, action_movie]);

      const { data: savedAction } = await api.create(actionEndpoint, action_movie);

      setAction([...action_movies, savedAction]);
    } catch (error) {
      setError("Could not save the action movie!");
      setAction(action_movies);
    }
  };

  const handleDeleteHorror = async (horror_movie) => {
    try {
      setHorror(horror_movies.filter((m) => m !== horror_movie));
      await api.remove(horrorEndpoint + "/" + horror_movie._id);
    } catch (error) {
      setError("Could not delete the horror movie!");
      setHorror(horror_movies);
    }
  };

  const handleDeleteAction = async (action_movie) => {
    try {
      setAction(action_movies.filter((s) => s !== action_movie));
      await api.remove(actionEndpoint + "/" + action_movie._id);
    } catch (error) {
      setError("Could not delete the action movie!!");
      setAction(action_movies);
    }
  };

  useEffect(() => {
    fetchHorror();
    fetchAction();
  }, []);

  return (
    <div className="App">
        <h1>Busque um filme</h1>
        <ResultForm onSearchTitle={titleSearch} searchResult={searchResult} />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <h1>Insert a horror movie</h1>
        <MovieForm onAddMovie={handleAddHorror} placeholder="Add a film" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={horror_movies} onDeleteMovie={handleDeleteHorror} type="HorrorItem" />
        <h1>Insert an action movie</h1>
        <MovieForm onAddMovie={handleAddAction} placeholder="Add a film" />
        {error && (
          <p role="alert" className="Error">
            {error}
          </p>
        )}
        <MovieList movies={action_movies} onDeleteMovie={handleDeleteAction} type="ActionItem"/>
      </div>
  );
}

export default App;
