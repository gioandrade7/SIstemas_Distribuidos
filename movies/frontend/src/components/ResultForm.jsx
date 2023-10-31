import React, { useEffect, useState } from "react";
import Input from "./Input";

function ResultForm({onSearchTitle, searchResult}) {
  const [title, setTitle] = useState("");
  const handleChange = (e) => setTitle(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) return;

    onSearchTitle(title);
  };
  var response = ""
  if(searchResult.action_movie != null && searchResult.horror_movie){
    response = `The movie ${searchResult.action_movie.title} is an action and a horror movie.`;
  }else if (searchResult.action_movie != null){
    response = `The  movie${searchResult.action_movie.title} is an action movie.`;
  }else if(searchResult.horror_movie){
    response = `The movie ${searchResult.horror_movie.title} is a horror movie.`;
  }else{
    response = `The movie ${title} doesn't exist!`;
  }

  useEffect(()=>onSearchTitle(title), [title]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
        aria-label="Database Search"
        onChange={handleChange}
        placeholder="Search for a movie"
        type="text"
        />
      </form>
      <h3>
        {response}
      </h3>
    </div>
  )
}

export default ResultForm;