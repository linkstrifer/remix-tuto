import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { loader } from '~/routes/form';

const plans = ['arcade', 'advanced', 'pro'];

export default function Plan() {
  const loaderData = useLoaderData<typeof loader>();
  const [period, setPeriod] = useState<'yearly' | 'monthly'>('monthly');

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
              key={plan}
              className="flex flex-col gap-6 items-start has-[:checked]:border-[#0d284f] border rounded-md p-2 relative border-fm-gray"
            >
              <img src={`/icon-${plan}.svg`} alt={plan} aria-hidden />

              <div>
                <span className="capitalize">{plan}</span>

                <input
                  className="opacity-0 absolute pointer-events-none"
                  defaultValue={loaderData?.formData?.plan}
                  placeholder="Plan"
                  type="radio"
                  defaultChecked
                  name="plan"
                />

                <div className="flex flex-col items-start">
                  {period === 'yearly' ? (
                    <>
                      <small className="text-[#bcbdc2]">$120/yr</small>
                      <span className="text-xs">2 months free</span>
                    </>
                  ) : (
                    <small className="text-[#bcbdc2]">$12/mo</small>
                  )}
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
              name="addon"
              onChange={(event) => {
                setPeriod(event.target.checked === true ? 'yearly' : 'monthly');
              }}
              value={period}
            />
            <span className="w-2/5 h-4/5 bg-white rounded-full absolute left-0.5 top-0.5 peer-checked:left-6 transition-all duration-400"></span>
          </label>
          <span>yearly</span>
        </div>

        <div className="flex justify-between">
          <button className="text-[#bcbdc2]" type="submit">
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
