export default function MultiForm() {
  return (
    <main className="bg-[#eef5ff] flex items-center justify-around content-center min-h-screen">
      <section className="bg-[#ffffff] flex">
        <aside className="bg-[#483eff] relative m-4 flex flex-col justify-between rounded-md">
          <ol className="list-decimal">
            <li className="list-item text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 1</small>
                Your info
              </div>
            </li>
            <li className="list-item text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 2</small>
                Select plan
              </div>
            </li>
            <li className="list-item text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 3 </small>
                Add-ons
              </div>
            </li>
            <li className="list-item text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 4</small>
                Summary
              </div>
            </li>
          </ol>
          <img className="absolute bottom-0" src="/bg-sidebar-desktop.svg" alt="sidebarDesktop"/>
        </aside>

        <article className="m-4">
          <h1>Personal info</h1>

          <p>Please provide your name, email address, and phone number</p>
          <form className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="text-[#0d284f]">Name</span>
              <input className="border-[#e5e2ef] hover:bg-[#b2aad2] border-solid border-2 rounded-md" type="text" placeholder="Name" />
            </label>

            <label className="flex flex-col">
              <span className="text-[#0d284f]">Email</span>
              <input className="border-[#e5e2ef] border-solid border-2 rounded-md" type="email" placeholder="Email" />
            </label>

            <label className="flex flex-col">
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