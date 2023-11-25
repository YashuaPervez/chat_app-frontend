import { cookies } from "next/headers";

//
import { generateUrl } from "@/utils/string";

const requestServer = (
  input: string,
  init?: RequestInit & { addAuth?: boolean }
): Promise<Response> => {
  const fetchUrl = generateUrl(input);

  const cookiesStore = cookies();
  const token = cookiesStore.get("token")!.value;

  return fetch(
    fetchUrl,
    init && {
      ...init,
      headers: {
        ...init.headers,
        ...(init.addAuth ? { Cookie: `token=${token}` } : {}),
      },
    }
  );
};

export default requestServer;
