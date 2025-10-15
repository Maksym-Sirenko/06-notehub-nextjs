import { Note } from '@/lib/api';
import styles from './NoteItem.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{item.title}</p>
    </div>
  );
};

export default NoteItem;
