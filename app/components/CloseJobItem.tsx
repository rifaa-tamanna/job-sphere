"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/toast"
import { updateJob } from "@/lib/api/jobs"

type CloseJobItemProps = {
  job: {
    _id: string
    title: string
  }
}

export function CloseJobItem({ job }: CloseJobItemProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClose = async () => {
    try {
      setLoading(true)

      const res = await updateJob(job._id, {
        status: "closed",
      })

      if (res.result?.matchedCount > 0) {
        toast.add({
          title: "Job Closed",
          description: `${job.title} has been closed successfully.`,
        })

        router.refresh()
      } else {
        throw new Error("Job could not be closed.")
      }
    } catch (error) {
      console.error("Close job error:", error)

      toast.add({
        title: "Close Failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenuItem
      disabled={loading}
      onClick={handleClose}
      className="font-[family-name:var(--font-manrope)] text-xs"
    >
      {loading ? "Closing..." : "Close posting"}
    </DropdownMenuItem>
  )
}
