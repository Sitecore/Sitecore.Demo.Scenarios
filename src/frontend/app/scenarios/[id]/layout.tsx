import NavBar from '@/app/components/NavBar';

export default function ScenarioDetailsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar noPageChange />
      {children}
    </>
  );
}
