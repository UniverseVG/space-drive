import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex h-screen justify-center items-center dark:bg-gray-800">
      <div className="text-center max-w-6xl mx-8">
        <p className="mb-3 text-sm tracking-widest text-indigo-500 uppercase">
          <Image
            src="/logo.png"
            width="200"
            height="200"
            alt="file drive logo"
            className="inline-block mb-4"
          />
        </p>
        <h1 className="my-3 text-3xl font-bold tracking-tight text-gray-800 md:text-5xl dark:text-gray-100">
          The easiest way to upload and share files with your company
        </h1>
        <div>
          <p className="max-w-2xl mx-auto my-2 text-base text-gray-500 md:leading-relaxed md:text-xl dark:text-gray-400">
            Make an account and start managing your files in less than a minute.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 mt-6 md:flex-row">
          <Link
            className="inline-block w-auto min-w-[250px] px-6 py-4 text-white transition-all bg-gray-700 dark:bg-white dark:text-gray-800 rounded-md shadow-xl sm:w-auto hover:bg-gray-900 hover:text-white shadow-slate-300 dark:shadow-slate-700 hover:shadow-2xl hover:shadow-slate-400 hover:-translate-y-px"
            href="/dashboard/files"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
