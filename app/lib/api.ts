export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    cache: options?.cache || "no-store",
  });

  if (!res.ok) {
    let errorMessage = `Failed to fetch data from ${endpoint} (Status: ${res.status})`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      console.error("Error parsing API error response:", e);
    }

    console.error(`API Error - ${endpoint}:`, errorMessage);
    throw new Error(errorMessage);
  }

  return res.json();
}

export function getImageUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${process.env.NEXT_PUBLIC_API_ROOT}${path}`;
}

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
}
