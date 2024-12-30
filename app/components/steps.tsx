
export default function Steps() {

  return (
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
            <small className="text-[#8380ff]">Step 2</small>
            <span>Select plan</span>
          </div>
        </li>
        <li className="flex items-center m-6 text-white">
          <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
            3
          </div>
          <div className="flex flex-col w-max">
            <small className="text-[#8380ff]">Step 3</small>
            <span>Add-ons</span>
          </div>
        </li>
        <li className="flex items-center m-6 text-white">
          <div className="flex justify-center items-center content-center w-7 m-3 border-white border-solid border-2 rounded-2xl text-white">
            4
          </div>
          <div className="flex flex-col w-max">
            <small className="text-[#8380ff]">Step 4</small>
            <span>Summary</span>
          </div>
        </li>
      </ol>
    </aside>
  )
}