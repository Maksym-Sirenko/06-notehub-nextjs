// export default function Loading() {
//   return <p>Loading, please wait...</p>;
// }

const Loading = () => {
  return (
    <div
      style={{
        padding: '50px',
        textAlign: 'center',
        fontSize: '18px',
        color: '#666',
      }}
    >
      🔄 Loading, please wait...
    </div>
  );
};

export default Loading;
