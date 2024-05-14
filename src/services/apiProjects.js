import supabase from "./supabase";

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

export async function getProjectsByOrganization(organization) {
  let { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("organization", organization)
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Data could not be loaded");
  }

  return data;
}

export async function getProjectsByPostedBy(posted_by) {
  let { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("posted_by", posted_by)
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Data could not be loaded");
  }

  return data;
}

export async function createProject(newProject) {
  const { data, error } = await supabase.from("projects").insert([newProject]);
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
    .match({ id: id })
    .select();
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
