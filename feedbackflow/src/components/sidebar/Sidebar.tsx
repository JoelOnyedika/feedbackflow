"use client"
import React from 'react';
import {sidebarData} from '@/lib/constants/index';
import Link from 'next/link';
import { useParams } from 'next/navigation';


const Sidebar = () => {
  const { id } = useParams();
  return (
    <div className="h-screen w-64 bg-white border-r shadow-md">
      <div className="flex flex-col items-start justify-start h-full">
        <nav className="flex flex-col items-start w-full flex-1 overflow-auto">
        {sidebarData.map((item, index) => (
          <div className="flex items-center gap-3 w-full py-3 px-6 hover:bg-gray-100 transition-colors" key={index}>
            {item.icon && <item.icon className="h-5 w-5" />}
            <Link href={`/dashboard/${id}/${item.href}`} className="text-sm font-medium">{item.name}</Link>
          </div>
        ))}
          
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;