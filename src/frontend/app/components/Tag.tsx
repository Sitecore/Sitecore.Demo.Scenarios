import Image from 'next/image';

type TagProps = {
  label: string;
  iconUrl?: string;
};

export default function Tag({ label, iconUrl }: TagProps) {
  return (
    <div className="flex flex-row gap-1 items-center rounded-[20px] bg-white-darkest px-4 py-2 2xl:h-8">
      {iconUrl && <Image src={iconUrl} alt={label} height={14} width={14} unoptimized />}
      <span className="text-black-light text-sm">{label}</span>
    </div>
  );
}
