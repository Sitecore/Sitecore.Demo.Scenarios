import Link from 'next/link';

type CTABannerProps = {
  title: string;
  subtitle: string;
  button: {
    text: string;
    href: string;
    target?: '_blank';
    onClick?: () => void;
  };
};

export default function CTABanner({ title, subtitle, button }: CTABannerProps) {
  return (
    <div className="relative w-full flex justify-center items-center rounded-lg bg-violet-dark overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-logo-composition-80 mix-blend-multiply bg-center bg-no-repeat bg-cover z-10"></div>
      <div className="relative flex flex-wrap gap-4 items-center w-full p-10 text-white z-20">
        <div className="mr-auto">
          <h2 className="text-xl leading-normal font-bold md:text-2xl md:leading-normal">
            {title}
          </h2>
          <p className="text-lg">{subtitle}</p>
        </div>
        <Link
          className="button"
          href={button.href}
          target={button.target || '_self'}
          onClick={button.onClick}
        >
          {button.text}
        </Link>
      </div>
    </div>
  );
}
