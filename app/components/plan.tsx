import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { useState } from 'react';
import { loader } from '~/routes/form';

const plans = [
  {
    plan: 'arcade',
    price: {
      monthly: '$9/mo',
      yearly: '$90/yr',
    },
  },
  {
    plan: 'advanced',
    price: {
      monthly: '$12/mo',
      yearly: '$120/yr',
    },
  },
  {
    plan: 'pro',
    price: {
      monthly: '$15/mo',
      yearly: '$150/yr',
    },
  },
];

export default function Plan() {
  const loaderData = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const [period, setPeriod] = useState<'yearly' | 'monthly'>(
    searchParams.get('yearly') ? 'yearly' : 'monthly'
  );

  const defaultPlan = searchParams.get('plan') ?? 'pro';

  return (
    <article className="flex flex-col col-span-2 gap-7 text-[#0d284f]">
      <h1 className="text-3xl">
        <b>Select your Plan</b>
      </h1>

      <p className="text-fm-gray">
        You have the option of monthly or yearly billing.
      </p>

      <Form className="flex flex-col gap-4" method="GET">
        <input type="hidden" name="name" value={loaderData?.formData?.name} />

        <input type="hidden" name="email" value={loaderData?.formData?.email} />

        <input type="hidden" name="phone" value={loaderData?.formData?.phone} />

        <div className="grid grid-cols-3 gap-4 justify-around">
          {plans.map((plan) => (
            <label
              key={plan.plan}
              className="flex flex-col gap-6 items-start has-[:checked]:border-[#0d284f] has-[:checked]:bg-[#f8f9fe] border rounded-md p-4 relative border-fm-gray"
            >
              <img src={`/icon-${plan.plan}.svg`} alt={plan.plan} aria-hidden />

              <div>
                <span className="capitalize">{plan.plan}</span>

                <input
                  className="opacity-0 absolute pointer-events-none"
                  defaultChecked={defaultPlan === plan.plan}
                  name="plan"
                  placeholder="Plan"
                  type="radio"
                  value={plan.plan}
                />

                <div className="flex flex-col items-start">
                  <small className="text-[#bcbdc2]">
                    {period === 'yearly'
                      ? `${plan.price.yearly}`
                      : `${plan.price.monthly}`}
                  </small>
                  {period === 'yearly' ? (
                    <span className="text-xs">2 months free</span>
                  ) : null}
                </div>
              </div>
            </label>
          ))}
        </div>
        <div className="flex justify-center gap-4 bg-[#f8f9fe] h-10 items-center">
          <span>monthly</span>
          <label
            className="bg-[#0d284f] relative w-11 h-5 rounded-full"
            aria-label="Change plan to monthly or yearly"
          >
            <input
              className="sr-only peer"
              type="checkbox"
              name="yearly"
              defaultChecked={period === 'yearly'}
              onChange={(event) => {
                setPeriod(event.target.checked === true ? 'yearly' : 'monthly');
              }}
            />
            <span className="w-2/5 h-4/5 bg-white rounded-full absolute left-0.5 top-0.5 peer-checked:left-6 transition-all duration-400"></span>
          </label>
          <span>yearly</span>
        </div>

        <div className="flex justify-between">
          <button
            className="text-[#bcbdc2] hover:text-[#0d284f]"
            type="button"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('step', 'userInfo');

                return prev;
              })
            }
          >
            Go back
          </button>

          <button
            className="bg-[#174a8b] self-end text-white rounded-md p-2"
            type="submit"
          >
            Next Step
          </button>
        </div>
      </Form>
    </article>
  );
}
