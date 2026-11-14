"use client"

import { useState } from "react"
import type { ComponentProps, ComponentType, FormEvent, ReactNode } from "react"
import Link from "next/link"

import {
  ArrowUpRight,
  Banknote,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createJob } from "@/lib/actions/jobs"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"]

const jobCategories = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing & Sales",
  "Customer Support",
  "Finance & Legal",
  "Operations",
  "Healthcare",
  "Education",
  "Other",
]

const salaryFrequencies = [
  "per hour",
  "per day",
  "per week",
  "per month",
  "per year",
]

const labelClasses =
  "text-[11px] font-bold uppercase tracking-[1px] text-[#565860] dark:text-[#B9B8B2]"

const inputClasses =
  "h-12 w-full rounded-lg border border-[#D6D4CE] bg-white px-4 text-sm text-[#25262B] shadow-none transition-all placeholder:text-[#A5A39C] hover:border-[#96938B] focus-visible:border-[#777980] focus-visible:ring-2 focus-visible:ring-[#777980]/15 dark:border-[#414249] dark:bg-[#222329] dark:text-[#EAE7DE] dark:placeholder:text-[#777980] dark:hover:border-[#777980] dark:focus-visible:border-[#A5A5A2] dark:focus-visible:ring-[#A5A5A2]/15"

const fieldWrapper = "flex min-w-0 flex-col gap-2.5"

const cardClasses =
  "min-w-0 rounded-xl border border-[#D6D4CE] bg-white p-5 shadow-none dark:border-[#383A40] dark:bg-[#202126] sm:p-7 lg:p-8"

interface SectionHeadingProps {
  step: string
  title: string
  description: string
  icon: ReactNode
}

function SectionHeading({
  step,
  title,
  description,
  icon,
}: SectionHeadingProps) {
  return (
    <div className="flex items-start gap-4 border-b border-[#E5E3DD] pb-6 dark:border-[#383A40]">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#D6D4CE] bg-[#F8F7F3] text-[#44464D] dark:border-[#44464B] dark:bg-[#292A30] dark:text-[#EAE7DE]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-[1.5px] text-[#92939A]">
          STEP {step}
        </p>

        <h2 className="mt-1 font-[family-name:var(--font-manrope)] text-lg font-bold tracking-tight text-[#24252A] sm:text-xl dark:text-[#EAE7DE]">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-relaxed text-[#777980] dark:text-[#A5A5A2]">
          {description}
        </p>
      </div>
    </div>
  )
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <Label htmlFor={htmlFor} className={labelClasses}>
      {children}
      {required && <span className="ml-1 text-[#777980]">*</span>}
    </Label>
  )
}

function IconInput({
  icon: Icon,
  ...props
}: ComponentProps<typeof Input> & {
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="group relative w-full">
      <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#92939A] transition-colors group-focus-within:text-[#44464D] dark:group-focus-within:text-[#EAE7DE]" />
      <Input {...props} className={`${inputClasses} pl-10`} />
    </div>
  )
}

export default function NewJobPage() {
  const [isRemote, setIsRemote] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget).entries())

    const jobData = {
      ...data,
      isRemote,
    }

    console.log("[Post a New Job] collected form data:", jobData)

    const result = await createJob(jobData)

    console.log("result", result)
  }

  return (
    <main className="min-h-screen w-full min-w-0 rounded-2xl bg-[#F8F7F3] px-4 py-7 text-[#24252A] sm:px-6 md:ml-5 md:w-[calc(100%-1.25rem)] lg:px-9 lg:py-10 dark:bg-[#191A1E] dark:text-[#EAE7DE]">
      <div className="w-full space-y-7">
        {/* Page Header */}
        <section className="relative overflow-hidden border-b border-[#D6D4CE] pb-7 dark:border-[#383A40]">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <nav
                aria-label="Breadcrumb"
                className="mb-6 flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[11px] text-[#92939A]"
              >
                <Link
                  href="/dashboard/recruiter/jobs"
                  className="transition-colors hover:text-[#24252A] dark:hover:text-white"
                >
                  Manage Jobs
                </Link>

                <ChevronRight className="size-3" />

                <span className="text-[#565860] dark:text-[#D0CEC6]">
                  Create New Listing
                </span>
              </nav>

              <div className="flex items-center gap-2 font-[family-name:var(--font-space-mono)] text-[10px] font-bold tracking-[2px] text-[#777980] uppercase dark:text-[#A5A5A2]">
                <span className="size-2 rounded-full bg-[#92938B]" />
                Recruiter Portal
              </div>

              <h1 className="mt-3 font-[family-name:var(--font-bodoni)] text-4xl font-semibold tracking-[-1.5px] text-[#24252A] sm:text-5xl lg:text-[56px] dark:text-[#EAE7DE]">
                Post a New Job
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#777980] sm:text-base dark:text-[#A5A5A2]">
                Create a new opportunity and connect with talented
                professionals. Complete the details below to publish your job
                listing.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 self-start rounded-lg border border-[#D6D4CE] bg-white px-4 py-3 sm:self-auto dark:border-[#414249] dark:bg-[#222329]">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#F0EFEA] text-[#44464D] dark:bg-[#303137] dark:text-[#EAE7DE]">
                <BriefcaseBusiness className="size-5" />
              </div>

              <div>
                <p className="font-[family-name:var(--font-space-mono)] text-[11px] font-bold tracking-wide">
                  NEW LISTING
                </p>
                <p className="mt-1 text-xs text-[#92939A]">
                  Job publication form
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Message */}
        {message && (
          <div
            role="status"
            className="flex items-center gap-3 rounded-lg border border-[#A5B49E] bg-[#EEF2EB] px-5 py-4 text-sm text-[#3F5A3D] dark:border-[#52664F] dark:bg-[#29342A] dark:text-[#C5D7BE]"
          >
            <CheckCircle2 className="size-5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        {/* Form */}
        <form
          id="new-job-form"
          onSubmit={handleSubmit}
          className="w-full space-y-6"
        >
          {/* Basic Information */}
          <section className={cardClasses}>
            <SectionHeading
              step="01"
              title="Basic Information"
              description="Start with the essential details about the position."
              icon={<BriefcaseBusiness className="size-5" />}
            />

            <div className="mt-7 space-y-6">
              <div className={fieldWrapper}>
                <FieldLabel htmlFor="job-title" required>
                  Job Title
                </FieldLabel>

                <Input
                  id="job-title"
                  name="title"
                  required
                  placeholder="e.g. Senior Frontend Developer"
                  className={inputClasses}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className={fieldWrapper}>
                  <FieldLabel htmlFor="company-name" required>
                    Company Name
                  </FieldLabel>

                  <IconInput
                    id="company-name"
                    name="company"
                    required
                    icon={Building2}
                    placeholder="Enter company name"
                  />
                </div>

                <div className={fieldWrapper}>
                  <FieldLabel htmlFor="job-category" required>
                    Job Category
                  </FieldLabel>

                  <Select name="category" required>
                    <SelectTrigger id="job-category" className={inputClasses}>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>

                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className={fieldWrapper}>
                <FieldLabel htmlFor="job-type-0" required>
                  Employment Type
                </FieldLabel>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {jobTypes.map((type, index) => (
                    <label key={type} className="cursor-pointer">
                      <input
                        id={`job-type-${index}`}
                        type="radio"
                        name="jobType"
                        value={type}
                        defaultChecked={index === 0}
                        required={index === 0}
                        className="peer sr-only"
                      />

                      <span className="flex h-12 items-center justify-center rounded-lg border border-[#D6D4CE] bg-[#F8F7F3] px-2 text-sm font-medium text-[#777980] transition-all peer-checked:border-[#777980] peer-checked:bg-[#EAE8E1] peer-checked:text-[#24252A] peer-focus-visible:ring-2 peer-focus-visible:ring-[#777980]/20 hover:border-[#96938B] dark:border-[#414249] dark:bg-[#25262B] dark:text-[#A5A5A2] dark:peer-checked:border-[#A5A5A2] dark:peer-checked:bg-[#35363C] dark:peer-checked:text-[#EAE7DE] dark:hover:border-[#777980]">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Location & Compensation */}
          <section className={cardClasses}>
            <SectionHeading
              step="02"
              title="Location & Compensation"
              description="Set the work location, salary range and application deadline."
              icon={<Globe2 className="size-5" />}
            />

            <div className="mt-7 space-y-7">
              {/* Remote Switch */}
              <div className="flex items-center justify-between gap-4 rounded-lg border border-[#D6D4CE] bg-[#F8F7F3] p-4 sm:p-5 dark:border-[#414249] dark:bg-[#25262B]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#EAE8E1] text-[#44464D] dark:bg-[#35363C] dark:text-[#EAE7DE]">
                    <Globe2 className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Remote Work Allowed</p>
                    <p className="mt-1 text-xs text-[#92939A]">
                      Allow candidates to work remotely
                    </p>
                  </div>
                </div>

                <Switch
                  checked={isRemote}
                  onCheckedChange={setIsRemote}
                  aria-label="Remote work allowed"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className={fieldWrapper}>
                  <FieldLabel htmlFor="job-location" required>
                    Job Location
                  </FieldLabel>

                  <IconInput
                    id="job-location"
                    name="location"
                    required
                    icon={MapPin}
                    placeholder="e.g. Dhaka, Bangladesh"
                  />
                </div>

                <div className={fieldWrapper}>
                  <FieldLabel htmlFor="application-deadline">
                    Application Deadline
                  </FieldLabel>

                  <IconInput
                    id="application-deadline"
                    name="deadline"
                    type="date"
                    icon={CalendarDays}
                  />
                </div>
              </div>

              {/* Salary Details */}
              <div className="space-y-5 border-t border-[#E5E3DD] pt-6 dark:border-[#383A40]">
                <div>
                  <h3 className="font-[family-name:var(--font-manrope)] text-base font-bold">
                    Salary Details
                  </h3>

                  <p className="mt-1 text-xs text-[#92939A]">
                    Specify the expected compensation for this role.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className={fieldWrapper}>
                    <FieldLabel htmlFor="min-salary">Minimum Salary</FieldLabel>

                    <IconInput
                      id="min-salary"
                      name="minSalary"
                      type="number"
                      min={0}
                      icon={Banknote}
                      placeholder="e.g. 25000"
                    />
                  </div>

                  <div className={fieldWrapper}>
                    <FieldLabel htmlFor="max-salary">Maximum Salary</FieldLabel>

                    <IconInput
                      id="max-salary"
                      name="maxSalary"
                      type="number"
                      min={0}
                      icon={Banknote}
                      placeholder="e.g. 50000"
                    />
                  </div>

                  <div className={fieldWrapper}>
                    <FieldLabel htmlFor="salary-frequency">
                      Salary Frequency
                    </FieldLabel>

                    <Select name="frequency">
                      <SelectTrigger
                        id="salary-frequency"
                        className={inputClasses}
                      >
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>

                      <SelectContent>
                        {salaryFrequencies.map((frequency) => (
                          <SelectItem key={frequency} value={frequency}>
                            {frequency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Responsibilities & Requirements */}
          <section className={cardClasses}>
            <SectionHeading
              step="03"
              title="Responsibilities & Requirements"
              description="Describe the role and the qualifications candidates should have."
              icon={<FileText className="size-5" />}
            />

            <div className="mt-7 space-y-6">
              <div className={fieldWrapper}>
                <FieldLabel htmlFor="responsibilities" required>
                  Key Responsibilities
                </FieldLabel>

                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  required
                  placeholder="Describe the main responsibilities and daily tasks..."
                  className="min-h-40 w-full resize-y rounded-lg border border-[#D6D4CE] bg-white px-4 py-3 text-sm text-[#25262B] shadow-none placeholder:text-[#A5A39C] focus-visible:border-[#777980] focus-visible:ring-2 focus-visible:ring-[#777980]/15 dark:border-[#414249] dark:bg-[#222329] dark:text-[#EAE7DE] dark:placeholder:text-[#777980]"
                />

                <p className="text-xs text-[#92939A]">
                  Explain what the selected candidate will be responsible for.
                </p>
              </div>

              <div className={fieldWrapper}>
                <FieldLabel htmlFor="qualifications" required>
                  Qualifications & Requirements
                </FieldLabel>

                <Textarea
                  id="qualifications"
                  name="qualifications"
                  required
                  placeholder="Mention required skills, experience and educational qualifications..."
                  className="min-h-40 w-full resize-y rounded-lg border border-[#D6D4CE] bg-white px-4 py-3 text-sm text-[#25262B] shadow-none placeholder:text-[#A5A39C] focus-visible:border-[#777980] focus-visible:ring-2 focus-visible:ring-[#777980]/15 dark:border-[#414249] dark:bg-[#222329] dark:text-[#EAE7DE] dark:placeholder:text-[#777980]"
                />

                <p className="text-xs text-[#92939A]">
                  List the skills and experience required for this position.
                </p>
              </div>
            </div>
          </section>

          {/* Submit Section */}
          <section className="flex flex-col gap-5 rounded-xl border border-[#D6D4CE] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6 dark:border-[#383A40] dark:bg-[#202126]">
            <div>
              <p className="font-[family-name:var(--font-manrope)] text-base font-bold">
                Ready to publish your job?
              </p>

              <p className="mt-1 text-xs text-[#92939A]">
                Review your information before submitting.
              </p>
            </div>

            <Button
              type="submit"
              className="group h-12 w-full gap-3 rounded-lg bg-[#25262B] px-8 font-[family-name:var(--font-space-mono)] text-xs font-bold tracking-wide text-[#EAE7DE] shadow-none transition-all hover:-translate-y-0.5 hover:bg-[#44464D] sm:w-auto dark:bg-[#E5E2D9] dark:text-[#202126] dark:hover:bg-white"
            >
              PUBLISH JOB
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </section>
        </form>
      </div>
    </main>
  )
}
