import Image from 'next/image'

export default function LoginPage() {
  return (
    <main className="h-screen w-full bg-black p-[20px]">
      <div className="w-full h-full flex flex-col md:flex-row gap-[5px]">
        {/* Left - image (hidden on mobile) */}
        <div className="relative w-full md:w-1/2 h-full rounded-3xl overflow-hidden hidden md:block">
          <Image
            src="/form-bg.png"
            alt="Login background"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            quality={100}
          />
        </div>

        {/* Right - form */}
        <div className="w-full md:w-1/2 h-full bg-white rounded-3xl flex flex-col items-center justify-center px-8 sm:px-12 py-10 gap-5 text-center overflow-y-auto">
          <div className="w-full max-w-xs flex flex-col items-center gap-5">
            {/* Logo */}
            <Image
              src="/form-logo.png"
              alt="Portfolio logo"
              width={48}
              height={48}
            />

            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-semibold text-black">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500">
                Whether you're a landlord tracking rent or a tenant managing
                your monthly bills, stay organized and never miss a due date
                again.
              </p>
            </div>

            {/* Form */}
            <form className="w-full flex flex-col gap-3 mt-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-full px-5 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none"
                style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25)' }}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded-full px-5 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none"
                style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25)' }}
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#002C83] text-white text-sm font-medium py-3 hover:brightness-110 transition-all"
              >
                Continue
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 w-full">
              <div className="flex-1 h-px bg-black" />
              <span className="text-xs text-black">OR</span>
              <div className="flex-1 h-px bg-black" />
            </div>

            {/* Social buttons */}
            <button
              className="w-full rounded-full py-3 flex items-center justify-center gap-2 text-sm text-black hover:bg-gray-50 transition-colors"
              style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path
                  fill="#4285F4"
                  d="M23.52 12.27c0-.85-.07-1.47-.22-2.12H12v3.85h6.6c-.13 1.09-.86 2.73-2.47 3.83l-.02.15 3.59 2.78.25.02c2.28-2.1 3.59-5.19 3.59-8.51z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.78-2.93c-1.02.7-2.38 1.19-4.15 1.19-3.17 0-5.86-2.1-6.82-5h-3.9v3.02C3.29 21.3 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.18 14.36c-.25-.73-.39-1.5-.39-2.36s.14-1.63.38-2.36V6.62h-3.9A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.27 5.38l3.91-3.02z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c2.28 0 3.81.98 4.69 1.8l3.42-3.34C17.94 1.19 15.24 0 12 0 7.33 0 3.29 2.7 1.27 6.62l3.9 3.02c.97-2.9 3.66-5 6.83-5z"
                />
              </svg>
              Sign in with Google
            </button>

            <button
              className="w-full rounded-full py-3 flex items-center justify-center gap-2 text-sm text-black hover:bg-gray-50 transition-colors"
              style={{ boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.9 1.5h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.9l7.9-9L1.5 1.5h7l4.8 6.4 5.6-6.4Zm-1.2 18h1.9L6.4 3.4H4.4L17.7 19.5Z" />
              </svg>
              Sign in with X
            </button>

            <p className="text-xs text-gray-400 mt-1">
              By creating an account I agree to the Portfolio terms of service
              and privacy policy
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
