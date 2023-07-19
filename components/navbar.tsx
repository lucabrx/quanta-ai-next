
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";
import {MobileSidebar} from "@/components/mobile-sidebar";

export const Navbar = () => {
    return (
        <div className="flex justify-between md:justify-end p-4 max-w-7xl mx-auto">
            <Link href="/" className="md:hidden text-xl lg:text-3xl font-bold bg-gradient-to-tl from-gray-800 to-pink-600 text-transparent bg-clip-text">Quanta
            </Link>



           <div className="flex gap-2 justify-center items-center">
               <UserButton afterSignOutUrl="/" />
              <MobileSidebar/>
           </div>


        </div>
    )
}

