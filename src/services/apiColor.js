import supabase from "./supabase";

export default async function getColors() {
  const { data, error } = await supabase
    .from("color_list")
    .select("*")
    .eq("available", true)
    .order("id");
  if (error) {
    console.error(error);
    throw new Error("Data could not be loaded");
  }

  return data;
}
