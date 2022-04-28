import React, { useEffect, useState } from "react";
import {auth, db} from "../../firebase";
import {useNavigate, Link} from 'react-router-dom'
import {collection, doc, onSnapshot, updateDoc } from "firebase/firestore";

function Home() {
    let navigate = useNavigate();
    
    const green = "w-5 h-5 bg-green-500 rounded"
    const red = "w-5 h-5 bg-red-500 rounded"
    
    const [user, SetUser] = useState([]);
    const [id, setId] = useState('');
    const [statusLogin, setStatusLogin] = useState(false);
    const [filter, setFilter] = useState('')
    
    let unsub = null;
    let time = new Date()

    useEffect( () => {      
        getUsers()
    },[])
    useEffect(() => {
        updateStatus() 
    },[statusLogin])

    //Update Status Login
    const updateStatus = async () => {
        const data = user.filter(user => user.id_user === id)
        const docRef = await doc(db, 'users', data[0]?.id);
        await updateDoc(docRef, {status: true});
    };
    //Update Status Logout
    const updateStatusLoguot = async () => {
        const data = user.filter(user => user.id_user === id)
        const docRef = await doc(db, 'users', data[0].id);
        await updateDoc(docRef, {status: false});
        alert('Đăng xuất thành công')
    };
    //Get User
    async function getUsers() {
        setId(auth?.currentUser?.uid)
        const collectionRef = collection(db, 'users');
        unsub = onSnapshot(collectionRef, (snapShot) => {
            const users = [];
            snapShot.forEach(doc => {
                users.push({
                id: doc.id,
                id_user: doc.data().uid,
                email: doc.data().email,
                status: doc.data().status,
            });
            setStatusLogin(!doc.data().status)
        });
        SetUser(users);
    });
}
    // Log out button
    const _logOut = () => {
        updateStatusLoguot()
        setTimeout(() => {
            sessionStorage.removeItem('user');
            auth.signOut();
            navigate('/')
        },1000)
    }
    //Fitler users
    const handlerFilter = (e) => {
        setFilter(e.target.value)
    }

    return (
        <div className="py-10 h-screen bg-gray-300 px-2">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div >
            <div className="flex items-center justify-between m-5 px-4">
                <h2>User: {auth?.currentUser?.email}</h2>
                <button className='px-3  float-right py-2 text-sm text-blue-100 bg-red-600 rounded' onClick={_logOut}>Đăng xuất</button>
            </div>
            
            <div className="w-full p-4">
                <div className="relative"> <input onChange={e => handlerFilter(e)} type="text" className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md" placeholder="Search..."/>  </div>
                {user && user.filter(x => x.email.toUpperCase().includes(filter.toUpperCase())).map((user, index) => {
                    return (
                        <div key={index}>
                            <Link  to={`/chatbox?id=${user.id}`}>
                            <ul className={user.email.toUpperCase() === auth.currentUser.email.toUpperCase() ? "flex w-full items-center justify-between  hidden" : 'flex w-full items-center justify-between ' }>
                                <li className="flex w-full justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                                    <div className="flex w-full items-center justify-between ml-2" >
                                        <div className="flex flex-col ml-2"> <span className="font-medium text-black">{user.email}</span> </div>
                                        <div className={user.status ? green : red} >                                  
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            </Link>
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