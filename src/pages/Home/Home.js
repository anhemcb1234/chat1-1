import React, { useEffect, useState } from "react";
import {auth, db} from "../../firebase";
import {useNavigate} from 'react-router-dom'
import {collection, deleteDoc, doc, onSnapshot, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";

function Home() {
    const green = "w-5 h-5 bg-green-500 rounded"
    const red = "w-5 h-5 bg-red-500 rounded"
    const [user, SetUser] = useState([]);
    let unsub = null;
    let navigate = useNavigate();
    useEffect( () => {
        getUsers()
    },[])
    async function getUsers() {
        const collectionRef = collection(db, 'users');
        unsub = onSnapshot(collectionRef, (snapShot) => {
          const users = [];
          snapShot.forEach(doc => {
            users.push({
                id_user: doc.data().uid,
                email: doc.data().email,
                status: doc.data().status,
            });
        });
        SetUser(users);
    });
}
    
    const _logOut = () => {
        auth.signOut();
        sessionStorage.removeItem('user');
        navigate('/')
    }
    return (
        <div className="py-10 h-screen bg-gray-300 px-2">
    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
            <div className="flex items-center justify-between m-5 px-4">
                <h2>User: {auth.currentUser.email}</h2>
                <button className='px-3  float-right py-2 text-sm text-blue-100 bg-red-600 rounded' onClick={_logOut}>Đăng xuất</button>
            </div>
            <div className="w-full p-4">
                <div className="relative"> <input type="text" className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md" placeholder="Search..."/>  </div>
                {user?.map((user, index) => {
                    return (
                        <div>
                            <ul className={user.email.toUpperCase() === auth.currentUser.email.toUpperCase() ? "flex w-full items-center justify-between  hidden" : 'flex w-full items-center justify-between ' } key={index}>
                                <li className="flex w-full justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex w-full items-center justify-between ml-2" >
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">{user.email}</span> </div>
                                        <div className={user.status ? green : red} >                                  
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    </div>
</div>
    )
}

export default Home