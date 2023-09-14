import React from "react";

const AuthModal = () => {
  return (
    <div className="bg-black p-4 rounded-lg shadow-lg w-full max-w-sm text-white">
      <div className="flex flex-col gap-8">
        <h1 className="">Log In</h1>
        <form className="flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <div>
              <input
                key={index}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="
              w-full 
              py-1
              px-2
            bg-black  
              border-2
            border-neutral-800 
              rounded-md
              outline-none
            text-white
            focus:border-mainBlue
              focus:border-2
              transition
            disabled:bg-neutral-900
              disabled:opacity-70
              disabled:cursor-not-allowed "
              />
            </div>
          ))}

          <div className="flex flex-col gap-2 py-6">
            <button className="w-full bg-white text-black py-1 rounded-full font-semibold">
              Login
            </button>
            <span className="self-center">footer</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
