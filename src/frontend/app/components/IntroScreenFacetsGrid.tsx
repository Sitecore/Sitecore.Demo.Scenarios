import { SearchResponseFacet } from '@sitecore-search/react';
import { useEffect, useState } from 'react';
import IntroScreenFacet, { IntroScreenFacetClickedPayload } from './IntroScreenFacet';

type IntroScreenFacetsGridProps = {
  facet: SearchResponseFacet;
  onFacetValueClick: (payload: IntroScreenFacetClickedPayload) => void;
};

export default function IntroScreenFacetsGrid({
  facet,
  onFacetValueClick,
}: IntroScreenFacetsGridProps) {
  const limit = 5;
  const [showAll, setShowAll] = useState(false);
  const [visibleFacetValues, setVisibleFacetValues] = useState(facet.value.slice(0, limit));

  useEffect(() => {
    if (showAll) {
      setVisibleFacetValues(facet.value);
    }
  }, [facet.value, showAll]);

  return (
    <div key={facet.label} className="flex-1">
      <p className="font-bold uppercase tracking-wider mb-3">{facet.label}</p>
      <div className="flex flex-row flex-wrap gap-2 justify-center">
        {visibleFacetValues.map((value) => (
          <IntroScreenFacet
            key={value.id}
            facetId={facet.name}
            facetValueId={value.id}
            facetValueLabel={value.text}
            onFacetValueClick={onFacetValueClick}
          />
        ))}
        {!showAll && facet.value.length > limit && (
          <button
            className="px-1"
            onClick={() => setShowAll(true)}
          >{`+ ${facet.value.length - limit} more`}</button>
        )}
      </div>
    </div>
  );
}
