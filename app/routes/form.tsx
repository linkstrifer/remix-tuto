import Input from '~/components/input';
import Steps from '~/components/steps';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';

function validateUserInfo(formData: FormData | Record<string, string>) {
  const data =
    typeof formData === 'object'
      ? { ...formData }
      : Object.fromEntries(formData);

  const errors: {
    name?: string;
    email?: string;
    phone?: string;
  } = {};

  console.log({ data });

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

  return { errors };
}

export async function loader({ request }: LoaderFunctionArgs) {
  const search = new URLSearchParams(request.url.split('?')[1]);

  return validateUserInfo(Object.fromEntries(search.entries()));
}

type CurrentStep = 'userInfo' | 'plan' | 'addons' | 'summary';

export default function MultiForm() {
  const loaderData = useLoaderData<typeof loader>();

  const currentStep: CurrentStep = 'userInfo';

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <Steps />

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
                error={loaderData?.errors?.name}
                placeholder="Name"
                label="Name"
                type="text"
                name="name"
              />

              <Input
                error={loaderData?.errors?.email}
                placeholder="Email"
                label="Email"
                type="email"
                name="email"
              />

              <Input
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
      </section>
    </main>
  );
}
