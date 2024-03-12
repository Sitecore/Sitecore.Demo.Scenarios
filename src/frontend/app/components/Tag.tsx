import Image from 'next/image';

type TagProps = {
  label: string;
  iconUrl?: string;
};

export default function Tag({ label, iconUrl }: TagProps) {
  return (
    <div className="flex flex-row gap-[0.375rem] items-center rounded-full bg-white-darkest px-4 py-[0.375rem]">
      {iconUrl && <Image src={iconUrl} alt={label} height={16} width={16} unoptimized />}
      <span className="text-sm">{label}</span>
    </div>
  );
}
