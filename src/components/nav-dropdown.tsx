"use client";
import {
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const NavDropdown = () => {
    const router = useRouter();
    const {
    data: session,
  } = authClient.useSession();

  const user = session?.user;
   
    const handleLogout = async () => {
     await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/login"); 
    },
  },
});
    };

    return (
        <div>
            {user ? <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Image src={user.image || "/default-avatar.png"} alt="User" width={32} height={32} className="rounded-full" /></Button>} />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <h2 className="text-xs ml-3 text-gray-400">{user.name}</h2>
                <Link href="/profile">
                  <Button variant="ghost" className="w-full flex justify-start cursor-pointer">
                    <CreditCardIcon />
                    My Profile
                  </Button>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              
                <Button onClick={handleLogout} variant="destructive" className="w-full flex justify-start cursor-pointer">
                  <LogOutIcon />
                  Logout
                </Button>
              
            </DropdownMenuContent>
          </DropdownMenu> :
            <div>
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Login
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Register
              </Link>
            </div>}
        </div>
    );
};

export default NavDropdown;