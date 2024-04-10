'use client';

import React, { useCallback, useEffect, KeyboardEvent } from 'react';
import {
  FacetChoiceChangedPayload,
  RemoveFilterPayload,
  SearchResultsInitialState,
  SearchResultsStoreState,
  SearchResultsWidgetQuery,
  WidgetDataType,
  useSearchResults,
  useSearchResultsSelectedFilters,
  widget,
} from '@sitecore-search/react';
import type { SearchResultsStoreValueIdSelectedFacet } from '@sitecore-search/widgets';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Category, Persona, Product, Template } from '@/interfaces/scenario';
import useComponentVisible from '@/hooks/useComponentVisible';
import FacetValue from './FacetValue';
import FacetValueGrid from './FacetValueGrid';
import { debounce, updateQueryString } from '@/helpers/searchWidget';
import { BROWSE_SCREEN_QUERYSTRING_KEY } from '@/constants/scenario';

type SearchResultsProps = {
  onFilterScenarios: (filteredScenarioTitles: string[]) => void;
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
};

export type ContentItemModel = {
  id: string;
  source_id: string;
  type: string;
  name: string;
  url: string;
  scenario_id: string;
  description: string;
  categories: Category[];
  personas: Persona[];
  products: Product[];
  templates: Template[];
};

export type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page'>;

const SearchResults = ({
  onFilterScenarios,
  defaultPage = 1,
  defaultItemsPerPage = 9,
}: SearchResultsProps): JSX.Element => {
  const {
    ref: containerRef,
    isComponentVisible: isSearchWidgetVisible,
    setIsComponentVisible: setIsSearchWidgetVisible,
  } = useComponentVisible(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const q = searchParams.get('q') ?? '';

  const isScenarioDetailsPage = pathname.includes('/scenarios');

  const {
    widgetRef,
    actions: { onFacetClick, onRemoveFilter, onClearFilters, onKeyphraseChange },
    queryResult: {
      isLoading,
      isInitialLoading,
      data: {
        facet: facets = [],
        content: items = [],
        suggestion: { content_name_context_aware: suggestions = [] } = {},
      } = {},
    },
  } = useSearchResults<ContentItemModel, InitialState>({
    query: (query: SearchResultsWidgetQuery) => {
      query.getRequest().setSearchSuggestion([{ name: 'content_name_context_aware', max: 4 }]);
    },
    state: {
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: q,
    },
  });

  const selectedFacets =
    useSearchResultsSelectedFilters() as (SearchResultsStoreValueIdSelectedFacet & {
      type: 'valueId';
    })[];

  // Changing the keyphrase removes all other facets
  const handleKeyphraseChange = useCallback(
    (value: string, isSuggestion = false) => {
      if (value) {
        router.push(`${pathname}?q=${value}`);
      } else {
        router.push(pathname);
      }
      onKeyphraseChange({ keyphrase: value });

      // Set the input value manually when user clicks on a keyword suggestion
      if (isSuggestion) {
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        searchInput.value = value;
      }
    },
    [onKeyphraseChange, router, pathname]
  );

  const onKeyphraseChangeDebounced = debounce((value: string) => handleKeyphraseChange(value), 500);

  const handleAutocomplete = useCallback(() => {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    searchInput.value = suggestions?.[0]?.text;
  }, [suggestions]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Tab') {
        e.preventDefault();
        handleAutocomplete();
      }
    },
    [handleAutocomplete]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      const value = (e.target as HTMLInputElement).value;
      onKeyphraseChangeDebounced(value);
    },
    [onKeyphraseChangeDebounced]
  );

  // Update the querystring and toggle the facet
  const handleFacetClick = useCallback(
    (payload: FacetChoiceChangedPayload): void => {
      const facetId = payload.facetId.toLowerCase();
      const facetValueText =
        facets
          .find((facet) => facet.name.toLowerCase() === payload.facetId.toLowerCase())
          ?.value.find((facetValue) => facetValue.id === payload.facetValueId)
          ?.text.toLowerCase() ?? '';

      // If the facet is already selected it should be removed from the querystring
      const shouldRemoveFacet = selectedFacets
        .map((facet) => facet.facetValueId)
        .includes(payload.facetValueId);

      const queryParams = updateQueryString(
        facetId,
        facetValueText,
        searchParams,
        shouldRemoveFacet
      );
      localStorage.setItem(BROWSE_SCREEN_QUERYSTRING_KEY, queryParams);
      router.push(`${pathname}?${queryParams}`);

      onFacetClick(payload);
    },
    [facets, selectedFacets, searchParams, router, pathname, onFacetClick]
  );

  const handleRemoveFilter = useCallback(
    (payload: RemoveFilterPayload) => {
      const facetId = payload.facetId.toLowerCase();
      const facetValueText =
        selectedFacets
          .find((facet) => facet.facetValueId === payload.facetValueId)
          ?.valueLabel?.toLowerCase() ?? '';

      const queryParams = updateQueryString(facetId, facetValueText, searchParams, true);
      localStorage.setItem(BROWSE_SCREEN_QUERYSTRING_KEY, queryParams);
      router.push(`${pathname}?${queryParams}`);

      onRemoveFilter(payload);
    },
    [selectedFacets, searchParams, router, pathname, onRemoveFilter]
  );

  // Clear all should not remove the keyphrase input by the user
  const handleClearAllFilters = useCallback(() => {
    const searchInputValue = (document.getElementById('search-input') as HTMLInputElement).value;

    if (searchInputValue) {
      localStorage.setItem(BROWSE_SCREEN_QUERYSTRING_KEY, `q=${searchInputValue}`);
      router.push(`${pathname}?q=${searchInputValue}`);
    } else {
      localStorage.setItem(BROWSE_SCREEN_QUERYSTRING_KEY, '');
      router.push(pathname);
    }

    onClearFilters();
  }, [router, pathname, onClearFilters]);

  // Transform the querystring parameters into suitable Search objects in order to update the keyphrase
  // and the selected facets and apply them on load
  useEffect(() => {
    if (isInitialLoading) return;

    // Apply the keyphrase
    onKeyphraseChange({ keyphrase: searchParams.get('q') ?? '' });

    // Apply the facets
    const initialFacets = [] as FacetChoiceChangedPayload[];
    Array.from(searchParams.keys())
      .filter((key) => key !== 'q')
      .map((key: string) => {
        const values = searchParams.get(key) as string;

        values?.split(',').map((value) =>
          initialFacets.push({
            facetId: key.toLowerCase(),
            facetIndex: facets.findIndex((facet) => facet.name.toLowerCase() === key),
            facetValueId:
              facets
                .find((facet) => facet.name.toLowerCase() === key)
                ?.value.find((facetValue) => facetValue.text.toLowerCase() === value.toLowerCase())
                ?.id ?? '',
            facetValueIndex:
              facets
                .find((facet) => facet.name.toLowerCase() === key)
                ?.value.findIndex(
                  (facetValue) => facetValue.text.toLowerCase() === value.toLowerCase()
                ) ?? -1,
            type: 'valueId',
            checked: true,
          })
        );
      });

    initialFacets.forEach(
      (initialFacet) => initialFacet.facetValueId && onFacetClick(initialFacet)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialLoading]);

  useEffect(() => {
    if (isLoading) return;

    onFilterScenarios(items.map((item) => item.scenario_id));
  }, [isLoading, items, onFilterScenarios]);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-row flex-wrap gap-5">
        <div className="relative max-w-96 w-full">
          <input
            id="search-input"
            className="w-full rounded-full pl-5 pr-10 pt-1 h-10 shadow-element cursor-pointer focus:outline-none placeholder:text-black-light"
            type="text"
            defaultValue={q}
            placeholder="Search"
            onFocus={() => setIsSearchWidgetVisible(true)}
            onKeyUp={handleKeyUp}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute h-4 right-4 bottom-3" />
        </div>
        {selectedFacets.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 items-center">
            {selectedFacets.map((facet, index) => (
              <FacetValue
                key={index}
                facetId={facet.facetId}
                facetValueId={facet.facetValueId}
                type="valueId"
                facetValueLabel={facet.valueLabel ?? ''}
                showRemoveIcon
                onRemoveIconClick={handleRemoveFilter}
              />
            ))}
            <button className="ml-3 text-violet-dark" onClick={handleClearAllFilters}>
              Clear all
            </button>
          </div>
        )}
      </div>
      {isSearchWidgetVisible && (
        <div
          ref={widgetRef}
          className={`absolute top-16 max-w-full max-h-[calc(100vh-15rem)] overflow-auto custom-scrollbar w-[60rem] ${isScenarioDetailsPage && ''} bg-white text-black-light p-10 rounded-lg z-50 shadow-card-large`}
        >
          <h1 className="text-2xl font-bold">Try searching for...</h1>
          {suggestions.length > 0 && (
            <div className="mt-7">
              <h3 className="text-base font-bold mb-2 uppercase tracking-wider">Keywords</h3>
              <div className="flex flex-row flex-wrap gap-2 capitalize">
                {suggestions.length > 0 &&
                  suggestions.map((suggestion) => (
                    <div
                      key={suggestion.text}
                      className="rounded-full bg-white-darkest hover:bg-gray-lightest px-4 py-[0.375rem] transition-colors cursor-pointer"
                      onClick={() => handleKeyphraseChange(suggestion.text, true)}
                    >
                      <span className="text-base">{suggestion.text}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {/* Filtering 'type' facet out not possible in Search CEC */}
          {facets
            .filter((facet) => facet.name !== 'type')
            .map((facet, facetIndex) => (
              <FacetValueGrid
                key={facet.label}
                facet={facet}
                facetIndex={facetIndex}
                selectedFacets={selectedFacets}
                onFacetValueClick={handleFacetClick}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const BrowseScreenSearchWidget = widget(SearchResults, WidgetDataType.SEARCH_RESULTS, 'content');

export default BrowseScreenSearchWidget;
