import { createClient } from "@/utils/supabase/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const supabase = createClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    // Handle GET request
    await supabase.auth.exchangeCodeForSession("code");
    res.status(200).json({ message: "Hello from the API!" });
  } else {
    // Handle other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// export const GET = async ({ url, locals: { supabase } }) => {
// 	const code = url.searchParams.get('code');

// 	if (code) {
// 		await supabase.auth.exchangeCodeForSession(code);
// 	}

// 	throw redirect(303, '/account');
// };
