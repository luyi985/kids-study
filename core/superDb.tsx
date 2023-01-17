import { createClient } from "@supabase/supabase-js";

export const initSuperDb = () => {
  try {
    const { SUPER_API_KEY, SUPER_API_URL } = JSON.parse(
      atob(process.env.SUPER_CONF as string)
    );
    const supabase = createClient(SUPER_API_URL, SUPER_API_KEY, {
      db: {
        schema: "public",
      },
    });
    return supabase;
  } catch (e) {
    console.error(e);
  }
};
