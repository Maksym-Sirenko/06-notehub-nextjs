// lib/api.ts
import axios from 'axios';
import type { Note } from '@/app/types/note';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const PER_PAGE = 12;

const NoteService = axios.create({
  baseURL: 'https://notehub-public.goit.study/api/notes',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  search = '',
  page = 1,
  perPage = PER_PAGE,
}: {
  search?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<FetchNotesResponse> => {
  const { data } = await axios.get(
    'https://notehub-public.goit.study/api/notes',
    {
      params: { search, page, perPage },
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );
  return data;
};

export const createNote = async (newNote: {
  title: string;
  content: string;
  tag: string;
}) => {
  const { data } = await NoteService.post('', newNote);
  return data as Note;
};

export const deleteNote = async (noteId: number) => {
  const { data } = await NoteService.delete(`/${noteId}`);
  return data as Note;
};

export const fetchNoteById = async (noteId: number): Promise<Note> => {
  const { data } = await axios.get(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    },
  );
  return data;
};

export const getNotes = fetchNotes;
export const getSingleNote = fetchNoteById;
