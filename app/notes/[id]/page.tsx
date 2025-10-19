// app/notes/[id]/page.tsx
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import TanStackProvider from '@/app/components/TanStackProvider/TanStackProvider';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails/NoteDetails.client';
import { fetchNoteById } from '@/app/lib/api';

type Props = { params: { id: string } };

export default async function NoteDetailsPage({ params }: Props) {
  const id = Number(params.id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydrated = dehydrate(queryClient) as DehydratedState;

  return (
    <TanStackProvider dehydratedState={dehydrated}>
      <NoteDetailsClient noteId={id} />
    </TanStackProvider>
  );
}
