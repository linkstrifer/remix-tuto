import { Form, useLoaderData } from '@remix-run/react';
import { loader } from '~/routes/form';
import Input from './input';

export default function UserInfo() {
  const loaderData = useLoaderData<typeof loader>();

  return (
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
          label="Name"
          name="name"
          placeholder="Name"
          type="text"
        />

        <Input
          defaultValue={loaderData?.formData?.email}
          error={loaderData?.errors?.email}
          label="Email"
          name="email"
          placeholder="Email"
          type="email"
        />

        <Input
          defaultValue={loaderData?.formData?.phone}
          error={loaderData?.errors?.phone}
          label="Phone number"
          name="phone"
          placeholder="Phone number"
          type="text"
        />

        <button
          className="bg-[#174a8b] self-end text-white rounded-md p-2"
          type="submit"
        >
          Next Step
        </button>
      </Form>
    </article>
  );
}
