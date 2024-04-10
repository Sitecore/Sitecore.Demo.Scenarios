import { integrationIcons } from '@/helpers/scenario';
import Image from 'next/image';
import { IntegrationOptions, Scenario } from '@/interfaces/scenario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';

export default function ScenarioIntegrations({ scenario }: { scenario: Scenario }) {
  return !!scenario.integrations.results.length ? (
    <>
      <hr className="text-gray-light mb-6" />
      <div className="flex flex-row items-center flex-wrap gap-2">
        <p className="relative uppercase text-xs font-semibold text-charcoal tracking-wide mr-8">
          Required integrations
          <span className="group">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="absolute -top-2 left-[calc(100%+0.25rem)] cursor-pointer"
            />
            <p className="notification-card shadow-element hidden group-hover:block absolute w-[170%] bottom-[calc(100%+1rem)] left-1/4 py-4 px-6 normal-case text-sm tracking-normal font-medium">
              You need to configure your own connections for the following integrations in order to
              replicate this scenario.
            </p>
          </span>
        </p>
        <div className="flex flex-wrap gap-4">
          {scenario.integrations.results.map((integration) => (
            <span key={integration.id} className="flex items-center gap-2 mr-4">
              <Image
                src={integrationIcons[IntegrationOptions[integration.id]]}
                alt={IntegrationOptions[integration.id]}
                width={18}
                height={18}
                unoptimized
                className="mb-1"
              />
              <p className="text-sm font-semibold">{IntegrationOptions[integration.id]}</p>
            </span>
          ))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
