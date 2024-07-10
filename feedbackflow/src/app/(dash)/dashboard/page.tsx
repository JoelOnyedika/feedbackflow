"use client"

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {getCookies} from '@/lib/serverActions/auth-actions'
import {getAllUserProjects, createProject, createOrganization, getAllUserOrganizations} from '@/lib/supabase/queries/dashboard'


const ProjBoard = () => {
  const [organizationName, setOrganizationName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [ userCookie, setUserCookie ] = useState(null)
  const [projectData, setProjectData] = useState([])
  const [organizationData, setOrganizationData] = useState(null || []) // Should be null, remove [] later
  const [projectOrganizationId, setProjectOrganizationId] = useState(null)
  const [isOrganizationSelectedInProjectName, setIsOrganizationSelectedInProjectName] = useState(false)
  const [popupMessage, setPopupMessage] = useState({
    message: null,
    mode: 'success' || 'destructive' || null
  })

  useEffect(() => {
    const cookie = getCookies('userCookie')
    setUserCookie(cookie)
    
    async function getProjects() {
      try {
        const {data, error} = await getAllUserProjects(cookie.id)
        if (error) {
          console.log(error)
          setPopupMessage({ message: 'Whoops, something went wrong while loading your projects. Refresh...', mode: 'destructive' })
        }
        console.log(data)
        setProjectData(data)  
      } catch(error) {
        console.log(error)
        setPopupMessage({ message: 'Whoops, something went wrong while loading your projects. Refresh...', mode: 'destructive' })
      }
    }
    getProjects()

    async function getOrganizations() {
      try {
        const {data, error} = await getAllUserOrganizations(cookie.id)
        if (error) {
          console.log(error)
          setPopupMessage({ message: 'Whoops, something went wrong while loading your organization. Refresh...', mode: 'destructive' })
        }
        console.log(data)
        setOrganizationData(data)  
      } catch(error) {
        console.log(error)
        setPopupMessage({ message: 'Whoops, something went wrong while loading your organization. Refresh...', mode: 'destructive' })
      }
    }
    getOrganizations()
  }, [])

  async function handleCreateOrganization() {
    setPopupMessage({message: "Creating Organization, please wait", mode: 'success'})
    const { data, error } = await createOrganization(cookie.id, organizationName)
    if (error) {
      console.log(error)
      setPopupMessage({ message: 'Whoops could not create organization', mode: 'destructive' })
    }
    console.log(data)
    setPopupMessage({ message: 'Organization was created successfully', mode: 'success' })

  }

  async function handleCreateProject() {
    setPopupMessage({message: "Creating Project, please wait", mode: 'success'})
    const { data, error } = await createProject(cookie.id, projectName, projectOrganizationId)
    if (error) {
      console.log(error)
      setPopupMessage({ message: 'Whoops could not create project', mode: 'destructive' })
    }
    console.log(data)
    setPopupMessage({ message: 'Project was created successfully', mode: 'success' })

  }

  return (
    <div className="ml-auto text-gray-900 mr-auto">
      <div className="flex mx-5 mt-4">
        <div className="">
          <div>
            <h5 className="font-semibold">Dashboard</h5>
          </div>
          <ul className="p-5 space-y-10">
            <li className="flex flex-col space-y-3">
              <small className="font-semibold">Projects</small>
              <Link href="#" className="pl-2 text-sm font-bold">All projects</Link>
            </li>
            <li className="flex flex-col space-y-3">
              <small className="font-semibold">Organization</small>
              {organizationData === null || organizationData === undefined ? (
                <>
                  <div className="py-2 px-20 skeleton rounded-md"></div>
                  <div className="py-2 px-20 skeleton rounded-md"></div>
                  <div className="py-2 px-20 skeleton rounded-md"></div>
                </>
                ) : organizationData.length === 0 ? (<small className="pl-2 text-sm font-bold">No Organization yet</small>) : 
                  (
                    organizationData.map((data, index) => (
                      <Link key={index} href="#" className="pl-2 text-sm font-bold">{data.name}</Link>
                    ))
                  )
                 }
              
            </li>
            <li className="flex flex-col space-y-3">
              <small className="font-semibold">Documentation</small>
              <Link href="#" className="pl-2 text-sm font-bold">API Refrence</Link>
            </li>
            <li className="flex flex-col space-y-3">
              <Link href="#" className="pl-2 text-sm font-bold">Log out</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 ml-14">
          <div className="flex space-x-4">
            <Dialog>
              <DialogTrigger>
                <Button size="sm">New project</Button>
              </DialogTrigger>
              <DialogContent className="space-y-5">
                <span className="font-bold">
                 Project Name
                </span>
                <Input 
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                <small className="text-red-500">
                  {projectName.length < 4 && "Your Project name must be lesser than four characters."}
                  {projectName.length > 20 && "Your Project name must be longer than twenty characters."}
                </small>

                <span className="font-bold">
                 Select Organization
                </span>
                  <Button disabled={projectName.length < 4 || projectName.length > 20} onClick={handleCreateProject}>
                    Submit  
                  </Button>
                
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>
                <Button size="sm" variant="secondary">New Organization</Button>
              </DialogTrigger>
              <DialogContent className="space-y-5">
                <span className="font-bold">
                 Organization Name
                </span>
                <Input 
                  placeholder="Organization name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                />
                <small className="text-red-500">
                  {organizationName.length < 4 && "Your Organization name must be lesser than four characters."}
                  {organizationName.length > 20 && "Your Organization name must be longer than twenty characters."}
                </small>
                  <Button 
                    disabled={organizationName.length < 4 || organizationName.length > 20}
                    onClick={handleCreateOrganization}
                    >
                    Submit  
                  </Button>
                
              </DialogContent>
            </Dialog>
            <Input placeholder="Search projects" />
          </div>
          <div>
            <h3 className="font-semibold text-md">Joel Ony Organization</h3>
          </div>
          <div className="sm:flex space-y-5">
            {projectData === null || projectData === undefined ? (
              <div className="grid grid-cols-3 gap-2">
                <div className="py-20 px-40 skeleton rounded-md"></div>
                <div className="py-20 px-40 skeleton rounded-md"></div>  
                <div className="py-20 px-40 skeleton rounded-md"></div>  
                <div className="py-20 px-40 skeleton rounded-md"></div>  
              </div>
              ) :
              projectData.length > 0 ? (
                <div className="rounded-md bg-blue-300 cursor-pointer">
                  <div className="flex flex-col p-20">
                    <small className="font-semibold ">Joel Organization</small>
                    <span className="font-semibold ">Aid sphere</span>
                  </div>
                </div> 
              ) : "Whoops you have not created any projects yet"
             }
              
          </div>
        </div>
      </div>     
    </div>
  );
};

export default ProjBoard;