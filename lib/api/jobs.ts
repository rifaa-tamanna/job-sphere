const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Get all jobs
export const getJobs = async () => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch jobs")
  }

  return res.json()
}

// Update job
export const updateJob = async (
  id: string,
  updatedData: Record<string, unknown>
) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to update job")
  }

  return data
}

// Create a new job
export const createJob = async (jobData: Record<string, unknown>) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to create job")
  }

  return data
}
