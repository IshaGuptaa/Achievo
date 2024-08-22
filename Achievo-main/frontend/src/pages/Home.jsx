import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Welcome from "../components/Welcome";

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn
      ? `${authState.user.name}'s tasks`
      : "Task Manager";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="bg-primary text-white h-[40vh] py-8 text-center">
            <h1 className="text-2xl"> Welcome to Achievo App</h1>
            <Link
              to="/signup"
              className="mt-10 text-xl block space-x-2 hover:space-x-4"
            >
              <span className="transition-[margin]">
                Join now to manage your tasks
              </span>
              <span className="relative ml-4 text-base transition-[margin]">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        ) : (
          <>
            <Welcome />
          </>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
