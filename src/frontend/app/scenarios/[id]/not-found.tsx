import Link from "next/link";

export default function NotFound() {
  return (
    <div className="scenario-not-found">
      <h2>Not Found</h2>
      <p>Could not find the requested scenario. Are you sure it exists?</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
