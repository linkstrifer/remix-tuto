import Steps from '~/components/steps';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { ReactNode } from 'react';
import Plan, { plans } from '~/components/plan';
import UserInfo from '~/components/userInfo';
import Addons, { addons } from '~/components/addons';

function validateUserInfo(
  formData: FormData | Record<string, string | string[]>
) {
  console.log({ formData });
  const data =
    typeof formData === 'object'
      ? { ...formData }
      : Object.fromEntries(formData);

  const errors: Record<string, string> = {};

  const validData = Object.getOwnPropertyNames(data);

  if ('name' in data && !data.name) {
    errors['name'] = 'Name is required';
  }

  if ('email' in data && !data.email) {
    errors['email'] = 'Email is required';
  }

  if ('phone' in data && !data.phone) {
    errors['phone'] = 'Phone is required';
  }

  if (data.phone && data.phone.toString().length < 10) {
    errors['phone'] = 'Please enter a valid phone number';
  }

  return {
    errors,
    validData: validData.filter(
      (inputName) => !Object.getOwnPropertyNames(errors).includes(inputName)
    ),
    formData: data,
  };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const search = new URLSearchParams(request.url.split('?')[1]);

  console.log({ search, searchEntries: Object.fromEntries(search.entries()) });

  return validateUserInfo({
    ...Object.fromEntries(search.entries()),
    addons: search.getAll('addons'),
  });
}

export type CurrentStep = 'userInfo' | 'plan' | 'addons' | 'summary' | 'thanks';

function Summary() {
  const loaderData = useLoaderData<typeof loader>();
  const [, setSearchParams] = useSearchParams();

  const planSelected = plans.find((plan) => plan.plan === loaderData.formData.plan)

  const addonsSelected = addons.filter((addon) => addon.addon )

  console.log(addonsSelected)

  return (
    <article className="flex flex-col col-span-2 gap-7 text-[#0d284f]">
      <h1 className="text-3xl">
        <b>Finishing up</b>
      </h1>
      <p className="text-[#bcbdc2]">
        Double-check everything looks OK before confirming.
      </p>
      <Form className="flex flex-col gap-4">
        <input type="hidden" name="name" value={loaderData?.formData?.name} />
        <input type="hidden" name="email" value={loaderData?.formData?.email} />
        <input type="hidden" name="phone" value={loaderData?.formData?.phone} />
        <input type="hidden" name="plan" value={loaderData?.formData?.plan} />
        <input
          type="hidden"
          name="period"
          value={loaderData?.formData?.period}
        />
        { loaderData?.formData?.addons.map( (addon: string) => (
          <input key={addon} type="hidden" name="addons" value={addon} />
        ) ) }

        <div>
          <div className="flex justify-between">

            <span>
              <b className='capitalize'>
                { loaderData?.formData?.plan }
                {loaderData?.formData?.period === 'yearly' ? '(yearly)' : ' (monthly)'}
              </b>
            </span>
            <small>{ loaderData.formData.period === 'yearly' ? `$${planSelected?.price.yearly}/yr` : `$${planSelected?.price.monthly}/mo` }</small>

          </div>
          <div>

          </div>

        </div>

        <div className="flex justify-between">
          <button
            className="text-[#bcbdc2] hover:text-[#0d284f]"
            type="button"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set('step', 'addons');

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
            Confirm
          </button>
        </div>
      </Form>
    </article>
  );
}

const formSteps: {
  [key in CurrentStep]: ReactNode;
} = {
  userInfo: <UserInfo />,
  plan: <Plan />,
  addons: <Addons />,
  summary: <Summary />,
  thanks: <div>Thanks work!</div>
} as const;

export default function MultiForm() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const currentStepFromURL = searchParams.get('step') as CurrentStep | null;

  let calculatedCurrentStep: CurrentStep = 'userInfo';

  if (
    ['name', 'email', 'phone', 'plan', 'addons'].every((fieldName) =>
      loaderData.validData.includes(fieldName)
    )
  ) {
    calculatedCurrentStep = 'summary';
  } else if (
    ['name', 'email', 'phone', 'plan'].every((fieldName) =>
      loaderData.validData.includes(fieldName)
    )
  ) {
    calculatedCurrentStep = 'addons';
  } else if (
    ['name', 'email', 'phone'].every((fieldName) =>
      loaderData.validData.includes(fieldName)
    )
  ) {
    calculatedCurrentStep = 'plan';
  }

  const currentStep = currentStepFromURL ?? calculatedCurrentStep;

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <Steps currentStep={currentStep} />

        {formSteps[currentStep]}
      </section>
    </main>
  );
}
