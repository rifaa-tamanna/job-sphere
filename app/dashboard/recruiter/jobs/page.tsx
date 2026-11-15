
import Link from "next/link"
import {
  Bug,
  ChevronRight,
  Code,
  EllipsisVertical,
  MapPin,
  Megaphone,
  Palette,
  Pencil,
  Plus,
  Server,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { getJobs } from "@/lib/api/jobs."
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"

// Job types
type JobStatus = "Active" | "Expired" | "Closed"
type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

// MongoDB document type
interface JobDocument {
  _id: string | { $oid: string }
  title: string
  department: string
  company: string
  location: string
  type: JobType
  compensation: string
  applicants: number
  status: JobStatus
  deadline: string
  posted: string
}

// UI job type
interface JobPost {
  id: string
  title: string
  department: string
  company: string
  location: string
  type: JobType
  compensation: string
  applicants: number
  status: JobStatus
  deadline: string
  posted: string
  icon: LucideIcon
}

// Department icon mapping
function getDepartmentIcon(department: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    Engineering: Code,
    Design: Palette,
    Infrastructure: Server,
    Marketing: Megaphone,
    Quality: Bug,
    Analytics: Bug,
  }

  return icons[department] || Code
}

// Format deadline date
function formatDeadline(date: string) {
  if (!date) return "—"

  // Handle YYYY-MM-DD without timezone shifting
  const dateOnly = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  const parsedDate = dateOnly
    ? new Date(
        Number(dateOnly[1]),
        Number(dateOnly[2]) - 1,
        Number(dateOnly[3])
      )
    : new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return date

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}

const labelClasses =
  "font-[family-name:var(--font-space-mono)] text-[10px] font-bold uppercase tracking-[1px] text-[#92939A] dark:text-[#777980]"

// Status Badge
function StatusBadge({ status }: { status: JobStatus }) {
  const isActive = status === "Active"

  return (
    <Badge
      variant="outline"
      className={cn(
        "h-7 gap-2 rounded-full px-3 font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-wide",
        isActive
          ? "border-[#A5A39C] bg-[#EAE8E1] text-[#373940] dark:border-[#777980] dark:bg-[#303137] dark:text-[#EAE7DE]"
          : "border-[#D6D4CE] bg-[#F0EFEA] text-[#777980] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#92939A]"
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isActive ? "bg-[#7D9B78]" : "bg-[#92939A]"
        )}
      />
      {status}
    </Badge>
  )
}

// Row Actions
export function RowActions({ title }: { title: string }) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-1.5">
      <Button
        variant="outline"
        size="sm"
        className="h-8 shrink-0 gap-1.5 rounded-lg border-[#D6D4CE] bg-transparent px-3 font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-wide text-[#373940] transition-all hover:border-[#777980] hover:bg-[#E9E7E0] dark:border-[#44464B] dark:text-[#EAE7DE] dark:hover:border-[#777980] dark:hover:bg-[#303137]"
        aria-label={`Update ${title}`}
      >
        <Pencil className="size-3.5 shrink-0" />
        Update
      </Button>

      <DeleteJobDialog jobTitle={title} />

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={`More actions for ${title}`}
              title="More actions"
              className="size-8 shrink-0 rounded-lg text-[#777980] hover:bg-[#E9E7E0] hover:text-[#25262B] dark:text-[#A5A5A2] dark:hover:bg-[#303137] dark:hover:text-[#EAE7DE]"
            />
          }
        >
          <EllipsisVertical className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44 border-[#D6D4CE] bg-[#F8F7F3] dark:border-[#44464B] dark:bg-[#25262B]"
        >
          <DropdownMenuItem className="font-[family-name:var(--font-manrope)] text-xs">
            Update listing
          </DropdownMenuItem>
          <DropdownMenuItem className="font-[family-name:var(--font-manrope)] text-xs">
            Duplicate listing
          </DropdownMenuItem>
          <DropdownMenuItem className="font-[family-name:var(--font-manrope)] text-xs">
            Close posting
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#D6D4CE] dark:bg-[#44464B]" />
          <DropdownMenuItem
            variant="destructive"
            className="font-[family-name:var(--font-manrope)] text-xs"
          >
            Delete posting
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// Responsive Job Card
function JobCard({ job }: { job: JobPost }) {
  const Icon = job.icon

  return (
    <li className="min-w-0 rounded-xl border border-[#D6D4CE] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#A5A39C] dark:border-[#383A40] dark:bg-[#191A1E] dark:hover:border-[#777980] sm:p-5">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#D6D4CE] bg-[#F0EFEA] text-[#55575F] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#C1BEB5]">
            <Icon aria-hidden className="size-4" />
          </span>

          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-manrope)] text-sm font-bold text-[#25262B] dark:text-[#EAE7DE]">
              {job.title}
            </p>
            <p className="mt-1 truncate font-[family-name:var(--font-manrope)] text-xs text-[#777980] dark:text-[#A5A5A2]">
              {job.department}
            </p>
          </div>
        </div>

        <StatusBadge status={job.status} />
      </div>

      <div className="mt-5">
        <p className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-[#373940] dark:text-[#D6D4CE]">
          {job.company}
        </p>

        <p className="mt-1.5 flex items-center gap-1.5 font-[family-name:var(--font-manrope)] text-xs text-[#777980] dark:text-[#A5A5A2]">
          <MapPin aria-hidden className="size-3.5 shrink-0" />
          <span className="truncate">{job.location}</span>
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[#E4E2DC] pt-4 dark:border-[#303137]">
        <div className="min-w-0">
          <dt className={labelClasses}>Type</dt>
          <dd className="mt-2">
            <Badge
              variant="outline"
              className="h-7 max-w-full rounded-md border-[#D6D4CE] bg-[#F8F7F3] px-2 font-[family-name:var(--font-manrope)] text-[11px] font-medium text-[#55575F] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#D6D4CE]"
            >
              {job.type}
            </Badge>
          </dd>
        </div>

        <div className="min-w-0">
          <dt className={labelClasses}>Compensation</dt>
          <dd className="mt-2 truncate font-[family-name:var(--font-manrope)] text-sm font-medium tabular-nums text-[#25262B] dark:text-[#EAE7DE]">
            {job.compensation}
          </dd>
        </div>

        <div>
          <dt className={labelClasses}>Applicants</dt>
          <dd className="mt-2 flex items-center gap-1.5 font-[family-name:var(--font-manrope)] text-sm font-semibold text-[#25262B] dark:text-[#EAE7DE]">
            <Users aria-hidden className="size-3.5 text-[#777980] dark:text-[#A5A5A2]" />
            {job.applicants} Candidates
          </dd>
        </div>

        <div className="min-w-0">
          <dt className={labelClasses}>Deadline</dt>
          <dd className="mt-2 font-[family-name:var(--font-manrope)] text-sm text-[#25262B] dark:text-[#EAE7DE]">
            {formatDeadline(job.deadline)}
            <span className="mt-1 block text-xs text-[#92939A] dark:text-[#777980]">
              {job.posted}
            </span>
          </dd>
        </div>
      </dl>

      <div className="mt-5 flex justify-end border-t border-[#E4E2DC] pt-3 dark:border-[#303137]">
        <RowActions title={job.title} />
      </div>
    </li>
  )
}

// Manage Jobs Page
const ManageJobsPage = async () => {
  const jobs: JobDocument[] = await getJobs()

  // Convert MongoDB documents into UI job data
  const jobPosts: JobPost[] = Array.isArray(jobs)
    ? jobs.map((job) => ({
        id: typeof job._id === "string" ? job._id : job._id.$oid,
        title: job.title,
        department: job.department,
        company: job.company,
        location: job.location,
        type: job.type,
        compensation: job.compensation,
        applicants: job.applicants,
        status: job.status,
        deadline: job.deadline,
        posted: job.posted,
        icon: getDepartmentIcon(job.department),
      }))
    : []

  return (
    <main className="mx-auto min-h-screen w-full min-w-0 max-w-[1400px] overflow-x-clip rounded-2xl bg-[#F8F7F3] px-4 py-6 font-[family-name:var(--font-manrope)] dark:bg-[#191A1E] sm:px-6 lg:px-8 lg:py-8">
      {/* Page Header */}
      <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className={`flex flex-wrap items-center gap-2 ${labelClasses}`}
          >
            <span>Manage Jobs</span>
            <ChevronRight aria-hidden className="size-3 shrink-0" />
            <span className="text-[#25262B] dark:text-[#EAE7DE]">
              Job Listings &amp; Postings
            </span>
          </nav>

          <h1 className="mt-5 font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-[-0.8px] text-[#25262B] dark:text-[#EAE7DE] sm:text-3xl">
            Manage Job Posts
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777980] dark:text-[#A5A5A2]">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          nativeButton={false}
          className="h-11 shrink-0 gap-2 rounded-lg border border-[#25262B] bg-[#25262B] px-5 font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-wide text-[#EAE7DE] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#373940] dark:border-[#EAE7DE] dark:bg-[#EAE7DE] dark:text-[#191A1E] dark:hover:bg-white"
        >
          <Plus aria-hidden className="size-4" />
          New Job Post
        </Button>
      </div>

      {/* Desktop Job Table */}
      <div className="mt-8 hidden w-full min-w-0 max-w-full overflow-x-auto rounded-xl border border-[#D6D4CE] bg-white shadow-sm xl:block dark:border-[#383A40] dark:bg-[#191A1E]">
        <Table className="w-full min-w-[1120px] table-fixed">
          <TableHeader>
            <TableRow className="border-b border-[#D6D4CE] bg-[#F0EFEA] hover:bg-[#F0EFEA] dark:border-[#383A40] dark:bg-[#25262B] dark:hover:bg-[#25262B]">
              <TableHead className={`h-14 w-[18%] px-4 ${labelClasses}`}>
                Job Title
              </TableHead>
              <TableHead className={`h-14 w-[16%] px-3 ${labelClasses}`}>
                Company
              </TableHead>
              <TableHead className={`h-14 w-[9%] px-2 ${labelClasses}`}>
                Type
              </TableHead>
              <TableHead className={`h-14 w-[12%] px-2 ${labelClasses}`}>
                Compensation
              </TableHead>
              <TableHead className={`h-14 w-[8%] px-2 ${labelClasses}`}>
                Applicants
              </TableHead>
              <TableHead className={`h-14 w-[9%] px-2 ${labelClasses}`}>
                Status
              </TableHead>
              <TableHead className={`h-14 w-[13%] px-2 ${labelClasses}`}>
                Deadline
              </TableHead>
              <TableHead className={`h-14 w-[15%] min-w-[170px] px-3 text-right ${labelClasses}`}>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobPosts.length > 0 ? (
              jobPosts.map((job) => {
                const Icon = job.icon

                return (
                  <TableRow
                    key={job.id}
                    className="border-b border-[#E4E2DC] transition-colors hover:bg-[#F8F7F3] dark:border-[#303137] dark:hover:bg-[#25262B]"
                  >
                    <TableCell className="min-w-0 px-4 py-4">
                      <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#D6D4CE] bg-[#F0EFEA] text-[#55575F] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#C1BEB5]">
                          <Icon aria-hidden className="size-4" />
                        </span>

                        <div className="min-w-0">
                          <p className="truncate font-[family-name:var(--font-manrope)] text-xs font-bold text-[#25262B] dark:text-[#EAE7DE]">
                            {job.title}
                          </p>
                          <p className="mt-1 truncate font-[family-name:var(--font-manrope)] text-[11px] text-[#777980] dark:text-[#A5A5A2]">
                            {job.department}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="min-w-0 px-3 py-4">
                      <p className="truncate font-[family-name:var(--font-manrope)] text-xs font-semibold text-[#373940] dark:text-[#D6D4CE]">
                        {job.company}
                      </p>
                      <p className="mt-1 flex min-w-0 items-center gap-1 truncate font-[family-name:var(--font-manrope)] text-[10px] text-[#777980] dark:text-[#A5A5A2]">
                        <MapPin aria-hidden className="size-3 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </p>
                    </TableCell>

                    <TableCell className="px-2 py-4">
                      <Badge
                        variant="outline"
                        className="h-7 max-w-full rounded-md border-[#D6D4CE] bg-transparent px-2 font-[family-name:var(--font-manrope)] text-[10px] font-medium text-[#55575F] dark:border-[#44464B] dark:text-[#D6D4CE]"
                      >
                        <span className="truncate">{job.type}</span>
                      </Badge>
                    </TableCell>

                    <TableCell className="px-2 py-4">
                      <p className="truncate font-[family-name:var(--font-manrope)] text-[11px] font-medium tabular-nums text-[#373940] dark:text-[#D6D4CE]">
                        {job.compensation}
                      </p>
                    </TableCell>

                    <TableCell className="px-2 py-4">
                      <span className="flex items-center gap-1.5 font-[family-name:var(--font-manrope)] text-xs font-semibold text-[#373940] dark:text-[#D6D4CE]">
                        <Users aria-hidden className="size-3.5 shrink-0 text-[#777980] dark:text-[#A5A5A2]" />
                        {job.applicants}
                      </span>
                    </TableCell>

                    <TableCell className="px-2 py-4">
                      <StatusBadge status={job.status} />
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-2 py-4">
                      <p className="font-[family-name:var(--font-manrope)] text-[11px] text-[#373940] dark:text-[#D6D4CE]">
                        {formatDeadline(job.deadline)}
                      </p>
                      <p className="mt-1 truncate font-[family-name:var(--font-manrope)] text-[10px] text-[#92939A] dark:text-[#777980]">
                        {job.posted}
                      </p>
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-2 py-4">
                      <RowActions title={job.title} />
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-sm text-[#777980] dark:text-[#A5A5A2]"
                >
                  No job postings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Responsive Job Cards */}
      <ul className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:hidden">
        {jobPosts.length > 0 ? (
          jobPosts.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <li className="col-span-full rounded-xl border border-[#D6D4CE] bg-white px-4 py-10 text-center text-sm text-[#777980] dark:border-[#383A40] dark:bg-[#191A1E] dark:text-[#A5A5A2]">
            No job postings found.
          </li>
        )}
      </ul>

      {/* Bottom Summary */}
      <div className="mt-6 flex flex-col gap-2 rounded-xl border border-[#D6D4CE]/60 bg-[#F0EFEA]/50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-[#383A40] dark:bg-[#25262B]/50">
        <p className="font-[family-name:var(--font-manrope)] text-xs text-[#777980] dark:text-[#A5A5A2]">
          Showing{" "}
          <span className="font-bold text-[#25262B] dark:text-[#EAE7DE]">
            {jobPosts.length}
          </span>{" "}
          job listings
        </p>

        <p className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-wide text-[#777980] dark:text-[#A5A5A2]">
          JOBSPHERE RECRUITER PANEL
        </p>
      </div>
    </main>
  )
}

export default ManageJobsPage
