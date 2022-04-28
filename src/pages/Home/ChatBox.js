import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
} from "firebase/firestore";


export default function ChatBox() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();

  const [comment, setComment] = useState("");
  const useId = JSON.parse(sessionStorage.getItem("user")).uid;
  const [userIdTwo, setUserIdTwo] = useState(searchParam.get("id"));
  const [rooms, setRooms] = useState([]);
  const [user, SetUser] = useState([]);
  const [idUserTwo, SetIdUserTwo] = useState("");
  const [dataSort, setDataSort] = useState([]);
  const [userTwo, setUserTwo] = useState([]);
  const [icon, setIcon] = useState([]);

  let unsub = null;

  useEffect(() => {
    if (!sessionStorage.getItem("user")) {
      navigate("/");
    }
    handlerRoom();
    getUsers();
  }, [idUserTwo]);

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
    const collectionRef = collection(db, "users");
    unsub = onSnapshot(collectionRef, (snapShot) => {
      const users = [];
      snapShot.forEach((doc) => {
        users.push({
          id: doc.id,
          id_user: doc.data().uid,
          email: doc.data().email,
          status: doc.data().status,
        });
      });
      SetUser(users);
      SetIdUserTwo(user?.find((x) => x.id === userIdTwo)?.id_user);
      setDataSort();
      setUserTwo(user?.find((x) => x.id === userIdTwo));
    });
  }

  //Get message roomchat
  const handlerRoom = async () => {
    const collectionRef = collection(db, "roomchat");
    const collectionQuery = query(
      collectionRef,
      where("roomID", "in", [
        [idUserTwo, useId],
        [useId, idUserTwo],
      ])
    );
    unsub = onSnapshot(collectionQuery, (snapShot) => {
      const room = [];
      snapShot.forEach((doc) => {
        room.push({
          id: doc.id,
          id_user: doc.data().user,
          id_room: doc.data().roomID,
          message: doc.data().message,
          time: doc.data().time,
        });
      });
      setRooms(room);
    });
  };

  return (
    <div className="overflow-hidden">
      {" "}
      {userTwo?.email ? (
        <div>
          <div>
            {/* component */}
            <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
              <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                  <span
                    className={
                      userTwo?.status
                        ? "absolute text-green-500 bottom-1  left-2"
                        : "absolute text-red-500 bottom-1  left-2"
                    }
                  >
                    <svg width={20} height={20}>
                      <circle cx={8} cy={8} r={8} fill="currentColor" />
                    </svg>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <div className="text-2xl mt-1 flex items-center">
                      <span className="text-gray-700 ml-4">
                        {userTwo?.email}
                      </span>
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
                {rooms
                  ?.sort((a, b) => a.time.seconds - b.time.seconds)
                  .map((item, index) => {
                    return (
                      <div key={index}>
                        <span
                          className={
                            item.id_user === useId
                              ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white float-right"
                              : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                          }
                        >
                          {item.message}
                        </span>
                      </div>
                    );
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
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
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
}
