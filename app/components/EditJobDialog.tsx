"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { updateJob } from "@/lib/api/jobs"

type Job = {
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
  status: string
  deadline: string
}

type EditJobDialogProps = {
  job: Job
  trigger?: "button" | "menu"
}

type JobFormData = {
  title: string
  company: string
  category: string
  Type: string
  isRemote: boolean
  location: string
  minSalary: string
  maxSalary: string
  salaryFrequency: string
  responsibilities: string
  requirements: string
  status: string
  deadline: string
}

function createFormData(job: Job): JobFormData {
  return {
    title: job.title ?? "",
    company: job.company ?? "",
    category: job.category ?? "",
    Type: job.type.toLowerCase(),
    isRemote: job.isRemote,
    location: job.location ?? "",
    minSalary: String(job.minSalary ?? ""),
    maxSalary: String(job.maxSalary ?? ""),
    salaryFrequency: job.salaryFrequency ?? "",
    responsibilities: job.responsibilities ?? "",
    requirements: job.requirements ?? "",
    status: job.status.toLowerCase(),
    deadline: job.deadline ?? "",
  }
}

export function EditJobDialog({ job, trigger = "button" }: EditJobDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const [formData, setFormData] = useState<JobFormData>(() =>
    createFormData(job)
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleOpenChange = (value: boolean) => {
    if (value) {
      setFormData(createFormData(job))
    }

    setOpen(value)
  }

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await updateJob(job._id, {
        ...formData,
        minSalary: formData.minSalary,
        maxSalary: formData.maxSalary,
      })

      if (res.result?.matchedCount > 0) {
        toast.add({
          title: "Job Updated",
          description: "Your job listing has been updated successfully.",
        })

        setOpen(false)
        router.refresh()
      } else {
        throw new Error("Job was not updated")
      }
    } catch (error) {
      console.error("Update job error:", error)

      toast.add({
        title: "Update Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong while updating the job.",
      })
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "mt-1.5 border-[#D6D4CE] bg-white text-[#25262B] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#EAE7DE]"

  const labelClass = "text-xs font-semibold text-[#55575F] dark:text-[#D6D4CE]"

  return (
    <>
      {trigger === "menu" ? (
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            handleOpenChange(true)
          }}
          className="font-[family-name:var(--font-space-mono)] text-xs"
        >
          Update listing
        </DropdownMenuItem>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleOpenChange(true)}
          className="h-8 shrink-0 gap-1.5 rounded-lg border-[#D6D4CE] bg-transparent px-3 font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-wide text-[#373940] hover:bg-[#E9E7E0] dark:border-[#44464B] dark:text-[#EAE7DE] dark:hover:bg-[#303137]"
        >
          <Pencil className="size-3.5" />
          Update
        </Button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#D6D4CE] bg-[#F8F7F3] sm:max-w-2xl dark:border-[#383A40] dark:bg-[#191A1E]">
          <DialogHeader>
            <DialogTitle className="font-[family-name:var(--font-space-mono)] text-xl font-bold text-[#25262B] dark:text-[#EAE7DE]">
              Edit Job Post
            </DialogTitle>

            <DialogDescription className="text-sm text-[#777980] dark:text-[#A5A5A2]">
              Update the information of your job listing.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Job Title</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Company</label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Category</label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Job Type</label>
                <select
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  className={`h-9 w-full rounded-md border px-3 text-sm ${inputClass}`}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Job Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`h-9 w-full rounded-md border px-3 text-sm ${inputClass}`}
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Minimum Salary</label>
                <Input
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Maximum Salary</label>
                <Input
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Salary Frequency</label>
                <Input
                  name="salaryFrequency"
                  value={formData.salaryFrequency}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Application Deadline</label>
                <Input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`isRemote-${job._id}`}
                name="isRemote"
                checked={formData.isRemote}
                onChange={handleChange}
                className="size-4 accent-[#373940]"
              />

              <label htmlFor={`isRemote-${job._id}`} className={labelClass}>
                Remote Job
              </label>
            </div>

            <div>
              <label className={labelClass}>Responsibilities</label>
              <Textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Requirements</label>
              <Textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className={inputClass}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="bg-[#25262B] text-white hover:bg-[#373940] dark:bg-[#EAE7DE] dark:text-[#191A1E] dark:hover:bg-white"
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
