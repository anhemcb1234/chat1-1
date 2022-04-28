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
    const [show, setShow] = useState(true)

    
    let unsub = null;
    let time = new Date()

    useEffect( () => {    
        if(!sessionStorage.getItem('user')){
            navigate('/')
        }
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
        setShow(false)
        const data = user.filter(user => user.id_user === id)
        const docRef = await doc(db, 'users', data[0].id);
        await updateDoc(docRef, {status: false});
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
        <>
            {show ? 
             <div className="py-10 h-screen bg-gray-300 px-2">
             {auth.currentUser?.email ? 
             <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
         <div >
             <div className="flex items-center justify-between m-5 px-4">
                 <h2 className="font-bold">User: {auth?.currentUser?.email}</h2>
                 <button className='px-3  float-right py-2 text-sm text-blue-100 bg-red-600 rounded' onClick={_logOut}>Log out</button>
             </div>
             
             <div className="w-full p-4">
                 <div className="relative"> <input  onChange={e => handlerFilter(e)} type="text" className="w-full mb-3 h-12 rounded focus:outline-none px-3 focus:shadow-md" placeholder="Search..."/>  </div>
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
             </div> : 
             <div className="w-screen h-screen flex items-center justify-center">
          <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
         </svg>
         </div>}
             
             </div>
             : <div className="w-screen h-screen flex items-center justify-center">
             <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            </div>}
           
        </>
        
    )
}

export default Home