'use client';

import Link from 'next/link';
import Image from 'next/image';

type ErrorCardProps = {
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
  title: string;
  subtitle: string;
  button: {
    text: string;
    href: string;
    target?: '_blank';
  };
};

export default function ErrorCard({ image, title, subtitle, button }: ErrorCardProps) {
  return (
    <div className="grid-container h-full flex justify-center items-center pb-6">
      <div
        className={`flex flex-col items-center text-center max-w-[50rem] ${!!image ? 'p-16' : 'px-16 py-20'} rounded-lg bg-white shadow-card-large`}
      >
        {!!image && (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={`${image.className} mb-16`}
            priority
            unoptimized
          />
        )}
        <h2 className="text-2xl leading-normal font-bold md:text-3xl md:leading-normal">{title}</h2>
        <p className="text-xl">{subtitle}</p>
        <Link className="button mt-6" href={button.href} target={button.target || '_self'}>
          {button.text}
        </Link>
      </div>
    </div>
  );
}
