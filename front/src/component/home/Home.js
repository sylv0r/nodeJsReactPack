import { useEffect , React, useState } from "react"
import { useActionData, useNavigate } from 'react-router-dom';
import "./home.css";

export default function Home(){
    const history = useNavigate();
    const [data, setData] = useState([{}]);

    async function getConnection() {
        fetch(`http://localhost:3001/users/verifyToken`, {
           method: "GET",
           headers: {
               "Content-Type": "application/json",
               "authorization" : sessionStorage.getItem("token")
               }
           })
           .then((res) => {
            if (res.status === 200) {
                console.log(res.status);
             } else {
                 history("/login");
             }
           });
         }

    async function getData() {
        try {
            let url = `http://localhost:3001/your/get`;
            const response = await fetch(url, {
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
            setData(data.reverse());
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
          
    
    useEffect(() => {
        getConnection();
        //getData();
    }, [])


    return (
        <div>
            <header>
                <h1>Home</h1>
            </header>                
            <div className='divData'>
                {data.map((data) => (
                    <div className='data'>
                        <h3>{data.titre}</h3>
                        <p>{data.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
