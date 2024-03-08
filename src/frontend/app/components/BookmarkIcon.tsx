'use client';

import { isSavedScenario, unsaveScenarioID, saveScenarioID } from '@/helpers/scenario';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

type BookmarkIconProps = {
  scenarioID: string;
};

export default function BookmarkIcon({ scenarioID }: BookmarkIconProps) {
  const [isScenarioBookmarked, setIsScenarioBookmarked] = useState(false);

  useEffect(() => setIsScenarioBookmarked(isSavedScenario(scenarioID)), []);

  return isScenarioBookmarked ? (
    <FontAwesomeIcon
      icon={faBookmarkSolid}
      className="h-6 absolute right-5 top-5"
      onClick={() => {
        setIsScenarioBookmarked(!isScenarioBookmarked);
        unsaveScenarioID(scenarioID);
      }}
    />
  ) : (
    <FontAwesomeIcon
      icon={faBookmark}
      className="h-6 absolute right-5 top-5"
      onClick={() => {
        setIsScenarioBookmarked(!isScenarioBookmarked);
        saveScenarioID(scenarioID);
      }}
    />
  );
}
