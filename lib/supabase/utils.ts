import { createClient } from "./server";

export const getUserId = async () => {
  const supabase = createClient();

  const user_id = await supabase.auth
    .getUser()
    .then((user) => user.data?.user?.id);

  return user_id;
};
