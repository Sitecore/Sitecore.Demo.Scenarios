import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="main-grid-layout-vivid w-full flex flex-col justify-between">
      <div className="grid-container rich-text">
        <h2 className="font-bold text-5xl mt-8 mb-6 max-w-3xl">
          Oops! Looks like you've wandered off the digital path.
        </h2>
        <p className="text-2xl max-w-3xl">
          The scenario you're looking for seems to have taken a detour. But fear not! There's plenty
          more to explore.
        </p>
        <Link className="button" href="/">
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
