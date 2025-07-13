import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 rounded-2xl shadow-strong p-8">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password" className="sr-only">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field py-[12px] px-[18px] mb-[18px]"
                placeholder="New Password"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="input-field py-[12px] px-[18px]"
                placeholder="Confirm New Password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3 text-lg font-semibold mt-4"
          >
            Reset Password
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