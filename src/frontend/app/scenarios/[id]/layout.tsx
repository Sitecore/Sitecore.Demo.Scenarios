import NavBar from '@/app/components/NavBar';

export default function ScenarioDetailsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar noPageChange />
      {children}
    </>
  );
}
