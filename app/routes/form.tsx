export default function MultiForm() {
  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4">
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
                Your info
              </div>
            </li>
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
                2
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                Select plan
              </div>
            </li>
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
                3
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                Add-ons
              </div>
            </li>
            <li className="flex items-center m-6 text-white">
              <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
                4
              </div>
              <div className="flex flex-col w-max">
                <small className="text-[#8380ff]">Step 1</small>
                Summary
              </div>
            </li>
          </ol>
        </aside>

        <article className="flex flex-col justify-center col-span-2 gap-7 text-[#0d284f]">
          <h1 className="text-3xl">
            <b>Personal info</b>
          </h1>

          <p className="text-[#bcbdc2]">
            Please provide your name, email address, and phone number
          </p>

          <form className="flex flex-col">
            <label>
              <span>Name</span>
              <input
                className="border-[#e5e2ef] hover:bg-[#b2aad2] border-solid border-2 rounded-md"
                type="text"
                placeholder="Name"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                className="border-[#e5e2ef] border-solid border-2 rounded-md"
                type="email"
                placeholder="Email"
              />
            </label>

            <label>
              <span>Phone number</span>
              <input
                className="border-[#e5e2ef] border-solid border-2 rounded-md"
                type="text"
                placeholder="Phone number"
              />
            </label>
            <button
              className="bg-[#174a8b] self-end text-white rounded-md"
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
