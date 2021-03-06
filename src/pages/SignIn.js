import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const Signin = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const time = new Date();

  const _doSignin = (evt) => {
    setShow(false);
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        navigate("/");
        pushData(user.uid);
      })
      .catch((error) => {
        alert("Sign in fail");
      });
  };
  async function pushData(id) {
    const collectionRef = collection(db, "users");
    console.log(id);
    await addDoc(collectionRef, {
      createdAt: time,
      email: email,
      password: password,
      status: false,
      uid: id,
    });
  }

  return (
    <div className="bg-white h-screen items-center justify-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      {show ? (
        <>
          <h1 className="font-bold mb-2 uppercase">Sign in</h1>
          <div className="mb-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              onChange={(evt) => setEmail(evt.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={(evt) => setPassword(evt.target.value)}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={_doSignin}
              className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded"
              type="button"
            >
              Sign in
            </button>
          </div>
          <button className="bg-blue hover:bg-blue-dark font-bold py-2 px-4 rounded">
            <Link to={"/"}>Back to login page</Link>
          </button>
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <svg
            role="status"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Signin;
