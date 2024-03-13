'use client';

import { isSavedScenario, unsaveScenarioID, saveScenarioID } from '@/helpers/scenario';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

type BookmarkIconProps = {
  scenarioID: string;
  onClick?: () => void;
  className?: string;
};

export default function BookmarkIcon({
  scenarioID,
  onClick = () => undefined,
  className,
}: BookmarkIconProps) {
  const [isScenarioBookmarked, setIsScenarioBookmarked] = useState(false);

  useEffect(() => setIsScenarioBookmarked(isSavedScenario(scenarioID)), []);

  return isScenarioBookmarked ? (
    <FontAwesomeIcon
      icon={faBookmarkSolid}
      className={`text-violet ${className}`}
      onClick={() => {
        setIsScenarioBookmarked(!isScenarioBookmarked);
        unsaveScenarioID(scenarioID);
        onClick();
      }}
    />
  ) : (
    <FontAwesomeIcon
      icon={faBookmark}
      className={className}
      onClick={() => {
        setIsScenarioBookmarked(!isScenarioBookmarked);
        saveScenarioID(scenarioID);
        onClick();
      }}
    />
  );
}
