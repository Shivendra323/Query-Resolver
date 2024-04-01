import React, { useState } from 'react';

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white text-black">
      <div className="bg-gray-200 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form method='POST'>
          {isLogin ? (
            <>
              <div className="mb-4">
                <label className="block text-sm mb-1" htmlFor="email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-400 rounded" type="email" id="email" />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1" htmlFor="password">Password</label>
                <input className="w-full px-3 py-2 border border-gray-400 rounded" type="password" id="password" />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm mb-1" htmlFor="username">Username</label>
                <input className="w-full px-3 py-2 border border-gray-400 rounded" type="text" id="username" />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1" htmlFor="email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-400 rounded" type="email" id="email" />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1" htmlFor="password">Password</label>
                <input className="w-full px-3 py-2 border border-gray-400 rounded" type="password" id="password" />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1" htmlFor="confirm-password">Confirm Password</label>
                <input className="w-full px-3 py-2 border border-gray-400 rounded" type="password" id="confirm-password" />
              </div>
            </>
          )}
          <button className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200" type="submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <hr className="my-8 border-gray-400" />
        <p className="text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            className="text-gray-400 hover:text-black focus:outline-none"
            onClick={toggleForm}
            type="button"
          >
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
