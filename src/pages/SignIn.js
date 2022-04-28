import React, {useState } from 'react';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../firebase";
import { useNavigate, Link } from 'react-router-dom';
import {collection,  addDoc } from "firebase/firestore";


const Signin = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const time = new Date()


    const _doSignin = (evt) => {
        evt.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.uid)
                alert("Sign in success");
                navigate('/')
                pushData(user.uid)
            })
            .catch((error) => {
                alert("Sign in fail");
            });
    }
    async function pushData(id) {
        const collectionRef = collection(db, 'users');
        console.log(id)
        await addDoc(collectionRef, { createdAt: time,email: email, password: password,status: false, uid: id});
    }


    return (
        <div className="bg-white h-screen items-center justify-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <h1 className='font-bold mb-2 uppercase'>Sign in</h1>
        <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                    Email
                </label>
                <input onChange={(evt) => setEmail(evt.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Email" />
            </div>
            <div className="mb-6">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input onChange={(evt) => setPassword(evt.target.value)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
            </div>
            <div className="flex items-center justify-between">
                <button onClick={_doSignin} className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded" type="button">
                    Sign in
                </button>
            </div>
            <button className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded"><Link to={'/'}>Back to login page</Link></button>
        </div>
    );
}

export default Signin