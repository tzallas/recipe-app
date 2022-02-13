import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

function App() {

  const APP_ID = 'd5373d1a';
  const APP_KEY = '7a9c126fb41614acac7b2e8bab748082';

  const [recipes, setRecipes] =  useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes()
  },[query]);

  const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json();
      setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type = "submit"  >Search</button>
      </form>
      <div className="recipes">
      {recipes.map( recipe => (
        <Recipe
          key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
      ))}
      </div>
    </div>
  );
}

export default App;
