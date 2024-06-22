import supabase from "./supabase";

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    // throw new Error(error.message);
    console.error(error);
  }
  console.log(1, data);
  return data;
}
