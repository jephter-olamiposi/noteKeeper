import db from "../config/db";
import { NoteInput } from "../utils/noteValidators";

export const createNote = async (userId: number, data: NoteInput) => {
  const [note] = await db("note")
    .insert({ ...data, user_id: userId })
    .returning(["note_id", "title", "contents", "created_at", "updated_at"]);

  return note;
};

export const getNotesByUser = async (userId: number) => {
  return await db("note")
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
};

export const getNoteById = async (userId: number, noteId: number) => {
  return await db("note").where({ user_id: userId, note_id: noteId }).first();
};

export const updateNote = async (
  userId: number,
  noteId: number,
  updates: Partial<NoteInput>
): Promise<number> => {
  const result = await db("note")
    .where({ user_id: userId, note_id: noteId })
    .update({ ...updates, updated_at: db.fn.now() });

  return result;
};

export const deleteNote = async (userId: number, noteId: number) => {
  await db("note").where({ user_id: userId, note_id: noteId }).del();
};
