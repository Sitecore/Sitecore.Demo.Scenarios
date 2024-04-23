import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type NotificationCardProps = {
  title: string;
  subtitle: JSX.Element;
  onRemoveIconClick: () => void;
};

export default function NotificationCard({
  title,
  subtitle,
  onRemoveIconClick,
}: NotificationCardProps) {
  return (
    <section className="absolute top-6 right-6 notification-card animate-[bounceDown_2s_ease-out_1]">
      <h3 className="font-bold text-xl">{title}</h3>
      {subtitle}
      <FontAwesomeIcon
        className="h-4 w-4 align-middle absolute top-3 right-3 cursor-pointer"
        icon={faRemove}
        onClick={onRemoveIconClick}
      />
    </section>
  );
}
