import { Link, useSearchParams } from '@remix-run/react';
import classNames from 'classnames';
import { CurrentStep } from '~/routes/form';

const steps = [
  {
    label: 'Your info',
    searchParam: 'userInfo',
  },
  {
    label: 'Select plan',
    searchParam: 'plan',
  },
  {
    label: 'Add-ons',
    searchParam: 'addons',
  },
  {
    label: 'Summary',
    searchParam: 'summary',
  },
];

export default function Steps({ currentStep }: { currentStep: CurrentStep }) {
  const [searchhParams] = useSearchParams();

  return (
    <aside className="bg-[#483eff] overflow-hidden rounded-xl relative pb-36">
      <img
        src="/bg-sidebar-desktop.svg"
        alt="sidebarDesktop"
        className="absolute left-0 bottom-0 right-0"
      />

      <ol className="relative">
        {steps.map((step, index) => {
          const goToStepUrl = new URLSearchParams(searchhParams.toString());

          goToStepUrl.set('step', step.searchParam);

          return (
            <li className="m-6 text-white" key={step.label}>
              <Link
                className="flex items-center"
                to={{
                  pathname: '/form',
                  search: goToStepUrl.toString(),
                }}
              >
                <div
                  className={classNames(
                    'flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl',
                    {
                      'bg-white text-[#483eff]':
                        currentStep === step.searchParam,
                    }
                  )}
                >
                  {index + 1}
                </div>
                <div className="flex flex-col w-max">
                  <small className="text-[#8380ff]">Step {index + 1}</small>
                  <span>{step.label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
