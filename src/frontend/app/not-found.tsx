import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="main-grid-layout-vivid w-full flex flex-col justify-between">
      <div className="grid-container">
        <h1 className="text-4xl leading-normal font-bold max-w-[44rem] mb-3 md:text-5xl md:leading-normal">
          Oops! Looks like you&apos;ve wandered off the digital path.
        </h1>
        <p className="text-2xl leading-normal max-w-[44rem]">
          The scenario you&apos;re looking for seems to have taken a detour. But fear not!
          There&apos;s plenty more to explore.
        </p>
        <Link className="button mt-10" href="/">
          Browse all
        </Link>
      </div>
      <div className="overflow-hidden pt-8">
        <Image
          src="/undraw_road_sign_re_3kc3.svg"
          alt="No scenario found logo"
          className="max-h-full w-auto"
          width={760}
          height={525}
          unoptimized
        />
      </div>
    </div>
  );
}
