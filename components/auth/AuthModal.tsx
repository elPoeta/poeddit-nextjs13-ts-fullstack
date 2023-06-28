import React, { FC } from "react";
import CloseModal from "./CloseModal";
import Auth, { AuthProps } from "./Auth";

const AuthModal:FC<AuthProps> = ({ isSignIn }) => {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 dark:bg-slate-900/20  z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white dark:bg-slate-800  w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>
          <Auth isSignIn={isSignIn} />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
