"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/toast"
import { createJob } from "@/lib/api/jobs"

type DuplicateJob = {
  _id: string
  title: string
  company: string
  category: string
  type: string
  isRemote: boolean
  location: string
  minSalary: string | number
  maxSalary: string | number
  salaryFrequency: string
  responsibilities: string
  requirements: string
  deadline: string
}

export function DuplicateJobItem({ job }: { job: DuplicateJob }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDuplicate = async () => {
    try {
      setLoading(true)

      const newJob = {
        title: `${job.title} (Copy)`,
        company: job.company,
        category: job.category,
        Type: job.type.toLowerCase(),
        isRemote: job.isRemote,
        location: job.location,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        salaryFrequency: job.salaryFrequency,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        deadline: job.deadline,
        applicants: 0,
        status: "active",
        posted: "Posted just now",
      }

      await createJob(newJob)

      toast.add({
        title: "Job Duplicated",
        description: "A copy of your job listing has been created.",
      })

      router.refresh()
    } catch (error) {
      console.error("Duplicate job error:", error)

      toast.add({
        title: "Duplicate Failed",
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
      onClick={handleDuplicate}
      className="font-[family-name:var(--font-manrope)] text-xs"
    >
      {loading ? "Duplicating..." : "Duplicate listing"}
    </DropdownMenuItem>
  )
}
