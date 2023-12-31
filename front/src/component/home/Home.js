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
            if (res.status !== 200) {
                history("/login");
            }
        });
         }

    async function getData() {
        try {
            let url = `http://localhost:3001/data/getData`;
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
        getData();
    }, [])


    return (
        <div>
            <header>
                <h1 >Home</h1>
            </header>                
            <div className='divData'>
                {data.map((data, index) => (
                    <div className='data'>
                        <h3 key={index}>{data.value}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
