import { useState } from 'react';

export type IntroScreenFacetClickedPayload = {
  facetId: string;
  facetValueId: string;
  facetValueLabel: string;
  isSelected: boolean;
};

type FacetValueProps = {
  facetId: string;
  facetValueId: string;
  facetValueLabel: string;
  onFacetValueClick?: (payload: IntroScreenFacetClickedPayload) => void;
};

export default function IntroScreenFacet({
  facetId,
  facetValueId,
  facetValueLabel,
  onFacetValueClick = () => null,
}: FacetValueProps) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      className={`flex flex-row gap-2 items-center rounded-full px-4 py-[0.375rem] ${isSelected ? 'bg-violet-dark text-white' : 'bg-white-darkest '} transition-colors`}
      onClick={() => {
        setIsSelected(!isSelected);
        onFacetValueClick({
          facetId,
          facetValueId,
          facetValueLabel: facetValueLabel,
          isSelected: !isSelected,
        });
      }}
    >
      {facetValueLabel}
    </button>
  );
}
