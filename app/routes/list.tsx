import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData, useSearchParams } from '@remix-run/react';
import { Game } from '~/components/game';

// DB
let gamesList = [
  {
    name: 'The Legend of Zelda: Breath of the Wild',
    id: '1',
  },
  {
    name: 'Super Mario Odyssey',
    id: '2',
  },
];

// GET
export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;

  const search = searchParams.get('search');

  console.log('loader is running');

  console.log({ searchParams });

  return {
    games: gamesList.filter((game) =>
      search ? game.name.includes(search) : true
    ),
  };
}

// Not GET
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  if (request.method === 'DELETE') {
    const gameToDelete = formData.get('gameToDelete') as string;

    console.log('game to delete', gameToDelete);

    gamesList = gamesList.filter((game) => game.id !== gameToDelete);
  } else if (request.method === 'POST') {
    const name = formData.get('name') as string;

    console.log('game to add', name);

    gamesList.push({
      name,
      id: Math.random().toString(),
    });

    console.log('game added');
  }

  return {
    success: true,
  };
}

export default function List() {
  const loaderData = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <main className="w-96 m-auto flex flex-col gap-8">
      <h1>Game</h1>

      <Form method="GET">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchParams.get('search') ?? ''}
          onChange={(e) => setSearchParams({ search: e.target.value })}
        />

        <button type="submit">Search</button>
      </Form>

      <ul className="flex flex-col gap-4">
        {loaderData.games.map((game) => (
          <li key={game.id}>
            <Game data={game} />
          </li>
        ))}
      </ul>

      <Form method="POST">
        <input type="text" placeholder="Game name" name="name" />

        <button type="submit">Add</button>
      </Form>
    </main>
  );
}
