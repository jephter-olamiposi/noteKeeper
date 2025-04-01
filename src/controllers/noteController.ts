import { Request, Response } from "express";
import * as noteService from "../services/noteService";
import { noteSchema } from "../utils/noteValidators";

export const create = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  const parsed = noteSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const note = await noteService.createNote(userId, parsed.data);
    res.status(201).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create note" });
  }
};

export const getAll = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const notes = await noteService.getNotesByUser(userId);
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

export const getOne = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  const noteId = Number(req.params.id);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const note = await noteService.getNoteById(userId, noteId);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ message: "Error fetching note" });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  const noteId = Number(req.params.id);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const updatedCount = await noteService.updateNote(userId, noteId, req.body);

    if (updatedCount === 0) {
      return res
        .status(404)
        .json({ message: "Note not found or not owned by user" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update note" });
  }
};

export const remove = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  const noteId = Number(req.params.id);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    await noteService.deleteNote(userId, noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
};
