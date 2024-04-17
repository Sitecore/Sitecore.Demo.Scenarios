'use client';

import { isSavedScenario, unsaveScenarioID, saveScenarioID } from '@/helpers/scenario';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSavedScenariosContext } from '../context/savedScenarios';

type BookmarkIconProps = {
  scenarioID: string;
  className?: string;
};

export default function BookmarkIcon({ scenarioID, className }: BookmarkIconProps) {
  const [isScenarioBookmarked, setIsScenarioBookmarked] = useState(false);
  const { updateSavedScenarios } = useSavedScenariosContext();

  useEffect(() => setIsScenarioBookmarked(isSavedScenario(scenarioID)), [scenarioID]);

  return isScenarioBookmarked ? (
    <FontAwesomeIcon
      icon={faBookmarkSolid}
      className={`text-violet ${className}`}
      onClick={() => {
        setIsScenarioBookmarked(!isScenarioBookmarked);
        unsaveScenarioID(scenarioID);
        updateSavedScenarios();
      }}
    />
  ) : (
    <FontAwesomeIcon
      icon={faBookmark}
      className={className}
      onClick={() => {
        setIsScenarioBookmarked(!isScenarioBookmarked);
        saveScenarioID(scenarioID);
        updateSavedScenarios();
      }}
    />
  );
}
