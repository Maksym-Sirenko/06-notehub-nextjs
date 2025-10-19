// app/notes/Notes.client.tsx

'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SearchBox from '@/app/components/SearchBox/SearchBox';
import NoteList from '@/app/components/NoteList/NoteList';
import Pagination from '@/app/components/Pagination/Pagination';
import type { FetchNotesResponse } from '@/app/lib/api';

import { fetchNotes } from '@/app/lib/api';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes({ search, page }),
    placeholderData: () =>
      queryClient.getQueryData(['notes', '', 1]) as
        | FetchNotesResponse
        | undefined,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Could not fetch the list of notes.</p>;

  return (
    <section>
      <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
      {data && data.notes && <NoteList notes={data.notes} />}
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          setCurrentPage={setPage}
        />
      )}
    </section>
  );
}
