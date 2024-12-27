export default function MultiForm() {
  return (
    <main className="bg-[#eef5ff] flex justify-center min-h-screen items-center">
      <section className="bg-[#ffffff] grid grid-cols-3 content-center items-center m-auto w-fit justify-center">
        <aside className="bg-[#483eff] m-4 w-min">
          <ol className="list-decimal">
            <li className="text-[#ffffff]">
              <div>
                <small  className="text-[#8380ff]">Step 1</small>
                Your info
              </div>
            </li>
            <li className="text-[#ffffff]">
              <div>
                <small  className="text-[#8380ff]">Step 2</small>
                Select plan
              </div>
            </li>
            <li className="text-[#ffffff]">
              <div>
                <small  className="text-[#8380ff]">Step 3 </small>
                Add-ons
              </div>
            </li>
            <li className="text-[#ffffff]">
              <div>
                <small  className="text-[#8380ff]">Step 4</small>
                Summary
              </div>
            </li>
          </ol>
          <img src="/bg-sidebar-desktop.svg" alt="sidebarDesktop"/>
        </aside>

        <article className="m-4 col-span-2 w-min">
          <h1>Personal info</h1>

          <p>Please provide your name, email address, and phone number</p>
          <form>
            <label>
              <span className="text-[#0d284f]">Name</span>
              <input className="border-[#e5e2ef] hover:bg-[#b2aad2] border-solid border-2 rounded-md" type="text" placeholder="Name" />
            </label>

            <label>
              <span className="text-[#0d284f]">Email</span>
              <input className="border-[#e5e2ef] border-solid border-2 rounded-md" type="email" placeholder="Email" />
            </label>

            <label>
              <span className="text-[#0d284f]">Phone number</span>
              <input className="border-[#e5e2ef] border-solid border-2 rounded-md" type="text" placeholder="Phone number" />
            </label>
            <button className="bg-[#174a8b] self-end text-white rounded-md" type="submit">Next Step</button>
          </form>
        </article>
      </section>
    </main>
  )
}