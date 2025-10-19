import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '@/app/types/note';
import { useState } from 'react';
import { deleteNote } from '@/app/lib/api';
import css from './NoteList.module.css';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onMutate: (id: number) => {
      setDeletingId(id);
    },
    onSettled: () => setDeletingId(null),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              aria-label={`Delete note ${note.title}`}
              onClick={() => handleDelete(note.id)}
            >
              {deletingId === note.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
