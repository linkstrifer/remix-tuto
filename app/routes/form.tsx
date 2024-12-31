import Input from '~/components/input';
import Steps from '~/components/steps';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { ReactNode, useState } from 'react';

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

type CurrentStep = 'userInfo' | 'plan' | 'addons' | 'summary';

function UserInfo() {
  return <div />;
}

function Plan() {
  return <div />;
}

const formSteps: {
  [key in CurrentStep]: ReactNode;
} = {
  userInfo: <UserInfo />,
  plan: <Plan />,
  addons: <div />,
  summary: <div />,
} as const;

export default function MultiForm() {
  const loaderData = useLoaderData<typeof loader>();

  const [period, setPeriod] = useState<'yearly' | 'monthly'>('yearly');

  let currentStep: CurrentStep = 'userInfo';

  if (
    ['name', 'email', 'phone', 'plan'].every((fieldName) =>
      loaderData.validData.includes(fieldName)
    )
  ) {
    currentStep = 'addons';
  } else if (
    ['name', 'email', 'phone'].every((fieldName) =>
      loaderData.validData.includes(fieldName)
    )
  ) {
    currentStep = 'plan';
  }

  console.log(period);

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <Steps />

        {formSteps[currentStep]}

        {currentStep === 'userInfo' ? (
          <article className="flex flex-col justify-center col-span-2 gap-7 text-[#0d284f]">
            <h1 className="text-3xl">
              <b>Personal info</b>
            </h1>

            <p className="text-[#bcbdc2]">
              Please provide your name, email address, and phone number
            </p>

            <Form className="flex flex-col gap-4" method="GET">
              <Input
                defaultValue={loaderData?.formData?.name}
                error={loaderData?.errors?.name}
                placeholder="Name"
                label="Name"
                type="text"
                name="name"
              />

              <Input
                defaultValue={loaderData?.formData?.email}
                error={loaderData?.errors?.email}
                placeholder="Email"
                label="Email"
                type="email"
                name="email"
              />

              <Input
                defaultValue={loaderData?.formData?.phone}
                error={loaderData?.errors?.phone}
                placeholder="Phone number"
                label="Phone number"
                type="text"
                name="phone"
              />

              <button
                className="bg-[#174a8b] self-end text-white rounded-md p-2"
                type="submit"
              >
                Next Step
              </button>
            </Form>
          </article>
        ) : null}

        {currentStep === 'plan' ? (
          <article className="flex flex-col justify-evenly col-span-2 gap-7 text-[#0d284f]">
            <h1 className="text-3xl">
              <b>Select your Plan</b>
            </h1>

            <p className="text-[#bcbdc2]">
              You have the option of monthly or yearly billing.
            </p>

            <Form className="flex flex-col gap-4" method="GET">
              <input
                type="hidden"
                name="name"
                value={loaderData?.formData?.name}
              />

              <input
                type="hidden"
                name="email"
                value={loaderData?.formData?.email}
              />

              <input
                type="hidden"
                name="phone"
                value={loaderData?.formData?.phone}
              />

              <div className="flex justify-around">
                <div className="flex flex-col items-start">
                  <img src="/icon-arcade.svg" alt="arcadeIcon" />
                  <Input
                    defaultValue={loaderData?.formData?.plan}
                    error={loaderData?.errors?.plan}
                    placeholder="Plan"
                    label="Arcade"
                    type="radio"
                    name="plan"
                  />
                  <div className="flex flex-col items-start">
                    <small className="text-[#bcbdc2]">$90/yr</small>
                    <span>2 months free</span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <img src="/icon-advanced.svg" alt="advancedIcon" />
                  <Input
                    defaultValue={loaderData?.formData?.plan}
                    error={loaderData?.errors?.plan}
                    placeholder="Plan"
                    label="Advanced"
                    type="radio"
                    name="plan"
                  />
                  <div className="flex flex-col items-start">
                    <small className="text-[#bcbdc2]">$120/yr</small>
                    <span>2 months free</span>
                  </div>
                </div>
                <div className="flex flex-col items-start">
                  <img src="/icon-pro.svg" alt="proIcon" />
                  <Input
                    defaultValue={loaderData?.formData?.plan}
                    error={loaderData?.errors?.plan}
                    placeholder="Plan"
                    label="Pro"
                    type="radio"
                    name="plan"
                  />
                  <div className="flex flex-col items-start">
                    <small className="text-[#bcbdc2]">$150/yr</small>
                    <span>2 months free</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <span>monthly</span>
                <label
                  className="bg-[#0d284f] relative w-11 h-5 rounded-full"
                  aria-label="Change to "
                >
                  <input
                    className="sr-only peer"
                    type="checkbox"
                    name="addon"
                    onChange={(event) => {
                      console.log(event.target.checked);
                    }}
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
        ) : null}
      </section>
    </main>
  );
}
