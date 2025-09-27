import type { APIRoute } from "astro";
import { supabase } from "../../../utils/database";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const mobile = formData.get("mobile")?.toString();
  if (!mobile) {
    return new Response("Mobile number is required", { status: 400 });
  }

  if (supabase) {
    const { data: framework } = await supabase
      .from("frameworks")
      .select("*")
      .eq("mobile", mobile)
      .single();

    if (!framework) {
      return new Response(`Where'd that pet go?`, { status: 404 });
    }
    return redirect(`/frameworks/${framework.id}`, 303);
  }

  return new Response("No supabase url provided", { status: 400 });
};
