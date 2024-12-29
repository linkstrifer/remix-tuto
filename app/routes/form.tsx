import { ComponentProps, useReducer } from 'react';
import { twMerge } from 'tailwind-merge';

export default function MultiForm() {
  const [{ name, email, phone }, dispatch] = useReducer(
    (
      state: {
        email: string;
        name: string;
        phone: string;
      },
      updates: Partial<typeof state>
    ) => {
      return { ...state, ...updates };
    },
    {
      email: '',
      name: '',
      phone: '',
    }
  );

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <aside className="bg-[#483eff] overflow-hidden rounded-xl relative pb-36">
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
        </aside>

        <article className="flex flex-col justify-center col-span-2 gap-7 text-[#0d284f]">
          <h1 className="text-3xl">
            <b>Personal info</b>
          </h1>

          <pre>
            {JSON.stringify(
              {
                name,
                email,
                phone,
              },
              null,
              2
            )}
          </pre>

          <p className="text-[#bcbdc2]">
            Please provide your name, email address, and phone number
          </p>

          <form className="flex flex-col gap-4">
            <Input
              onChange={(event) =>
                dispatch({
                  name: event.target.value,
                })
              }
              placeholder="Name"
              label="Name"
              required
              type="text"
              value={name}
            />

            <Input
              onChange={(event) =>
                dispatch({
                  email: event.target.value,
                })
              }
              placeholder="Email"
              label="Email"
              required
              type="email"
              value={email}
            />

            <Input
              onChange={(event) =>
                dispatch({
                  phone: event.target.value,
                })
              }
              placeholder="Phone number"
              label="Phone number"
              required
              type="text"
              value={phone}
            />

            <button
              className="bg-[#174a8b] self-end text-white rounded-md p-2"
              type="submit"
            >
              Next Step
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}

function Input({
  className,
  label,
  ...props
}: ComponentProps<'input'> & { label?: string }) {
  return (
    <label className="flex flex-col group" aria-label="Name">
      <div className="flex justify-between">
        {label ? <span>{label}</span> : null}

        {!props.value ? (
          <span className="font-bold text-red-500 group-has-[:user-invalid]:block hidden">
            This field is required
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
