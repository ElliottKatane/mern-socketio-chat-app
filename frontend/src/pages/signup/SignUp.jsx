import GenderCheckbox from "./GenderCheckbox";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-4xl font-semibold text-center text-gray-300">
          {" "}
          Sign Up <span className="text-blue-500"> ChatApp </span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name </span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username </span>
            </label>
            <input
              type="email"
              className="w-full input input-bordered h-10"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password </span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password </span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Re-enter password"
            />
          </div>
          <GenderCheckbox />
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account ?
          </a>
          <div>
            <div className="btn btn-block btn-sm mt-2">Login</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

// import GenderCheckbox from "./GenderCheckbox";

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
//         <h1 className="text-4xl font-semibold text-center text-gray-300">
//           {" "}
//           Sign Up <span className="text-blue-500"> ChatApp </span>
//         </h1>
//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Full Name </span>
//             </label>
//             <input
//               type="text"
//               className="w-full input input-bordered h-10"
//               placeholder="Enter full name"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Username </span>
//             </label>
//             <input
//               type="email"
//               className="w-full input input-bordered h-10"
//               placeholder="Enter username"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Password </span>
//             </label>
//             <input
//               type="password"
//               className="w-full input input-bordered h-10"
//               placeholder="Enter password"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Confirm Password </span>
//             </label>
//             <input
//               type="password"
//               className="w-full input input-bordered h-10"
//               placeholder="Re-enter password"
//             />
//           </div>
//           <GenderCheckbox />
//           <a
//             href="#"
//             className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
//           >
//             Already have an account ?
//           </a>
//           <div>
//             <div className="btn btn-block btn-sm mt-2">Login</div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
