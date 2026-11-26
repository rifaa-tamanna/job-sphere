
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

  // Create Job
export const createJob = async (
  data: Record<string, FormDataEntryValue | boolean>
) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Failed to create job")
  }

  return result
}


// Delete Job
export const deleteJob = async (id: string) => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`, {
    method: "DELETE",
  })

  const result = await res.json()

  if (!res.ok) {
    throw new Error(result.message || "Failed to delete job")
  }

  return result
}
