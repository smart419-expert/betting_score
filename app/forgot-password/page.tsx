import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 rounded-2xl shadow-strong p-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field py-[12px] px-[18px] mb-[18px]"
                placeholder="Email address"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3 text-lg font-semibold mt-4"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
} 