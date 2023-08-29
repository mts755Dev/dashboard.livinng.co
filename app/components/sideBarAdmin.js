"use client";

import Image from "next/image";
import Link from "next/link";
import Logout from "public/Logout.svg";
import ROUTES from "../utils/SideBar/sideBarAdmin";

const SideBarAdmin = () => {
  return (
    <>
      <aside
        id="default-sidebar"
        className="flex flex-col justify-between fixed top-0 left-0 h-screen md:w-[300px] max-w-lg:bg-
blue-200 border-r border-gray-900/10 "
        aria-label="Sidebar"
      >
        <div className="flex-col gap-50px h-full overflow-y-auto dark:bg-gray-800 ">
          <div className="flex items-center justify-center h-[100px] mb-10 border-b border-gray-900/10 ">
            <Image
              src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1688585588/Proyecto%20JS%20vanilla/livinng_ico_sgauay.png"
              className="h-[50px] w-auto"
              alt="Your Company"
              width={150}
              height={80}
              priority
            />
          </div>

          <div className="space-y-5 pl-10 font-bold">
            {ROUTES?.map((e, index) => (
              <>
                <Link
                  key={index}
                  id={e.id}
                  href={e.href}
                  className="flex items-center px-2 py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                >
                  <Image src={e.icon} width={28} height={28} alt={e.name} />
                  <span className="ml-3">{e.name}</span>
                </Link>
              </>
            ))}
          </div>
        </div>
        <div className="flex justify-center py-[30px] font-bold pb- border-t border-gray-900/10">
          <Link
            id="logOut"
            href="/landingPage"
            className="flex items-center justify-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <Image src={Logout} alt="Icono" />

            <span className="ml-3">Cerrar Sesión</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default SideBarAdmin;
