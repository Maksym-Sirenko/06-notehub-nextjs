// app/components/NoteItem/NoteItem.tsx

import { Note } from '@/types/note';
import Link from 'next/link';
import styles from './NoteItem.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li>
      <Link href={`/notes/${item.id}`}>{item.title}</Link>
    </li>
  );
};

export default NoteItem;
