import { Request, Response } from "express";
import * as noteService from "../services/noteService";

// POST /api/notes
export const create = async (req: Request, res: Response) => {
  const note = await noteService.createNote(req.user!.id, req.body);
  res.status(201).json({ note });
};

// GET /api/notes
export const getAll = async (req: Request, res: Response) => {
  const notes = await noteService.getNotesByUser(req.user!.id);
  res.status(200).json({ notes });
};

// GET /api/notes/:id
export const getOne = async (req: Request, res: Response) => {
  const note = await noteService.getNoteById(
    req.user!.id,
    Number(req.params.id)
  );

  if (!note) {
    res.status(404).json({ message: "Note not found" });
    return;
  }

  res.status(200).json({ note });
};

// PUT /api/notes/:id
export const update = async (req: Request, res: Response) => {
  const updatedCount = await noteService.updateNote(
    req.user!.id,
    Number(req.params.id),
    req.body
  );

  if (updatedCount === 0) {
    res.status(404).json({ message: "Note not found or not owned by user" });
    return;
  }

  res.status(200).json({ message: "Note updated successfully" });
};

// DELETE /api/notes/:id
export const remove = async (req: Request, res: Response) => {
  await noteService.deleteNote(req.user!.id, Number(req.params.id));
  res.status(200).json({ message: "Note deleted successfully" });
};
