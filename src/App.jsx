import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  // console.log(users);

  const handleUserInput = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Inside Post Response", data);
      });
  };

  return (
    <>
      <header>
        <h1 className="py-4 text-3xl font-semibold">User Management System</h1>
      </header>
      <main className="py-3">
        <section>
          <form
            onSubmit={handleUserInput}
            className="flex flex-col gap-4 px-3 py-7 bg-blue-400 rounded-md"
          >
            <input
              className="py-3 px-2 rounded-md"
              type="text"
              name="name"
              placeholder="Enter name"
            />
            <input
              className="py-3 px-2 rounded-md"
              type="text"
              name="email"
              placeholder="Enter email"
            />
            <button className="bg-blue-800 hover:bg-blue-700 text-white font-semibold">
              Submit
            </button>
          </form>
        </section>
        <section className="py-7 text-red-950">
          <h2 className="py-4 text-3xl font-bold">
            USERS: Total - {users.length} Persons
          </h2>
          {users.map((user) => (
            <p className="border p-4 bg-red-50 " key={user.id}>
              {user.id} {user.name} {user.email}
            </p>
          ))}
        </section>
      </main>
      <footer className="bg-red-600 text-white py-16">
        <p>
          <small>All rights preserverd by devAlienBrain @2023</small>
        </p>
      </footer>
    </>
  );
}

export default App;
