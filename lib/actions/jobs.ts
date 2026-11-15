
const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

export const createJob = async (data: Record<string, FormDataEntryValue | boolean>) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return res.json()
}