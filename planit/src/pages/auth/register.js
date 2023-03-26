import { useState } from 'react';
import { useRouter } from 'next/router';
import { Client, Account, ID } from "appwrite";
import Link from 'next/link';
const { v4: uuidv4 } = require('uuid');

const client = new Client()
    .setEndpoint('https://localhost/v1') // Your API Endpoint
    .setProject('641f366aecda205350ba');

const account = new Account(client);

console.log(account)

async function createAccount(uuid, email, password) {
    await account.create( uuid, email, password).then(function (response) {
        console.log(response);
        }, function (error) {
        console.log(error);
        });
    }

export default function Register() {
  const [email, setEmail] = useState('hello@hello.com');
  const [password, setPassword] = useState('asdkj12490');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    let uuid = uuidv4();
    console.log(uuid)

    console.log(account)
    console.log(email)
    console.log(password)

    const promise = await account.create( email, email, password)
    promise.then(function (response) {
        console.log(response);
        }, function (error) {
        console.log(error);
        });

    console.log(promise)

    // await createAccount(uuid, email, password);    
    
    console.log('Completed')

    //   router.push('/');

  };

  const handleButn = async (e) => {
    // e.preventDefault();

    console.log('Button clicked')
    let uuid = uuidv4();
    console.log(uuid)
    
    console.log('Completed')
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign up for a new account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Already have an account? {' '}
        <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
          Login here
        </Link>
      </p>
    </div>
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div className='my-2'>
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>

        <div className='my-2'>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-500 my-4">{error}</div>
      )}

      <div>
        <button
          type="submit"
          onClick={handleButn}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 6a1 1 0 011-1h7a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                />
            </svg>
            </span>
            Sign up
        </button>
        </div>
    </form>
    </div>
</div>

    );
}
