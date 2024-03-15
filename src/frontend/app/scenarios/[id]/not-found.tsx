import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="main-grid-layout w-full flex flex-col justify-between">
      <div className="flex flex-col max-w-4xl ml-64">
        <h2 className="font-bold text-5xl text-black-light mt-8 mb-6">
          Oops! Looks like you've wandered off the digital path.
        </h2>
        <p className="text-2xl text-black-light">
          The scenario you're looking for seems to have taken a detour. But fear not! There's plenty
          more to explore.
        </p>
        <Link className="text-lg text-white mt-8 py-4 px-10 rounded-full bg-violet w-fit" href="/">
          Browse all
        </Link>
      </div>
      <Image
        src="/undraw_road_sign_re_3kc3.svg"
        alt="No scenario found logo"
        width={760}
        height={525}
        unoptimized
      />
    </div>
  );
}
