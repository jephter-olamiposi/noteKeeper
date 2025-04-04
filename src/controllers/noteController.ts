import { Request, Response } from "express";
import * as noteService from "../services/noteService";

export const create = async (req: Request, res: Response) => {
  try {
    const note = await noteService.createNote(req.user!.id, req.body);
    res.status(201).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create note" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const notes = await noteService.getNotesByUser(req.user!.id);
    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const note = await noteService.getNoteById(
      req.user!.id,
      Number(req.params.id)
    );

    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch note" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update note" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await noteService.deleteNote(req.user!.id, Number(req.params.id));
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete note" });
  }
};
