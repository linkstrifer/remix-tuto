import { ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const errors: {
    name?: string;
    email?: string;
    phone?: string;
  } = {};

  if (!data.name) {
    errors['name'] = 'Name is required';
  }

  if (!data.email) {
    errors['email'] = 'Email is required';
  }

  if (!data.phone) {
    errors['phone'] = 'Phone is required';
  }

  return {
    errors,
  };
}

export default function MultiForm() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        {/* <aside className="bg-[#483eff] overflow-hidden rounded-xl relative pb-36">
          <img
            src="/bg-sidebar-desktop.svg"
            alt="sidebarDesktop"
            className="absolute left-0 bottom-0 right-0"
          />

          <ol className="relative">
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl">
                1
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                <span>Your info</span>
              </div>
            </li>
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
                2
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                <span>Select plan</span>
              </div>
            </li>
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
                3
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                <span>Add-ons</span>
              </div>
            </li>
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
                4
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                <span>Summary</span>
              </div>
            </li>
          </ol>
        </aside> */}

        <article className="flex flex-col justify-center col-span-2 gap-7 text-[#0d284f]">
          <h1 className="text-3xl">
            <b>Personal info</b>
          </h1>

          <p className="text-[#bcbdc2]">
            Please provide your name, email address, and phone number
          </p>

          <Form className="flex flex-col gap-4" method="POST">
            <Input
              error={actionData?.errors.name}
              placeholder="Name"
              label="Name"
              type="text"
              name="name"
            />

            <Input
              error={actionData?.errors.email}
              placeholder="Email"
              label="Email"
              type="email"
              name="email"
            />

            <Input
              error={actionData?.errors.phone}
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
      </section>
    </main>
  );
}

function Input({
  className,
  label,
  error,
  ...props
}: ComponentProps<'input'> & { label?: string; error?: string }) {
  return (
    <label className="flex flex-col group" aria-label="Name">
      <div className="flex justify-between">
        {label ? <span>{label}</span> : null}

        {error ? (
          <span
            className={classNames(
              'font-bold text-red-500 group-has-[:user-invalid]:block',
              {
                hidden: !error,
              }
            )}
          >
            {error ?? 'This field is required'}
          </span>
        ) : null}
      </div>

      <input
        className={twMerge(
          'border-[#e5e2ef] focus:outline-violet-700 border-solid border-2 rounded-md py-1',
          className
        )}
        {...props}
      />
    </label>
  );
}
