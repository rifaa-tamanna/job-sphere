import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { EditJobDialog } from "@/app/components/EditJobDialog"
import { DuplicateJobItem } from "@/app/components/DuplicateJobItem"
import { CloseJobItem } from "@/app/components/CloseJobItem"
import { JobSearch } from "@/app/components/JobSearch"

import Link from "next/link"
import {
  Bug,
  ChevronLeft,
  ChevronRight,
  Code,
  EllipsisVertical,
  MapPin,
  Megaphone,
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
import { getJobs } from "@/lib/api/jobs"

// Job types
type JobStatus = "Active" | "Expired" | "Closed"
type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

// MongoDB document type
interface JobDocument {
  _id: string | { $oid?: string }
  title: string
  company: string
  category: string
  Type: string
  isRemote: boolean
  location: string
  minSalary: string | number
  maxSalary: string | number
  salaryFrequency: string
  responsibilities: string
  requirements: string
  applicants: number
  status: string
  deadline: string
  posted: string
}

// UI job type
interface JobPost {
  id: string
  _id: string
  title: string
  category: string
  company: string
  location: string
  type: JobType
  isRemote: boolean
  compensation: string
  minSalary: string | number
  maxSalary: string | number
  salaryFrequency: string
  applicants: number
  status: JobStatus
  deadline: string
  posted: string
  responsibilities: string
  requirements: string
}

// Category icon mapping
const departmentIcons: Record<string, LucideIcon> = {
  Engineering: Code,
  "Engineering & Tech": Code,
  Design: Code,
  Infrastructure: Server,
  Marketing: Megaphone,
  Quality: Bug,
  Analytics: Bug,
}

// Format job type
function formatJobType(type: string): JobType {
  const normalized = type?.toLowerCase().trim()

  const types: Record<string, JobType> = {
    "full-time": "Full-time",
    "full time": "Full-time",
    "part-time": "Part-time",
    "part time": "Part-time",
    contract: "Contract",
    internship: "Internship",
  }

  return types[normalized] ?? "Contract"
}

// Format job status
function formatJobStatus(status: string): JobStatus {
  const normalized = status?.toLowerCase().trim()

  if (normalized === "active") return "Active"
  if (normalized === "expired") return "Expired"

  return "Closed"
}

// Format salary
function formatSalary(
  minSalary: string | number,
  maxSalary: string | number,
  frequency: string
) {
  const min = minSalary || "Negotiable"
  const max = maxSalary || ""

  const range = max ? `${min} - ${max}` : `${min}`
  const salaryFrequency = frequency ? ` / ${frequency}` : ""

  return `${range}${salaryFrequency}`
}

// Format deadline date
function formatDeadline(date: string) {
  if (!date) return "—"

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

// Remote / On-site Badge
function WorkModeBadge({ isRemote }: { isRemote: boolean }) {
  return (
    <Badge
      variant="outline"
      className="h-6 rounded-md border-[#D6D4CE] bg-[#F0EFEA] px-2 font-[family-name:var(--font-manrope)] text-[10px] font-medium text-[#55575F] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#D6D4CE]"
    >
      {isRemote ? "Remote" : "On-site"}
    </Badge>
  )
}

// Row Actions
export function RowActions({ job }: { job: JobPost }) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-1.5">
      <EditJobDialog job={job} />

      <DeleteJobDialog job={job} />

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={`More actions for ${job.title}`}
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

          <DuplicateJobItem job={job} />

          <CloseJobItem job={job} />

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
  const Icon = departmentIcons[job.category] ?? Code

  return (
    <li className="min-w-0 rounded-xl border border-[#D6D4CE] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#A5A39C] sm:p-5 dark:border-[#383A40] dark:bg-[#191A1E] dark:hover:border-[#777980]">
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
              {job.category}
            </p>
          </div>
        </div>

        <StatusBadge status={job.status} />
      </div>

      <div className="mt-5">
        <p className="font-[family-name:var(--font-manrope)] text-sm font-semibold text-[#373940] dark:text-[#D6D4CE]">
          {job.company}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="flex min-w-0 items-center gap-1.5 font-[family-name:var(--font-manrope)] text-xs text-[#777980] dark:text-[#A5A5A2]">
            <MapPin aria-hidden className="size-3.5 shrink-0" />
            <span className="truncate">{job.location}</span>
          </p>

          <WorkModeBadge isRemote={job.isRemote} />
        </div>
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
          <dt className={labelClasses}>Salary</dt>
          <dd className="mt-2 font-[family-name:var(--font-manrope)] text-sm font-medium break-words text-[#25262B] tabular-nums dark:text-[#EAE7DE]">
            {job.compensation}
          </dd>
        </div>

        <div>
          <dt className={labelClasses}>Applicants</dt>
          <dd className="mt-2 flex items-center gap-1.5 font-[family-name:var(--font-manrope)] text-sm font-semibold text-[#25262B] dark:text-[#EAE7DE]">
            <Users
              aria-hidden
              className="size-3.5 text-[#5e7be6] dark:text-[#A5A5A2]"
            />
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
        <RowActions job={job} />
      </div>
    </li>
  )
}

// Manage Jobs Page
const ManageJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string
    q?: string
    page?: string
  }>
}) => {
  const params = await searchParams

  const activeFilter = params.status?.toLowerCase() ?? "all"
  const searchQuery = params.q?.trim() ?? ""

  const jobs: JobDocument[] = await getJobs()

  // Convert MongoDB documents into UI job data
  const jobPosts: JobPost[] = Array.isArray(jobs)
    ? jobs.map((job) => {
        const jobId =
          typeof job._id === "string" ? job._id : (job._id.$oid ?? "")

        return {
          minSalary: job.minSalary ?? "",
          maxSalary: job.maxSalary ?? "",
          salaryFrequency: job.salaryFrequency ?? "",
          id: jobId,
          _id: jobId,
          title: job.title ?? "",
          category: job.category ?? "",
          company: job.company ?? "",
          location: job.location ?? "",
          type: formatJobType(job.Type),
          isRemote: Boolean(job.isRemote),
          compensation: formatSalary(
            job.minSalary,
            job.maxSalary,
            job.salaryFrequency
          ),
          applicants: job.applicants ?? 0,
          status: formatJobStatus(job.status),
          deadline: job.deadline ?? "",
          posted: job.posted ?? "",
          responsibilities: job.responsibilities ?? "",
          requirements: job.requirements ?? "",
        }
      })
    : []

  // Status Filter
  const validFilters = ["all", "active", "closed", "expired"]

  const selectedFilter = validFilters.includes(activeFilter)
    ? activeFilter
    : "all"

  // Search + Status Filter
  const filteredJobPosts = jobPosts.filter((job) => {
    const matchesStatus =
      selectedFilter === "all" || job.status.toLowerCase() === selectedFilter

    const searchText = searchQuery.toLowerCase()

    const matchesSearch =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText) ||
      job.category.toLowerCase().includes(searchText)

    return matchesStatus && matchesSearch
  })

  // Pagination
  const JOBS_PER_PAGE = 6

  const parsedPage = Number.parseInt(params.page ?? "1", 10)

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobPosts.length / JOBS_PER_PAGE)
  )

  const currentPage = Math.min(
    Math.max(Number.isNaN(parsedPage) ? 1 : parsedPage, 1),
    totalPages
  )

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE

  const paginatedJobPosts = filteredJobPosts.slice(
    startIndex,
    startIndex + JOBS_PER_PAGE
  )

  const showingFrom = filteredJobPosts.length === 0 ? 0 : startIndex + 1

  const showingTo = Math.min(
    startIndex + JOBS_PER_PAGE,
    filteredJobPosts.length
  )

  // Pagination URL
  const getPageHref = (page: number) => {
    const queryParams = new URLSearchParams()

    if (selectedFilter !== "all") {
      queryParams.set("status", selectedFilter)
    }

    if (searchQuery) {
      queryParams.set("q", searchQuery)
    }

    if (page > 1) {
      queryParams.set("page", String(page))
    }

    const queryString = queryParams.toString()

    return queryString
      ? `/dashboard/recruiter/jobs?${queryString}`
      : "/dashboard/recruiter/jobs"
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-[1400px] min-w-0 overflow-x-clip rounded-2xl bg-[#F8F7F3] px-4 py-6 font-[family-name:var(--font-manrope)] sm:px-6 lg:px-8 lg:py-8 dark:bg-[#191A1E]">
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

          <h1 className="mt-5 font-[family-name:var(--font-manrope)] text-2xl font-extrabold tracking-[-0.8px] text-[#25262B] sm:text-3xl dark:text-[#EAE7DE]">
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

      {/* Job Filters + Search */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Job Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: "All Jobs", value: "all" },
            { label: "Active", value: "active" },
            { label: "Closed", value: "closed" },
            { label: "Expired", value: "expired" },
          ].map((filter) => (
            <Link
              key={filter.value}
              href={(() => {
                const queryParams = new URLSearchParams()

                if (filter.value !== "all") {
                  queryParams.set("status", filter.value)
                }

                if (searchQuery) {
                  queryParams.set("q", searchQuery)
                }

                const queryString = queryParams.toString()

                return queryString
                  ? `/dashboard/recruiter/jobs?${queryString}`
                  : "/dashboard/recruiter/jobs"
              })()}
              className={cn(
                "rounded-lg border px-4 py-2 font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-wide transition-colors",
                selectedFilter === filter.value
                  ? "border-[#25262B] bg-[#25262B] text-[#EAE7DE] dark:border-[#EAE7DE] dark:bg-[#EAE7DE] dark:text-[#191A1E]"
                  : "border-[#D6D4CE] bg-white text-[#777980] hover:bg-[#E9E7E0] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#A5A5A2] dark:hover:bg-[#303137]"
              )}
            >
              {filter.label}
            </Link>
          ))}
        </div>

        {/* Job Search */}
        <div className="w-full sm:w-auto sm:max-w-md sm:min-w-[280px]">
          <JobSearch initialQuery={searchQuery} />
        </div>
      </div>

      {/* Desktop Job Table */}
      <div className="mt-8 hidden w-full max-w-full min-w-0 overflow-x-auto rounded-xl border border-[#D6D4CE] bg-white shadow-sm xl:block dark:border-[#383A40] dark:bg-[#191A1E]">
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
                Salary
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
              <TableHead
                className={`h-14 w-[15%] min-w-[170px] px-3 text-right ${labelClasses}`}
              >
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedJobPosts.length > 0 ? (
              paginatedJobPosts.map((job) => {
                const Icon = departmentIcons[job.category] ?? Code

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
                            {job.category}
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
                      <div className="mt-1">
                        <WorkModeBadge isRemote={job.isRemote} />
                      </div>
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
                      <p className="font-[family-name:var(--font-manrope)] text-[11px] font-medium break-words text-[#373940] tabular-nums dark:text-[#D6D4CE]">
                        {job.compensation}
                      </p>
                    </TableCell>

                    <TableCell className="px-2 py-4">
                      <span className="flex items-center gap-1.5 font-[family-name:var(--font-manrope)] text-xs font-semibold text-[#373940] dark:text-[#D6D4CE]">
                        <Users
                          aria-hidden
                          className="size-3.5 shrink-0 text-[#5e7be6] dark:text-[#A5A5A2]"
                        />
                        {job.applicants}
                      </span>
                    </TableCell>

                    <TableCell className="px-2 py-4">
                      <StatusBadge status={job.status} />
                    </TableCell>

                    <TableCell className="px-2 py-4 whitespace-nowrap">
                      <p className="font-[family-name:var(--font-manrope)] text-[11px] text-[#373940] dark:text-[#D6D4CE]">
                        {formatDeadline(job.deadline)}
                      </p>
                      <p className="mt-1 truncate font-[family-name:var(--font-manrope)] text-[10px] text-[#92939A] dark:text-[#777980]">
                        {job.posted}
                      </p>
                    </TableCell>

                    <TableCell className="px-2 py-4 whitespace-nowrap">
                      <RowActions job={job} />
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
        {paginatedJobPosts.length > 0 ? (
          paginatedJobPosts.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <li className="col-span-full rounded-xl border border-[#D6D4CE] bg-white px-4 py-10 text-center text-sm text-[#777980] dark:border-[#383A40] dark:bg-[#191A1E] dark:text-[#A5A5A2]">
            No job postings found.
          </li>
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Job pagination"
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {/* Previous */}
          <Button
            render={
              <Link
                href={getPageHref(currentPage - 1)}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
              />
            }
            nativeButton={false}
            variant="outline"
            disabled={currentPage === 1}
            className="h-9 gap-1 rounded-lg border-[#D6D4CE] bg-white px-3 font-[family-name:var(--font-space-mono)] text-[10px] text-[#55575F] hover:bg-[#E9E7E0] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#D6D4CE] dark:hover:bg-[#303137]"
          >
            <ChevronLeft className="size-3.5" />
            Previous
          </Button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <Button
                key={page}
                render={<Link href={getPageHref(page)} />}
                nativeButton={false}
                variant="outline"
                aria-current={currentPage === page ? "page" : undefined}
                className={cn(
                  "size-9 rounded-lg font-[family-name:var(--font-space-mono)] text-[11px] font-bold",
                  currentPage === page
                    ? "border-[#25262B] bg-[#25262B] text-[#EAE7DE] hover:bg-[#373940] dark:border-[#EAE7DE] dark:bg-[#EAE7DE] dark:text-[#191A1E] dark:hover:bg-white"
                    : "border-[#D6D4CE] bg-white text-[#777980] hover:bg-[#E9E7E0] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#A5A5A2] dark:hover:bg-[#303137]"
                )}
              >
                {page}
              </Button>
            )
          )}

          {/* Next */}
          <Button
            render={
              <Link
                href={getPageHref(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
              />
            }
            nativeButton={false}
            variant="outline"
            disabled={currentPage === totalPages}
            className="h-9 gap-1 rounded-lg border-[#D6D4CE] bg-white px-3 font-[family-name:var(--font-space-mono)] text-[10px] text-[#55575F] hover:bg-[#E9E7E0] dark:border-[#44464B] dark:bg-[#25262B] dark:text-[#D6D4CE] dark:hover:bg-[#303137]"
          >
            Next
            <ChevronRight className="size-3.5" />
          </Button>
        </nav>
      )}

      {/* Bottom Summary */}
      <div className="mt-6 flex flex-col gap-2 rounded-xl border border-[#D6D4CE]/60 bg-[#F0EFEA]/50 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-[#383A40] dark:bg-[#25262B]/50">
        <p className="font-[family-name:var(--font-manrope)] text-xs text-[#777980] dark:text-[#A5A5A2]">
          Showing{" "}
          <span className="font-bold text-[#25262B] dark:text-[#EAE7DE]">
            {showingFrom}-{showingTo}
          </span>{" "}
          of{" "}
          <span className="font-bold text-[#25262B] dark:text-[#EAE7DE]">
            {filteredJobPosts.length}
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
