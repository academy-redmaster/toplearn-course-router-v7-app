import { Input , Button } from "@nextui-org/react";
import { Link } from "react-router";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 px-4">
      <div className="w-full max-w-xl bg-white text-black rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Join us today! It`s quick and easy.
        </p>
        <form className="space-y-6">
          {/* Username Field */}
          <div>
            <Input
              type="text"
              name="userName"
              label="Username"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Username is required"
            />
          </div>
          {/* Email Field */}
          <div>
            <Input
              type="email"
              name="email"
              label="Email Address"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Enter a valid email address"
            />
          </div>
          {/* Password Field */}
          <div>
            <Input
              type="password"
              name="password"
              label="Password"
              variant="bordered"
              color="secondary"
              fullWidth
              isRequired
              errorMessage="Password must be at least 6 characters"
            />
          </div>
          <Button
            fullWidth
            color="secondary"
            variant="solid"
            size="lg"
            type="submit"
          >
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-secondary font-semibold hover:underline mx-2"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
