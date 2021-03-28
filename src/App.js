import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//components
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
// sites
import About from "./components/About";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  async function addTask(task) {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  async function onDelete(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter(task => task.id !== id));
  }

  async function toggleReminder(id) {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  }

  return (
    <Router>
      <div className="container">
        <Header
          showAddTask={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />

        {showAddTask && <AddTask addTask={addTask} />}

        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <>
                {tasks.length ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={onDelete}
                    toggleReminder={toggleReminder}
                  />
                ) : (
                  "You don't have any task"
                )}
              </>
            )}
          />
          <Route path="/about">
            <About />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}
///////////////////////////////////////////dfsfsd////
export default App;
