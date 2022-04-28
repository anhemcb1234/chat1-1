import React, {useState} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../firebase";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const _doLogin = async (evt) => {
        evt.preventDefault();
        try {
            const resp = await signInWithEmailAndPassword(auth, email, password);
            console.log(resp.user);
            sessionStorage.setItem('user', JSON.stringify(resp.user));
            alert('Đăng nhập thành công');
            navigate('/home')
        } catch (e) {
            alert("Đăng nhập thất bại");
            console.error(e);
        }

    }

    return (
            <div className="bg-white h-screen  items-center justify-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                <h1 className='font-bold mb-2 uppercase'>Đăng nhập</h1>
            <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input onChange={(evt) => setEmail(evt.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Email" />
                </div>
                <div className="mb-6">
                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                        Mật khẩu
                    </label>
                    <input onChange={(evt) => setPassword(evt.target.value)} className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" />
                </div>
                <div className="flex items-center justify-between">
                    <button onClick={_doLogin} className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded" type="button">
                        Đăng nhập
                    </button>
                </div>
                <button className='bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded'>
                    <Link  to="/signin">Đăng kí</Link>
                </button>
            </div>
    );
};

export default Login;
