import KanbanBoard from '@/components/kanban-board';
import { getSession } from '@/lib/auth/auth';
import connectDB from '@/lib/db'
import { Board } from '@/lib/models';
import React, { Suspense } from 'react'

async function getBoard(userId: string) {
  "use cache";
  await connectDB();

  const boardDoc = await Board.findOne({
    userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });

  if(!boardDoc) return null;

  const board = JSON.parse(JSON.stringify(boardDoc));

  return board;
}

async function DashboardPage(){
  const session = await getSession();
  const board = await getBoard(session?.user.id || "");
  console.log(board);

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-black'>
            {board.name}
          </h1>
          <p className='text-gray-600'>
            Track your job applications
          </p>
        </div>
        <KanbanBoard 
          userId={session?.user.id!} 
          board={board}
        />
      </div>
    </div>
)}

const Dashboard = async () => {
  return(
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage/>
    </Suspense> 
  ) 
}

export default Dashboard
