import { Form } from '@remix-run/react';

export function Game({
  data,
}: {
  data: {
    name: string;
    id: string;
  };
}) {
  return (
    <Form method="DELETE">
      <h1>{data.name}</h1>

      <button type="submit" name="gameToDelete" value={data.id}>
        Delete
      </button>
    </Form>
  );
}
