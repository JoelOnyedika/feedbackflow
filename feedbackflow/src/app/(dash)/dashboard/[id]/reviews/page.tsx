"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import StarIcon from "@/components/custom/StarIcon"
import {Search as SearchIcon, Download} from "lucide-react"
import Sidebar from "@/components/sidebar/Sidebar"
import { getAllReviews } from "@/lib/supabase/queries/panel"
import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import Navbar from "@/components/hero/Navbar"

const Review = () => {
  const {id}: any = useParams()
  const [reviewData, setReviewData] = useState(null)
  const [popupMessage, setPopupMessage] = useState({ message: "", type: "" })
  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data, error }: any = await getAllReviews(id)
        if (error) {
          console.log(error)
          setPopupMessage({ message: error.message, type: "error" })
        }
        console.log(data)
        setReviewData(data)
      } catch(error) {
        console.log(error)
        setPopupMessage({ message: "Whoops something went wrong.", type: "error" })
      }
    }
  fetchAllReviews()
  }, [])
  return (
    <>
      <Navbar />
      <div className="flex">
    <Sidebar />
    <div className="flex-grow flex">
  <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">User Reviews</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                placeholder="Search reviews..."
                type="search"
              />
            </div>
            <Button size="sm">
              <Download className="mr-2 w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rating</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <div>
                {reviewData === null ? (
    <TableRow>
      <TableCell>
        <div className="skeleton rounded-md mx-auto" style={{ width: '100%', height: '50px' }}></div>
      </TableCell>
    </TableRow>    
        ) : reviewData.length === 0 ? (
          <span>No reviews available</span>
        ) : (
          reviewData.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon
                      key={index}
                      className={`w-5 h-5 ${index < review.rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>{review.date}</TableCell> {/* Assuming you have a date field */}
              <TableCell>{review.comment}</TableCell>
            </TableRow>
          ))
        )}
              </div>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                    <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>2023-02-12</TableCell>
                <TableCell>The product didn't meet my expectations.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
      </div>
    </>
    
  )
}

export default Review