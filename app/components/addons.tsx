import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { loader } from '~/routes/form';

export const addons = [
  {
    addon: 'Online service',
    description: 'Access to multiplayer games',
    price: { monthly: 1, yearly: 10 },
  },
  {
    addon: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: { monthly: 2, yearly: 20 },
  },
  {
    addon: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: { monthly: 2, yearly: 20 },
  },
];


export default function Addons() {
  const loaderData = useLoaderData<typeof loader>();

  const [, setSearchParams] = useSearchParams();


  return (
    <article className="flex flex-col col-span-2 gap-7 text-[#0d284f]">
      <h1 className="text-3xl">
        <b>Pick add-ons</b>
      </h1>
      <p className="text-[#bcbdc2]">
        Add-ons help enhance your gaming experience.
      </p>
      <Form className="flex flex-col gap-4" method="GET">
        <input type="hidden" name="name" value={loaderData?.formData?.name} />
        <input type="hidden" name="email" value={loaderData?.formData?.email} />
        <input type="hidden" name="phone" value={loaderData?.formData?.phone} />
        <input type="hidden" name="plan" value={loaderData?.formData?.plan} />

        <input
          type="hidden"
          name="period"
          value={
            loaderData?.formData?.period === 'yearly' ? 'yearly' : 'monthly'
          }
        />

        <ul className="flex flex-col gap-3">
          {addons.map((addon) => (
            <li
              key={addon.addon}
              className="flex justify-between has-[:checked]:border-[#675fa3] has-[:checked]:bg-[#f8f9fe] border rounded-md p-2 relative border-fm-gray"
            >
              <div className="flex items-center gap-4">
                <input
                  className="flex justify-center items-center appearance-none border border-fm-gray rounded checked:bg-[#433ef9] checked:before:content-['✓'] text-xs text-white w-5 h-5"
                  defaultChecked={loaderData?.formData?.addons?.includes(
                    addon.addon
                  )}
                  type="checkbox"
                  name="addons"
                  value={addon.addon}
                />
                <div className="flex flex-col gap-1">
                  <span>
                    <b>{addon.addon}</b>
                  </span>
                  <small className="text-[#bcbdc2]">{addon.description}</small>
                </div>
              </div>

              <div>
                { loaderData?.formData?.period === 'yearly' ? (
                  <small className="text-[#8380ff]">{`+$${addon.price.yearly}/yr`}</small>
                ) : (
                  <small className="text-[#8380ff]">{`+$${addon.price.monthly}/mo`}</small>
                ) }
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            className="text-[#bcbdc2] hover:text-[#0d284f]"
            type="button"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('step', 'plan');

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
