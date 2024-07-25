import supabase from "./supabase.js";

export async function getCabins() {
    const {data, error} = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded.");
    }

    return data;
}

export async function createCabin(newCabin) {
    const {data, error} = await supabase
        .from('cabins')
        .insert([newCabin]); // Remove the curly braces around newCabin

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be created.");
    }

    return data;
}

export async function deleteCabin(id) {
    const {error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted.");
    }
}
