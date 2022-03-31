import { Request, Response } from "express";
import fs from "fs";

const storagePath = process.env.STORAGE_PATH || "/app/uploads";

function respondWithFileNotFound(res: Response): void {
  res.status(404).json({ message: "file_not_found" });
}

function respondWithFile(filename: string, res: Response): void {
  if (!filename || !storagePath) {
    respondWithFileNotFound(res);
  }
  try {
    const readStream = fs.createReadStream(`${storagePath}/${filename}`);
    readStream.pipe(res);
  } catch {
    respondWithFileNotFound(res);
  }
}

export async function deleteOne(req: Request, res: Response) {
  try {
    fs.rmSync(`${storagePath}/${req.params.filename}`);
  } catch {}
  res.status(204).send();
}

export async function readOne(req: Request, res: Response) {
  respondWithFile(req.params.filename, res);
}

export async function create(req: Request, res: Response) {
  if (req.file) {
    res.json({
      filename: req.file.filename,
      uri: `/api/files/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: "missing_file" });
  }
}
