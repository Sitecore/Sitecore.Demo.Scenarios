import { FacetChangedPayload } from '@sitecore-search/react';

type FacetValueProps = {
  facetId: string;
  facetValueLabel: string;
  facetIndex?: number;
  facetValueId?: string;
  facetValueIndex?: number;
  isSelected?: boolean;
  onFacetValueClick?: (payload: FacetChangedPayload) => void;
};

export default function FacetValue({
  facetId,
  facetValueLabel,
  facetIndex = -1,
  facetValueId = '',
  facetValueIndex = -1,
  isSelected = false,
  onFacetValueClick = () => null,
}: FacetValueProps) {
  return (
    <div
      className={`rounded-full bg-white-darkest px-4 py-[0.375rem] cursor-pointer ${isSelected && 'bg-violet-dark text-white'}`}
      onClick={() =>
        onFacetValueClick({
          facetId,
          facetIndex,
          facetValueId,
          facetValueIndex,
          type: 'valueId',
          checked: !isSelected,
        })
      }
    >
      <span className="text-base">{facetValueLabel}</span>
    </div>
  );
}
