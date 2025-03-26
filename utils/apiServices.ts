"use server";

import { apiUrl } from "./helper";
import { protectedApi } from "./protectedApi";

export const fetchData = async (url: string) => {
  const mainUrl = `${apiUrl}/${url}`;
  try {
    const response = await fetch(mainUrl);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    const data: any = await response.json();

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export async function postData(endpoint: string, values: any) {
  const url = `${endpoint}`;

  return protectedApi(url, {
    method: "POST",
    body: JSON.stringify(values),
  });
}

export async function patchData(endpoint: string, id: string, values: any) {
  const url = `${endpoint}/${id}`;

  return await protectedApi(url, {
    method: "PATCH",
    body: JSON.stringify(values),
  });
}

export async function deleteDataById(endpoint: string, id: string) {
  const url = `${endpoint}/${id}`;

  return protectedApi(url, {
    method: "DELETE",
  });
}

export async function formPost(endpoint: string, formData: FormData) {
  const url = `${endpoint}`;

  return await protectedApi(url, {
    method: "POST",
    body: formData,
  });
}

export async function fetchProtectedData(endpoint: string) {
  const url = `${endpoint}`;
  return await protectedApi(url);
}
