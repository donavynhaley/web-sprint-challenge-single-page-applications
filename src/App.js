import React from "react";
import { Route, Link } from "react-router-dom";
import pizzaImg from "./Assets/Pizza.jpg";
import PizzaForm from "./Components/PizzaForm.js";
const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Lambda Eats</h1>
        <nav>
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/help">
            <h2>Help</h2>
          </Link>
        </nav>
      </header>
      <Route exact path="/">
        <div className="order-pizza">
          <img src={pizzaImg} alt="pizza" />
          <Link to="/pizza">
            <button>Pizza</button>
          </Link>
        </div>
      </Route>
      <div className="content">
        <Route path="/pizza">
          <PizzaForm />
        </Route>
        <Route path="/about" component={null} />
      </div>
    </div>
  );
};
export default App;
