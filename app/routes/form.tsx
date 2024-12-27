export default function MultiForm() {
  return (
    <main className="bg-[#eef5ff] flex justify-center min-h-screen items-center">
      <section className="bg-[#ffffff] grid grid-cols-3 content-center items-center m-auto w-fit justify-center">
        <aside className="bg-[#483eff] m-4 w-min">
          {/* <ol className="list-decimal">
            <li className="text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 1</small>
                Your info
              </div>
            </li>
            <li className="text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 2</small>
                Select plan
              </div>
            </li>
            <li className="text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 3 </small>
                Add-ons
              </div>
            </li>
            <li className="text-[#ffffff]">
              <div className="flex flex-col">
                <small  className="text-[#8380ff]">Step 4</small>
                Summary
              </div>
            </li>
          </ol> */}
          <div className="flex items-center m-6 text-white">
            <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl">
              1
            </div>
            <div className="flex flex-col w-max">
              <small  className="text-[#8380ff]">Step 1</small>
              Your info
            </div>
          </div>
          <div className="flex items-center m-6 text-white">
            <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
              2
            </div>
            <div className="flex flex-col w-max">
              <small  className="text-[#8380ff]">Step 1</small>
              Select plan
            </div>
          </div>
          <div className="flex items-center m-6 text-white">
            <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
              3
            </div>
            <div className="flex flex-col w-max">
              <small  className="text-[#8380ff]">Step 1</small>
              Add-ons
            </div>
          </div>
          <div className="flex items-center m-6 text-white">
            <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
              4
            </div>
            <div className="flex flex-col w-max">
              <small  className="text-[#8380ff]">Step 1</small>
              Summary
            </div>
          </div>
          <img src="/bg-sidebar-desktop.svg" alt="sidebarDesktop"/>
        </aside>

        <article className="m-4 grid col-span-2 gap-7 w-min text-[#0d284f]">
          <h1 className="text-3xl"><b>Personal info</b></h1>

          <p className="text-[#bcbdc2]">Please provide your name, email address, and phone number</p>
          <form>
            <label>
              <span>Name</span>
              <input className="border-[#e5e2ef] hover:bg-[#b2aad2] border-solid border-2 rounded-md" type="text" placeholder="Name" />
            </label>

            <label>
              <span>Email</span>
              <input className="border-[#e5e2ef] border-solid border-2 rounded-md" type="email" placeholder="Email" />
            </label>

            <label>
              <span>Phone number</span>
              <input className="border-[#e5e2ef] border-solid border-2 rounded-md" type="text" placeholder="Phone number" />
            </label>
            <button className="bg-[#174a8b] self-end text-white rounded-md" type="submit">Next Step</button>
          </form>
        </article>
      </section>
    </main>
  )
}