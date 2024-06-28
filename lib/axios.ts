import axios from "axios";
const baseURL = process.env.NEXT_API_URL;

export async function axiosRequest(
  method: string,
  path: string,
  body = {},
  accessToken?: string,
  refreshToken?: string
) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken || ""}`,
    "x-refresh": `${refreshToken || ""}`,
  };

  const response = await axios({
    method: method,
    url: baseURL + path,
    headers: headers,
    data: body,
  });

  return response;
}
