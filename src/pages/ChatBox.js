import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function ChatBox() {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  //
  useEffect(() => {
    console.log(auth?.currentUser?.uid)
  }, [])
  const push = (e) => {
    e.preventDefault();
    if (!comment) {
      alert("please write somethingg");
      return;
    }

    const collectionRef = collection(db, "messages");
    (async () => {
      try {
        await addDoc(collectionRef, {
          message: comment,
          user: auth?.currentUser?.uid,
        });
      } catch (e) {
        console.log(e);
      }
      console.log("add thanh cong");
      setComment("");
    })();
  };
  return (
    <div>
      {" "}
      <div>
        <div>
          {/* component */}
          <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
              <div className="relative flex items-center space-x-4">
                <div className="relative">
                  <span className="absolute text-green-500 right-0 bottom-0">
                    <svg width={20} height={20}>
                      <circle cx={8} cy={8} r={8} fill="currentColor" />
                    </svg>
                  </span>
                  <img
                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                    alt=""
                    className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col leading-tight">
                  <div className="text-2xl mt-1 flex items-center">
                    <span className="text-gray-700 mr-3">Anderson Vanhron</span>
                  </div>
                  <span className="text-lg text-gray-600">
                    Junior Developer
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => navigate("/listbox")}
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
              <div className="chat-message">
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                        Can be verified on any platform using docker
                      </span>
                    </div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div>
              <div className="chat-message">
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        Your error message says permission denied, npm global
                        installs must be given root privileges.
                      </span>
                    </div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-2"
                  />
                </div>
              </div>
            </div>
            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
              <div className=" helloworld relative flex ">
                <form className="w-full" onSubmit={(e) => push(e)}>
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