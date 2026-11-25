"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/toast"
import { updateJob } from "@/lib/api/jobs"

type ReopenJobItemProps = {
  job: {
    _id: string
    title: string
  }
}

export function ReopenJobItem({ job }: ReopenJobItemProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleReopen = async () => {
    try {
      setLoading(true)

      const res = await updateJob(job._id, {
        status: "active",
      })

      if (res.result?.matchedCount > 0) {
        toast.add({
          title: "Job Reopened",
          description: `${job.title} is now active again.`,
        })

        router.refresh()
      } else {
        throw new Error("Job could not be reopened.")
      }
    } catch (error) {
      console.error("Reopen job error:", error)

      toast.add({
        title: "Reopen Failed",
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
      onClick={handleReopen}
      className="font-[family-name:var(--font-space-mono)] text-xs"
    >
      {loading ? "Reopening..." : "Reopen posting"}
    </DropdownMenuItem>
  )
}
