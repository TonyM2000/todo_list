// npm i bootstrap
import React, { useState } from "react";

function App() {
  const [newToDo, setNewToDo] = useState({
    task: "",
    isComplete: false,
    id: crypto.randomUUID(),
  });
  const [toDos, setToDos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    setToDos([...toDos, newToDo]);
    setNewToDo({
      task: "",
      isComplete: false,
      id: crypto.randomUUID(),
    });
  };

  const handleChange = (event) => {
    setNewToDo({ ...newToDo, [event.target.id]: event.target.value });
  };

  // this is to handle what happens when you click the checkbox
  const handleCheck = (id) => {
    const updatedTodos = toDos.map((toDo) => {
      if (toDo.id === id) {
        toDo.isComplete = !toDo.isComplete;
      }
      return toDo;
    });
    setToDos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = toDos.filter((toDo) => toDo.id !== id);
    setToDos(updatedTodos);
  };

  return (
    <div className="container">
      <form
        onSubmit={(event) => {
          handleNewTodoSubmit(event);
        }}
      >
        <label htmlFor="toDo" className="form-label">
          To Do
        </label>
        <input
          id="task"
          className="form-control"
          onChange={handleChange}
          type="text"
          value={newToDo.task}
        ></input>
        <div className="text-end">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
      {/* use the && to set a conditional, if it tries to map when the array isnt made it'll throw an error */}
      <ul className="list-group">
        {toDos &&
          toDos.map((toDo) => (
            // we can set key to toDo.id because we used crypto to give everything an id
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={toDo.id}
            >
              <div className="form-check">
                <input
                  onChange={() => handleCheck(toDo.id)}
                  className="form-check-input"
                  type="checkbox"
                  checked={toDo.isComplete}
                  id="flexCheckDefault"
                />
                {/* this basically checks if the box is checked and if it is, applies a text decoration */}
                <label
                  className={`form-check-label ${
                    toDo.isComplete ? "text-decoration-line-through" : ""
                  }`}
                  htmlFor="flexCheckDefault"
                >
                  {toDo.task}
                </label>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(toDo.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
