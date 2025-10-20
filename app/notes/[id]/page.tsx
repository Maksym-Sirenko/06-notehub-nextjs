// app/notes/[id]/page.tsx
import { QueryClient, dehydrate } from '@tanstack/react-query';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

type Props = { params: Promise<{ id: string }> };

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const noteId = id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydrated = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydrated}>
      <NoteDetailsClient noteId={noteId} />
    </TanStackProvider>
  );
}
