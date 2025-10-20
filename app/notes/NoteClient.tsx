'use client';

import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from '@/components/Modal/Modal';
import { fetchNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import css from './NoteClient.module.css';

interface Props {
  initialSearch?: string;
  initialPage?: number;
}

export default function NotesClient({
  initialSearch = '',
  initialPage = 1,
}: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== initialSearch) {
        setPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, initialSearch]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: (previousData) => previousData,
  });

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['notes'] });
  };

  if (isLoading) return <p>Loading notes...</p>;
  if (isError || !data) return <p>Could not fetch the list of notes.</p>;

  return (
    <section className={css.section}>
      <div className={css.header}>
        <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
        <button
          className={css.createButton}
          onClick={() => setIsModalOpen(true)}
        >
          Create Note
        </button>
      </div>

      {data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          setCurrentPage={setPage}
        />
      )}

      {data.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onClose={() => setIsModalOpen(false)}
            onSuccess={handleCreateSuccess}
          />
        </Modal>
      )}
    </section>
  );
}
