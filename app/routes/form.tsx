export default function MultiForm() {
  return (
    <section>
      <aside>
        <ol className="list-decimal">
          <li>
            <small>Step 1</small>
            Your info
          </li>
          <li>
            <small>Step 2</small>
            Select plan
          </li>
          <li>
            <small>Step 3</small>
            Add-ons
          </li>
          <li>
            <small>Step 4</small>
            Summary
          </li>
        </ol>
      </aside>

      <article>
        <h1>Personal info</h1>

        <p>Please provide your name, email address, and phone number</p>
        <form>
          <label>
            <span>Name</span>
            <input type="text" placeholder="Name" />
          </label>

          <label>
            <span>Email</span>
            <input type="email" placeholder="Email" />
          </label>

          <label>
            <span>Phone number</span>
            <input type="text" placeholder="Phone number" />
          </label>

          <button type="submit">Next Step</button>
        </form>
      </article>
    </section>
  )
}