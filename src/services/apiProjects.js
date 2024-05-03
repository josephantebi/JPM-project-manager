import supabase from "../PrivateFiles/supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("id");
  if (error) {
    console.error(error);
    throw new Error("Data could not be loaded");
  }

  return data;
}

export async function createProject(newProject) {
  const { data, error } = await supabase
    .from("projects")
    .insert([newProject])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Project could not be created");
  }

  return data;
}

export async function editProject(editedProject, id) {
  const { data, error } = await supabase
    .from("projects")
    .update(editedProject)
    .match({ id: id });
  // .eq("id", id)

  if (error) {
    console.error(error);
    throw new Error("Project could not be edited");
  }

  return data;
}

export async function deleteProject(id) {
  const { data, error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Project could not be deleted");
  }
  return data;
}
