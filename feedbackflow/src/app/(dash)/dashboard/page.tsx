"use client"

import React, { useState, useEffect } from 'react';
import { Plus, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {getCookies} from '@/lib/serverActions/auth-actions'
import { confirmUserProjectPlan, confirmUserOrgPlan, getAllUserProjects, createProject, createOrganization, getAllUserOrganizations, doesProjectNameExist, getProjectsByOrganizationId} from '@/lib/supabase/queries/dashboard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Navbar from '@/components/hero/Navbar';
import PopupMessage from '@/components/custom/PopupMessage'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"


const ProjBoard = () => {

  interface Project {
    id: number;
    user_id: number;
    name: number;
  }

  const [organizationName, setOrganizationName] = useState("")
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [ userCookie, setUserCookie ] = useState(null)
  const [projectData, setProjectData] = useState(null)
  const [organizationData, setOrganizationData] = useState(null || []) // Should be null, remove [] later
  const [projectOrganizationId, setProjectOrganizationId] = useState(null)
  const [isOrganizationSelectedInProjectName, setIsOrganizationSelectedInProjectName] = useState(false)
  const [popupMessage, setPopupMessage] = useState(null)
  const [query, setQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState<null | Project[]>([])

  async function getProjects() {
      try {
        const {data, error} = await getAllUserProjects(userCookie.id)
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

      async function getOrganizations() {
      try {
        const {data, error} = await getAllUserOrganizations(userCookie.id)
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


useEffect(() => {
  async function getUserCookie() {
    try {
      const cookie = await getCookies('userCookie')
      if (cookie) {
        console.log(cookie)
        const parsed = JSON.parse(cookie.value)
        setUserCookie(parsed)
        console.log(userCookie)
      }  
    } catch(error) {
      console.log('Error with fetching cookies', error)
    }    
  }
  getUserCookie()
}, []) // This effect runs only once on component mount

useEffect(() => {
  console.log(userCookie)
  if (userCookie) {
    getProjects()
    getOrganizations()
  }
}, [userCookie]) // This effect runs when userCookie changes

const handleClosePopup = () => {
    setPopupMessage(null);
  };

  async function handleCreateOrganization() {
    try {
      setPopupMessage({message: "Creating Organization, please wait", mode: 'success',  duration: 5000})
      // CHECK USER PLAN
      const { data, error } = await confirmUserOrgPlan(userCookie.id)
      if (error) {
        console.log(error)
        setPopupMessage({ message: 'Whoops could not create organization', mode: 'destructive', duration: null })
      }
      console.log(data)
      // CONDITION BASED ON THE USER PLAN AND CREATING THE ORGANIZATION
      if (organizationData.length <= data) {
        const { data, error } = await createOrganization(userCookie.id, organizationName)
        if (error) {
          console.log(error)
          setPopupMessage({ message: 'Whoops could not create organization', mode: 'destructive', duration: null })
        }
        console.log(data)
        setPopupMessage({ message: 'Organization was created successfully', mode: 'success', duration: 5000 })
        await getOrganizations()    
      } else {
        setPopupMessage({ message: 'Upgrade your plan to create more organization', mode: 'destructive', duration: 15000 })
        await getOrganizations()
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateProject = async () => {
    try {
      setPopupMessage({message: "Creating Project, please wait", mode: 'success', duration: 5000})
       // CHECK USER PLAN
      const { data, error } = await confirmUserProjectPlan(userCookie.id)
      if (error) {
        console.log(error)
        setPopupMessage({ message: 'Whoops could not create organization', mode: 'destructive', duration: null })
      }
      console.log(data)
      // CONDITION BASED ON THE USER PLAN AND CREATING THE PROJECT
      if (projectData.length < data) {
        const {data, error} = await doesProjectNameExist(userCookie.id, projectName) // CHECK IF PROJECT NAME EXISTS
        console.log(data, error)
        if (error) {
          setPopupMessage({message: "Whoops could not create project", mode: 'destructive', duration: 5000})
        }
        if (data === true) {
          setPopupMessage({ message: error.message, mode: 'destructive', duration: 5000 })
        } else {
          const { data, error } = await createProject(userCookie.id, projectName, projectOrganizationId, projectDescription)
          if (error) {
            console.log(error)
            setPopupMessage({ message: 'Whoops could not create project', mode: 'destructive', duration: 10000 })
          }
          console.log(data)
          setPopupMessage({ message: 'Project was created successfully', mode: 'success', duration: 5000 })
          await getProjects()
        }  
      } else {
        setPopupMessage({ message: 'Upgrade your plan to create more projects', mode: 'destructive', duration: 15000 })
        await getOrganizations() 
      }
      
      } catch(error) {
        console.log(error)
        setPopupMessage({ message: "Something went wrong while creating project", mode: 'destructive' })
      }
  }

const handleGetProjectsByOrgId = async (organizationId) => {
  try {
      const { data, error  } = await getProjectsByOrganizationId(organizationId)
      if (error) {
        console.log(error)
        setPopupMessage({ message: error.message, mode: 'destructive', duration: null })
      }
      console.log(data)
      setProjectData(data)  
  } catch (error) {
    console.log(error)
    setPopupMessage({ message: "Something went wrong", mode: 'destructive', duration: null })
  }
}

const handleSearch = (e: any) => {
  const searchQuery = e.target.value
  setQuery(searchQuery)
  console.log(searchQuery)

  // FILTER PROJECTS
  const filtered = projectData.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
  setFilteredProjects(filtered)
  console.log(filtered, filteredProjects)

  if (searchQuery.length === 0) {
    setFilteredProjects([])
  }
}

return (
  <>
    <Navbar />
    {popupMessage && <PopupMessage message={popupMessage.message} mode={popupMessage.mode} duration={popupMessage.duration} onClose={handleClosePopup}/>}
    <div className="ml-auto text-gray-900 mr-auto">
      <div className="flex mt-4">
        <div className="h-full">
          <ul className="p-5 space-y-10">
            <li className="flex flex-col space-y-3">
              <small className="font-semibold">Projects</small>
              <Link href="#" className="pl-2 text-sm font-bold">All projects</Link>
            </li>
            <li className="flex flex-col space-y-3">
              <small className="font-semibold">Organization</small>
              {organizationData === null ? (
                <>
                  <div className="py-2 px-20 skeleton rounded-md"></div>
                  <div className="py-2 px-20 skeleton rounded-md"></div>
                  <div className="py-2 px-20 skeleton rounded-md"></div>
                </>
              ) : organizationData !== null && organizationData.length === 0 ? (
                <small className="pl-2 text-md font-bold">No Organization yet</small>
              ) : (
                <Select className="w-[180px] border border-none shadow-none focus:ring-0 pl-2 text-sm font-bold" onValueChange={(value) => handleGetProjectsByOrgId(value)}>
                  <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0 pl-2 text-sm font-bold">
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationData.map((data) => (
                      <SelectItem key={data.id} value={data.id} >
                        {data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </li>
            <li className="flex flex-col space-y-3">
              <small className="font-semibold">Documentation</small>
              <Link href="#" className="pl-2 text-sm font-bold">API Reference</Link>
            </li>
            <li className="flex flex-col space-y-3">
              <Link href="#" className="pl-2 text-sm font-bold">Log out</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 ml-14">
          <div className="flex space-x-4">
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger>
                  <Button size="sm" className="flex space-x-3" disabled={projectData === null}>
                    <Plus className="w-4 h-4"/><span>New project</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="space-y-3">
                  <span className="font-bold">Project Name</span>
                  <div>
                    <Input
                    placeholder="Project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full"
                    />
                    <small className="text-red-500">
                      {projectName.length < 4 && "Your Project name must be at least four characters."}
                      {projectName.length > 20 && "Your Project name must be shorter than twenty characters."}
                    </small>
                  </div>
                  <div>
                    <Textarea
                    placeholder="Description of your project"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full"
                    />
                    <small className="text-red-500">
                      {projectDescription.length < 10 && "Your Project Description must be at least ten characters."}
                      {projectDescription.length > 50 && "Your Project Description must be shorter than fifty characters."}
                    </small>
                  </div>
                  <div className="flex items-center">
                    {organizationData === null ? (
                      <small className="pl-2 text-sm font-bold">Loading organizations...</small>
                    ) : organizationData.length > 0 ? (
                      <div className="relative">
                        <select
                          className="appearance-none bg-transparent border-none text-sm font-bold pl-2 pr-8 py-2 focus:outline-none"
                          onChange={(e) => {
                            setProjectOrganizationId(e.target.value);
                            console.log("Selected org id:", e.target.value);
                          }}
                          value={projectOrganizationId || ''}
                        >
                          <option value="" disabled>Select organization</option>
                          {organizationData.map((data) => (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <small className="pl-2 text-sm font-bold">No Organization yet</small>
                    )}
                  </div>
                  <DialogClose>
                    <Button 
                    disabled={projectName.length < 4 || projectName.length > 20 || projectDescription.length < 10 || projectDescription.length > 50 || !projectOrganizationId } 
                    onClick={() => handleCreateProject()}
                    className="w-full"
                    >
                      Submit  
                    </Button>
                  </DialogClose>
                  
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex space-x-4">
              <Dialog>
                <DialogTrigger>
                  <Button size="sm" variant="secondary" className="flex space-x-3" disabled={organizationData === null}><Plus className="w-4 h-4"/><span>New Organization</span></Button>
                </DialogTrigger>
                <DialogContent className="space-y-5">
                  <span className="font-bold">Organization Name</span>
                  <Input
                    placeholder="Organization name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                  <small className="text-red-500">
                    {organizationName.length < 4 && "Your Organization name must be at least four characters."}
                    {organizationName.length > 20 && "Your Organization name must be shorter than twenty characters."}
                  </small>
                  <DialogClose className="w-full">
                    <Button
                    disabled={organizationName.length < 4 || organizationName.length > 20}
                    onClick={() => handleCreateOrganization()}
                    className="w-full"
                    >
                      Submit  
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <Input 
              placeholder="Search projects" 
              type='text'
              value={query}
              onChange={handleSearch}
            />
          </div>
          {/*<div>
            <h3 className="font-semibold text-md">All Organizations</h3>
          </div>*/}
          <div className="sm:flex space-y-5">
            {projectData === null ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:4">
                <div className="py-20 px-40 skeleton rounded-md"></div>
                <div className="py-20 px-40 skeleton rounded-md"></div>  
                <div className="py-20 px-40 skeleton rounded-md"></div>  
                <div className="py-20 px-40 skeleton rounded-md"></div>  
              </div>
            ) : projectData.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:4">

              { filteredProjects.length <= 0 ? (projectData.map((data, index) => (
                              <Link href={`/dashboard/${data.id}`}>
                                <Card className="rounded-lg shadow-md max-w-md border hover:border-blue-500 hover:cursor-pointer mx-auto p-6 bg-white">
                                  <div className="flex flex-col items-center">
                                    <div className="bg-pink-500 rounded-full p-8 m-4" style={{ backgroundColor: `rgb(${data.bgColor})` }} />
                                    <p className="text-sm text-black font-medium mb-2">
                                       {data.organization_id}
                                    </p>
                                    <h3 className="text-2xl text-black font-bold mb-4">
                                       {data.name}
                                    </h3>
                                    <p className="text-sm text-black font-medium mb-2">
                                       {data.description}
                                    </p>
                                  </div>
                                  <div className="mt-4 text-muted-foreground text-xs font-medium text-right">
                                    {data.created_at}
                                  </div>
                                </Card>
                              </Link>
                            ))) : (filteredProjects.map((data, index) => (
                              <Link href={`/dashboard/${data.id}`}>
                                <Card className="rounded-lg shadow-md max-w-md border hover:border-blue-500 hover:cursor-pointer mx-auto p-6 bg-white">
                                  <div className="flex flex-col items-center">
                                    <div className="bg-pink-500 rounded-full p-8 m-4" style={{ backgroundColor: `rgb(${data.bgColor})` }} />
                                    <p className="text-sm text-black font-medium mb-2">
                                       {data.organization_id}
                                    </p>
                                    <h3 className="text-2xl text-black font-bold mb-4">
                                       {data.name}
                                    </h3>
                                    <p className="text-sm text-black font-medium mb-2">
                                       {data.description}
                                    </p>
                                  </div>
                                  <div className="mt-4 text-muted-foreground text-xs font-medium text-right">
                                    {data.created_at}
                                  </div>
                                </Card>
                              </Link>
                            ))) }
                
              </div>
              
            ) : "Whoops, you have not created any projects yet"
            }
          </div>
        </div>
      </div>     
    </div>
  </>
);

};

export default ProjBoard;