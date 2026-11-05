import MyBooks from "@/components/MyBooks";
import { auth } from "@/lib/auth";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import { headers } from "next/headers";

export default async function MyBooksPage() {
  const session = await auth.api.getSession({
    headers: await headers() 
})
const userEmail = session?.user?.email;

const token=await getTokenFromServer();
  
  const res = await fetch(
  `http://localhost:8000/my-books?email=${userEmail}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  }
);

const books = await res.json();
  return (
    <div>
      <MyBooks books={books} />
    </div>
  );
}
