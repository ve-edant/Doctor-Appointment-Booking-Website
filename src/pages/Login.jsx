import { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (!email || !password || (state === 'Sign Up' && !name)) {
      alert("Please fill out all required fields");
      return;
    }
    
    // Submit logic goes here (e.g., API calls for login or signup)
    console.log('Form submitted', { name, email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment</p>
        
        {state === 'Sign Up' && (
          <div className='w-full'>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              className='border border-zinc-300 rounded w-full p-2 mt-1'
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your full name"
              required
            />
          </div>
        )}

        <div className='w-full'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className='w-full relative'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className='border border-zinc-300 rounded w-full p-2 mt-1'
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your password"
            required
          />

          <span 
            className='absolute right-3 top-10 cursor-pointer text-gray-600'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </span>
        </div>

        <button
          type="submit"
          className='bg-primary text-white rounded-md w-full p-2 mt-1 text-base font-semibold'
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>


        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setState('Login')}
              className='text-primary underline'
            >
              Login here
            </button>
          </p>
        ) : (
          <p>
            Create an Account?{' '}
            <button
              type="button"
              onClick={() => setState('Sign Up')}
              className='text-primary underline'
            >
              Click here
            </button>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
