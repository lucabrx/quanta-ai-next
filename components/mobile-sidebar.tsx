"use client";

import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Sidebar} from "@/components/sidebar";

export const MobileSidebar = () => {
    return (
       <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
            </Button>
        </SheetTrigger>
           <SheetContent side="left" className="p-0">
             <Sidebar />
           </SheetContent>
       </Sheet>
    )
}