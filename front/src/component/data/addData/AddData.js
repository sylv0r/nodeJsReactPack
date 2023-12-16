import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addData.css';

export default function AddData() {
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
            if (!res.status === 200) {
                history("/login");
             }
           });
         }

    async function postData() {
        try {
            let url = `http://localhost:3001/data/postData`;
            const response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "authorization": sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                value: data
            })
            });
            if (!response.ok) {
                history("/login");
                return;
            }} catch (error) {
                console.error("Error posting data:", error);
            }
        }
          
    
    useEffect(() => {
        getConnection();
    }, [])

    return (
        <div>
            <header>
                <h1>Add Data</h1>
            </header>
            <div className='divData'>
              <textarea className='data-textarea' placeholder='Enter data here' onChange={(e) => setData(e.target.value)}></textarea>
                <button className='data-button' onClick={() => postData()}>
                    Add Data
                </button>
            </div>
        </div>
    )
}