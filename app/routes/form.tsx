import { ActionFunctionArgs } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import Input from '~/components/input';
import Steps from '~/components/steps';

function validateUserInfo(formData: FormData) {
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

  if (data.phone.toString().length < 10) {
    errors['phone'] = 'Please enter a valid phone number';
  }

  return { errors };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  return validateUserInfo(formData);
}


export default function MultiForm() {
  const actionData = useActionData<typeof action>();

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <Steps />

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


