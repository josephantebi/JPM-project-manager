import supabase from "../PrivateFiles/supabase";

export async function getUsers() {
  let { data, error } = await supabase.from("users").select("*").order("id");
  if (error) {
    console.error(error);
    throw new Error("Data could not be loaded");
  }

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

export async function editUser(editedUser, id) {
  const { data, error } = await supabase
    .from("users")
    .update(editedUser)
    .match({ id: id });
  // .eq("id", id)

  if (error) {
    console.error(error);
    throw new Error("User could not be edited");
  }

  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from("users").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
  return data;
}
