import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import pizzaImg from "../Assets/pizza2.jpg";

const PizzaForm = (props) => {
  const [newPizza, setNewPizza] = useState({
    name: "",
    size: "",
    sauce: "",
    subsitute: false,
    special: "",
  });
  const [toppings, setToppings] = useState({
    Pepperoni: false,
    Sassuage: false,
    "Canadian Bacon": false,
    "Spicy Italian Sassuage": false,
    "Grilled Chicken": false,
    Onions: false,
    "Green Pepper": false,
    "Diced Tomatos": false,
    "Black Olives": false,
    "Roasted Garlic": false,
    "Artichoke Hearts": false,
    "Three Cheese": false,
    " Pineapple": false,
    "Extra Cheese": false,
  });

  const [post, setPost] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const listOfToppings = [
    "Pepperoni",
    "Sassuage",
    "Canadian Bacon",
    "Spicy Italian Sassuage",
    "Grilled Chicken",
    "Onions",
    "Green Pepper",
    "Diced Tomatos",
    "Black Olives",
    "Roasted Garlic",
    "Artichoke Hearts",
    "Three Cheese",
    "Pineapple",
    "Extra Cheese",
  ];
  const validateChange = (e) => {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        console.log("valid");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(toppings);
    setNewPizza({ ...newPizza, toppings });
    axios.post("https://reqres.in/api/users", newPizza).then((res) => {
      setPost(res.data);
      console.log(res.data);
    });

    console.log(e);
  };
  const handleChange = (e) => {
    e.persist();
    validateChange(e);
    console.log(e.target.type);
    setNewPizza({
      ...newPizza,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const handleToppings = (name) => {
    setToppings({ ...toppings, [name]: !toppings[name] });
  };
  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Must include a name")
      .min(2, "Name must be longer than two characters"),
    size: Yup.string().required("Must choose Size"),
    sauce: Yup.string().required("Must Choose a sauce"),
    subsitute: Yup.string(),
    special: Yup.string(),
  });
  useEffect(() => {
    formSchema.isValid(newPizza).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [newPizza]);
  return (
    <div className="pizza-form">
      <h2>Build Your Own Pizza</h2>
      <img src={pizzaImg} alt="pizza" />
      <form onSubmit={(event) => handleSubmit(event)}>
        <h3>Build Your Own Pizza</h3>
        <label htmlFor="nameInput">
          <h4>Name for the Order</h4>
          <input
            type="text"
            name="name"
            placeholder="Whats your name?"
            onChange={(event) => handleChange(event)}
          />
        </label>
        <label htmlFor="sizeInput">
          <h4>Choice of Size</h4>
          <select
            id="sizeInput"
            name="size"
            placeholder="Select"
            onChange={(event) => handleChange(event)}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </label>
        <label htmlFor="sauceInput" id="sauces">
          <h4>Choice of Sauce</h4>
          <div className="sauceOption">
            <input
              type="radio"
              name="sauce"
              value="Origional Red"
              onChange={(event) => handleChange(event)}
            />
            Origional Red
          </div>
          <div className="sauceOption">
            <input
              type="radio"
              name="sauce"
              value="Garlic Ranch"
              onChange={(event) => handleChange(event)}
            />
            Garlic Ranch
          </div>
          <div className="sauceOption">
            <input
              type="radio"
              name="sauce"
              value="BBQ Sauce"
              onChange={(event) => handleChange(event)}
            />
            BBQ Sauce
          </div>
          <div className="sauceOption">
            <input
              type="radio"
              name="sauce"
              value="Spinach Alfredo"
              onChange={(event) => handleChange(event)}
            />
            z Spinach Alfredo
          </div>
        </label>
        <label htmlFor="toppingInput">
          <h4>Add Toppings</h4>
          <div id="toppings">
            {listOfToppings.map((topping) => {
              return (
                <div className="topping">
                  <p>{topping}</p>
                  <input
                    type="checkbox"
                    name="toppings"
                    value={topping}
                    checked={toppings[topping]}
                    onChange={(event) => handleToppings(topping)}
                  />
                </div>
              );
            })}
          </div>
        </label>
        <label htmlFor="subsituteInput">
          <h4>Choice of Subsitute</h4>
          <input
            type="checkbox"
            name="subsitute"
            checked={newPizza.subsitute}
            onChange={(event) => handleChange(event)}
          />
          Gluten Free Crust(+ $1.00)
        </label>
        <label htmlFor="specialInput">
          <h4>Special Instructions</h4>
          <input
            type="text"
            name="special"
            placeholder="Anything Else you'd Like to add?"
            onChange={(event) => handleChange(event)}
          />
        </label>
        <div id="order">
          <button disabled={buttonDisabled}>Add to Order</button>
        </div>
      </form>
    </div>
  );
};
export default PizzaForm;
