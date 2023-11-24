import { useEffect , React, useState } from "react"
import { useNavigate } from 'react-router-dom';
import './adminPanel.css';

export default function AdminPanel(){
    const history = useNavigate();
    const [users, setUsers] = useState([{}]);
    const [message, setMessage] = useState("");

    async function getConnection() {
      fetch(`http://localhost:3001/users/getAdmin`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "authorization" : sessionStorage.getItem("token")
          }})
          .then((res) => {
          if (res.status === 200) {
            console.log(res.status);
          } else {
            history("/");
          }
        });
      }

    async function getUsers() {
      try {
          const response = await fetch(`http://localhost:3001/users/getUsers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": sessionStorage.getItem("token")
          }});
          if (!response.ok) {
            history("/login");
            return;
          }
          const data = await response.json();
          console.log(data);
          setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function deleteUser(id) {
      try {
          const response = await fetch(`http://localhost:3001/users/deleteUser?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "authorization": sessionStorage.getItem("token")
          }});
        if (!response.ok) {
          setMessage("Error deleting User " + id);
          return;
      }
      setMessage("user " + id + " deleted")
      getUsers();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    useEffect(() => {
        getConnection();
        getUsers();
    }, [])

    return (
          <div>
              <header>
                  <h1>Admin panel</h1>
                  <p className="event">{message}</p>
                  <br />
              </header>
                {users.map((user) => (
                    <div className='usersDiv'>
                        <h4 className="user">{user.id}</h4>
                        <h5 className="user">{user.email}</h5>
                        <h5 className="user">admin role :{user.admin}</h5>
                        <button onClick={() => deleteUser(user.id)}>delete</button>
                    </div>
                ))}
          </div>
    );
}
