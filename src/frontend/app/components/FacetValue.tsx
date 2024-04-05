import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacetChangedPayload, RemoveFilterPayload } from '@sitecore-search/react';

type FacetValueProps = {
  facetId: string;
  facetValueId: string;
  facetValueLabel: string;
  type: 'valueId' | 'text';
  facetIndex?: number;
  facetValueIndex?: number;
  isSelected?: boolean;
  showRemoveIcon?: boolean;
  onFacetValueClick?: (payload: FacetChangedPayload) => void;
  onRemoveIconClick?: (payload: RemoveFilterPayload) => void;
};

export default function FacetValue({
  facetId,
  facetValueId,
  facetValueLabel,
  type,
  facetIndex = -1,
  facetValueIndex = -1,
  isSelected = false,
  showRemoveIcon = false,
  onFacetValueClick = () => null,
  onRemoveIconClick = () => null,
}: FacetValueProps) {
  return (
    <div
      className={`flex flex-row gap-2 items-center rounded-full px-4 py-[0.375rem] ${showRemoveIcon ? 'border border-gray-lightest' : 'cursor-pointer'} ${isSelected ? 'bg-violet-dark text-white' : 'bg-white-darkest'} transition-colors`}
    >
      <span
        onClick={() =>
          onFacetValueClick({
            facetId,
            facetValueId,
            type,
            facetIndex,
            facetValueIndex,
            checked: !isSelected,
          })
        }
        className="text-base"
      >
        {facetValueLabel}
      </span>
      {showRemoveIcon && (
        <button
          className="cursor-pointer"
          onClick={() => onRemoveIconClick({ facetId, facetValueId, type })}
        >
          <FontAwesomeIcon className="h-4 w-4 align-middle" icon={faRemove} />
        </button>
      )}
    </div>
  );
}
