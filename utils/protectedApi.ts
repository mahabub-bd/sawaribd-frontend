import { refreshToken } from "@/actions/auth";
import { deleteSession, getSession } from "@/lib/session";
import { apiUrl } from "./helper";

export async function protectedApi(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  let session = await getSession();
  let accessToken = session?.accessToken;

  const headers: Record<string, string> = {
    ...(options.headers ? (options.headers as Record<string, string>) : {}),
    Authorization: `Bearer ${accessToken ?? ""}`,
    Accept: "application/json",
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const makeRequest = async () =>
    fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      headers,
    });

  let response = await makeRequest();

  if (response.status === 401) {
    try {
      console.log("Access token expired. Refreshing...");
      const newAccessToken = await refreshToken();
      headers.Authorization = `Bearer ${newAccessToken}`;
      session = await getSession();
      response = await makeRequest();
    } catch (refreshError) {
      await deleteSession();
      throw new Error("Session expired. Please sign in again.");
    }
  } else if (response.status === 403) {
    const errorMessage = "You do not have the necessary permissions";

    throw new Error(errorMessage);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }

  const data: any = await response.json();
  console.log({ data });

  return data;
}
