import { Hono, Context } from "hono"; // Assuming Context is imported from hono
import supabase from "./db";

const app = new Hono();

app.get("/", (c: Context) => {
  return c.redirect("https://dhairyashah.dev");
});

app.get("/:slug", async (c: Context) => {
  const slug: string = c.req.param("slug");
  const res: any = await supabase
    .from("portfolio")
    .select("url, views")
    .eq("slug", slug);

  if (res.data && res.data.length > 0) {
    const redirectUrl: string = res.data[0].url;
    // update the view count
    await supabase
      .from("portfolio")
      .update({ views: res.data[0].views + 1 })
      .eq("slug", slug);

    console.log(res.data[0]);
    return c.redirect(redirectUrl);
  } else {
    return c.text("Not Found", 404);
  }
});

export default app;
