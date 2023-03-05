import { Inter } from "next/font/google";
import TaskList from "@/components/TaskList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <TaskList />
    </>
  );
}
