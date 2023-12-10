import { useForm } from "react-hook-form";
import { login, getStatus, resetStatus } from "../redux/slices/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "Emin",
      password: "456789",
    },
  });
  //   Distructure of error for handling
  const { username: usernameErr, password: passwordErr } = errors;

  //   Watch subs
  let { username: usernameWatch } = watch();

  // Push to user welcome page , when status has success
  useEffect(() => {
    if (status === "success") {
      dispatch(resetStatus());
      navigate("/welcome");
    }
  }, [status]);

  return (
    <form
      className="border rounded-xl p-2"
      onSubmit={handleSubmit((credentials) => {
        dispatch(login(credentials));

        // Error Handling

        // Reset inputs
        reset();

        // If Login succesfull , navigate user to welcome page;
      })}
    >
      <div>
        <label htmlFor="username">Username:</label>
        <input
          className="pl-1"
          name="username"
          type="text"
          {...register("username", {
            required: "Name is required..",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message: "Do not use weird character",
            },
          })}
        />
        <p
          className={`font-normal text-xs text-red-600 ${
            usernameErr?.message ? "visible" : "invisible"
          }`}
        >
          {usernameErr?.message}
        </p>
        <p className={`${usernameErr?.message ? "invisible" : "visible"}`}>
          {usernameWatch}
        </p>
      </div>
      <div className="mt-2">
        <label htmlFor="password">Password:</label>
        <input
          className="pl-1"
          type="text"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be minimum 6 character",
            },
          })}
        />
        <p
          className={`font-normal text-xs text-red-600 pl-3 ${
            passwordErr?.message ? "visible" : "invisible"
          }`}
        >
          {passwordErr?.message}
        </p>
      </div>

      <button className="border border-white mt-5">Fired</button>
    </form>
  );
}

export default Login;
