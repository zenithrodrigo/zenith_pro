import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function SignIn() {
  const { updateUser, signIn } = useUser();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    // email: "test@test.com",
    // password: "123456",
    email: "foo@email.com",
    password: "1234",
  });
  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
  return (
    <div
        className="m-8 relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
                <p className="mt-2 text-gray-500">Please enter your email and password</p>
            </div>
            <div className="mt-5">
                <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      // signIn(state.email, state.password);
                      navigate('/checkout/2');
                    }}>
                    <div className="relative mt-6">
                        <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-2 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none" onChange={handleChange} value={state.email} autoComplete="NA" required/>
                    </div>
                    <div className="relative mt-6">
                        <input type="password" name="password" id="password" placeholder="Password" className="peer peer mt-1 w-full border-b-2 border-gray-300 px-2 py-2 placeholder:text-transparent focus:border-gray-500 focus:outline-none" value={state.password} onChange={handleChange} required/>
                    </div>
                    <div className="my-6">
                        <button type="submit" className="w-full rounded-md bg-green-500 px-3 py-3 text-white focus:bg-green-400 focus:outline-none">Sign in</button>
                    </div>
                    <p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                        <a href={"/sign-up"}
                            className="text-sm text-blue-600 hover:underline focus:text-sky-800 focus:outline-none ml-2">Sign
                            up
                        </a>.
                    </p>
                </form>
            </div>
        </div>
    </div>
  );
}
