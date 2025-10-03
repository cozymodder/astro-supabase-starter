import type { APIRoute } from "astro";
import { supabase } from "../../../utils/database";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString().toLowerCase();
  const mobile = formData.get("mobile")?.toString();
  if (!name) {
    return redirect(`/missing`, 303);
  }
    if (!mobile) {
    return redirect(`/missing`, 303);
  }

  if (supabase) {
    const { data: framework } = await supabase
      .from("frameworks")
      .select("*")
	  .eq("name", name)
      .eq("mobile", mobile)
      .single();

    if (!framework) {
      return new Response("身份證英文全名/電話號碼未有登記紀錄。", { status: 404 });
    }
    return redirect(`/frameworks/${framework.id}`, 303);
  }

  return new Response("No supabase url provided", { status: 400 });
};
