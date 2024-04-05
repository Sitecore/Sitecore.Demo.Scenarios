import { useEffect, useState } from 'react';
import { FacetChoiceChangedPayload, SearchResponseFacet } from '@sitecore-search/react';
import type { SearchResultsStoreSelectedFacet } from '@sitecore-search/widgets';
import type { FacetPayloadType } from '@sitecore-search/models';

import FacetValue from './FacetValue';

type FacetValueGrid = {
  facet: SearchResponseFacet;
  facetIndex: number;
  selectedFacets: (SearchResultsStoreSelectedFacet & { type: FacetPayloadType })[];
  onFacetValueClick: (payload: FacetChoiceChangedPayload) => void;
};

export default function FacetValueGrid({
  facet,
  facetIndex,
  selectedFacets,
  onFacetValueClick,
}: FacetValueGrid) {
  const limit = 5;
  const [showAll, setShowAll] = useState(false);
  const [visibleFacetValues, setVisibleFacetValues] = useState(facet.value.slice(0, limit));

  useEffect(() => {
    if (showAll) {
      setVisibleFacetValues(facet.value);
    }
  }, [facet.value, showAll]);

  return (
    <div key={facet.label}>
      <h3 className="text-base font-bold mb-3 uppercase">{facet.label}</h3>
      <div className="flex flex-row flex-wrap gap-2 mb-8">
        {visibleFacetValues.map((value, facetValueIndex) => (
          <FacetValue
            key={value.id}
            facetId={facet.name}
            facetValueId={value.id}
            type="valueId"
            facetIndex={facetIndex}
            facetValueIndex={facetValueIndex}
            facetValueLabel={value.text}
            isSelected={selectedFacets.map((facet) => facet.valueLabel).includes(value.text)}
            onFacetValueClick={onFacetValueClick}
          />
        ))}
        {!showAll && facet.value.length > limit && (
          <div
            className="text-sm content-center ml-3 cursor-pointer"
            onClick={() => setShowAll(true)}
          >{`+ ${facet.value.length - limit} more`}</div>
        )}
      </div>
    </div>
  );
}
