import Link from "next/link";

export function Footer() {
  return (
    <div className=" bg-gray-100 fixed w-full bottom-0 flex items-center mt-8">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4 lg:px-0">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="https://flowbite.com/" className="hover:underline">
              G M™
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mb-1 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
