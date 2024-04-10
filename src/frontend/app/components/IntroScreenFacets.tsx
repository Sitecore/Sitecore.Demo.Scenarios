'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  SearchResultsWidgetQuery,
  WidgetDataType,
  useSearchResults,
  widget,
} from '@sitecore-search/react';
import { ContentItemModel, InitialState } from './BrowseScreenSearchWidget';
import IntroScreenFacetsGrid from './IntroScreenFacetsGrid';
import { IntroScreenFacetClickedPayload } from './IntroScreenFacet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function IntroScreenFacets({
  onSelectedFacetsChange,
}: {
  onSelectedFacetsChange: (queryString: string) => void;
}) {
  const {
    queryResult: { isLoading, data: { facet: facets = [] } = {} },
  } = useSearchResults<ContentItemModel, InitialState>({
    query: (query: SearchResultsWidgetQuery) => {
      query.getRequest().setSearchSuggestion([{ name: 'content_name_context_aware', max: 4 }]);
    },
    state: {
      page: 1,
      itemsPerPage: 9,
      keyphrase: '',
    },
  });

  const [selectedFacets, setSelectedFacets] = useState<Record<string, string[]>>({});

  const handleFacetValueClick = useCallback((payload: IntroScreenFacetClickedPayload) => {
    setSelectedFacets((prevSelectedFacets) => {
      const updatedFacets = { ...prevSelectedFacets };
      const facetValueLabels = updatedFacets[payload.facetId] || [];

      if (payload.isSelected) {
        updatedFacets[payload.facetId] = [...facetValueLabels, payload.facetValueLabel];
      } else {
        updatedFacets[payload.facetId] = facetValueLabels.filter(
          (label) => label !== payload.facetValueLabel
        );
      }

      return updatedFacets;
    });
  }, []);

  const queryString = useMemo(() => {
    const queryString = Object.entries(selectedFacets)
      .map(
        ([facetId, facetValueLabels]) =>
          `${facetId}=${facetValueLabels.map((label) => label.toLowerCase()).join(',')}`
      )
      .join('&');

    return queryString ? `?${queryString}` : '/';
  }, [selectedFacets]);

  useEffect(() => {
    onSelectedFacetsChange(queryString);
  }, [onSelectedFacetsChange, queryString]);

  const filterArray = useMemo(() => ['products', 'templates', 'categories'], []);

  if (isLoading)
    return (
      <p className="my-auto text-2xl text-violet animate-spin">
        <FontAwesomeIcon icon={faSpinner} />
      </p>
    );

  return (
    <div className="flex gap-8 my-auto transition-all duration-300 fold-down">
      {facets
        .filter((facet) => filterArray.includes(facet.name.toLowerCase()))
        .sort(
          (a, b) =>
            filterArray.indexOf(a.name.toLowerCase()) - filterArray.indexOf(b.name.toLowerCase())
        )
        .map((facet) => (
          <IntroScreenFacetsGrid
            key={facet.label}
            facet={facet}
            onFacetValueClick={handleFacetValueClick}
          />
        ))}
    </div>
  );
}
const IntroScreenFacetsWidget = widget(IntroScreenFacets, WidgetDataType.SEARCH_RESULTS, 'content');

export default IntroScreenFacetsWidget;
