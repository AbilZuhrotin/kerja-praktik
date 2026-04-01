import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-200 font-sans dark:bg-black">
      <div>
        <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div className="flex justify-center">
            <Image
              className="dark:invert object-center"
              src="/foto/logo-nobg.png"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </div>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input validator"
              placeholder="Email"
              required
            />
            <p className="validator-hint hidden">Required</p>
          </fieldset>

          <label className="fieldset">
            <span className="label">Password</span>
            <input
              type="password"
              className="input validator"
              placeholder="Password"
              required
            />
            <span className="validator-hint hidden">Required</span>
          </label>

          <button className="btn btn-warning mt-4" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
