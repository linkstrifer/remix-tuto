import Steps from '~/components/steps';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
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

type CurrentStep = 'userInfo' | 'plan' | 'addons' | 'summary';

function Addons() {
  const loaderData = useLoaderData<typeof loader>();

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

        <div>
          <div>
            <Input
              defaultValue={loaderData?.formData?.plan}
              error={loaderData?.errors?.plan}
              placeholder="addons"
              type="checkbox"
              name="onlineService"
            />
          </div>
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

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <Steps />

        {formSteps[currentStep]}
      </section>
    </main>
  );
}
