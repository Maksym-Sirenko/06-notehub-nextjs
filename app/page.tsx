// app/page.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Main page',
};

const MainPage = () => {
  return (
    <>
      <h1>Welcome to Main page</h1>
      <div>Main page</div>
    </>
  );
};

export default MainPage;
