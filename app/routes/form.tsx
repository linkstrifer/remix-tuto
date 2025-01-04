import Steps from '~/components/steps';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { ReactNode } from 'react';
import Plan from '~/components/plan';
import UserInfo from '~/components/userInfo';
import Input from '~/components/input';

function validateUserInfo(formData: FormData | Record<string, string>) {
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

  return validateUserInfo(Object.fromEntries(search.entries()));
}

export type CurrentStep = 'userInfo' | 'plan' | 'addons' | 'summary';

function Addons() {
  const loaderData = useLoaderData<typeof loader>();

  const addons = [
    { addon: "Online service", description: "Access to multiplayer games", price: {monthly:"+$1/mo", Yearly: "+$10/yr"}},
    { addon: "Larger storage", description: "Extra 1TB of cloud save", price: {monthly:"+$2/mo", Yearly: "+$20/yr"}},
    { addon: "Customizable profile", description: "Custom theme on your profile", price: {monthly:"+$2/mo", Yearly: "+$20/yr"}}
  ]

  return (
    <article className="flex flex-col justify-evenly col-span-2 gap-7 text-[#0d284f]">
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

        <ul className="flex flex-col gap-3">
          {addons.map((addon) => (
            <li key={ addon.addon } className="flex justify-between has-[:checked]:border-[#675fa3] border rounded-md p-2 relative border-fm-gray">
              <div className="flex items-center gap-4">
                <input
                  className="appearance-none border border-fm-gray rounded-sm checked:bg-[#433ef9] checked:before:content-['✔'] text-xs w-5 h-5"
                  type="checkbox"
                  name={ addon.addon }
                />
                <div className="flex flex-col gap-1">
                  <span><b>{ addon.addon }</b></span>
                  <small className="text-[#bcbdc2]">{ addon.description }</small>
                </div>
              </div>
              <div>
                <small className="text-[#8380ff]">{ addon.price.monthly }</small>
                <small className="text-[#8380ff]">{ addon.price.Yearly }</small>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <button
            className="text-[#bcbdc2] hover:text-[#0d284f]"
            type="button"
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

const formSteps: {
  [key in CurrentStep]: ReactNode;
} = {
  userInfo: <UserInfo />,
  plan: <Plan />,
  addons: <Addons />,
  summary: <div />,
} as const;

export default function MultiForm() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();

  const currentStepFromURL = searchParams.get('step') as CurrentStep | null;

  let calculatedCurrentStep: CurrentStep = 'userInfo';

  if (
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
