// app/notes/page.tsx
import { QueryClient, dehydrate } from '@tanstack/react-query';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import NotesClient from './NoteClient';
import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => fetchNotes({ search: '', page: 1 }),
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydrated}>
      <NotesClient />
    </TanStackProvider>
  );
}
