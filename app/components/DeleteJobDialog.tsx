"use client"

import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { deleteJob } from "@/lib/actions/jobs"
import { useState } from "react"
import { useRouter } from "next/navigation"

type DeleteJobDialogProps = {
  job: {
    _id: string
    title: string
  }
}

export function DeleteJobDialog({ job }: DeleteJobDialogProps) {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const result = await deleteJob(job._id)

      if (result.deletedCount > 0) {
        setOpen(false)

        toast.add({
          title: "Job Deleted",
          description: "The job has been permanently deleted.",
        })

        router.refresh()
      } else {
        throw new Error("Job could not be deleted.")
      }
    } catch (error) {
      console.error("Delete job failed:", error)

      toast.add({
        title: "Delete Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="destructive"
            size="icon"
            aria-label={`Delete ${job.title}`}
          >
            <Trash2Icon className="size-4" />
          </Button>
        }
      />

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>Delete job?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete &quot;{job.title}&quot;? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>

          <AlertDialogAction variant="destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
