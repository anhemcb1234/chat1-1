import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import {collection,  onSnapshot, addDoc, query, where } from "firebase/firestore";

export default function ChatBox() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const [comment, setComment] = useState("");
  const useId = JSON.parse(sessionStorage.getItem('user')).uid;
  const [userIdTwo, setUserIdTwo] = useState(searchParam.get('id'));
  const [rooms, setRooms] = useState([]);
  const [user, SetUser] = useState([]);
  const [idUserTwo, SetIdUserTwo] = useState('');
  const [dataSort, setDataSort] = useState([]);
  const [userTwo, setUserTwo] = useState([]);
  
  let unsub = null


  useEffect(() => {
    handlerRoom()
    getUsers()
  }, [idUserTwo])

  //Hanlder submit
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Can't be empty input");
      return;
    }
    const collectionRef = collection(db, "roomchat");
    (async () => {
      try {
        await addDoc(collectionRef, {
          user: auth?.currentUser?.uid,
          message: comment,
          roomID: [useId, idUserTwo],
          time: new Date(),
        });
      } catch (e) {
        console.log(e);
      }
      setComment("");
    })();
  };
  //Get all users
  async function getUsers() {
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
    });
    SetUser(users);
    SetIdUserTwo(user?.find(x => x.id === userIdTwo)?.id_user)
    setDataSort()
    setUserTwo(user?.find(x => x.id === userIdTwo))

});
}
  //Get info user two
  const handlerRoom = async () => {        
    const collectionRef  = collection(db, "roomchat");
    const collectionQuery = query(collectionRef, where('roomID', 'in', [[idUserTwo, useId], [useId, idUserTwo]]));
    unsub = onSnapshot(collectionQuery, (snapShot) => {
        const room = [];
        snapShot.forEach(doc => {
            room.push({
            id: doc.id,
            id_user: doc.data().user,
            id_room: doc.data().roomID,
            message: doc.data().message,
            time: doc.data().time
        });
    });
    setRooms(room);
});
}

  return (
    <div>
      {" "}
      <div>
        <div>
          {/* component */}
          <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                  <span className={userTwo?.status ? "absolute text-green-500 bottom-1  left-2" : "absolute text-red-500 bottom-1  left-2"}>
                    <svg width={20} height={20}>
                      <circle cx={8} cy={8} r={8} fill="currentColor" />
                    </svg>
                  </span>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 ml-4">{userTwo?.email}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              </div>
            </div>
            <div
              id="messages"
              className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
              {rooms?.sort((a, b) => a.time.seconds - b.time.seconds).map((item, index) => {
                return (
                  <div key={index}> 
                     <span className={item.id_user === useId ? 'px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white float-right' : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"}>
                        {item.message}  
                      </span>  
                  </div>
                )
              })}
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className=" helloworld relative flex ">
                <form className="w-full" onSubmit={(e) => handlerSubmit(e)}>
                  <input
                    onChange={(evt) => setComment(evt.target.value)}
                    type="text"
                    value={comment}
                    placeholder="Write your message!"
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                  />
                  <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                    <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}