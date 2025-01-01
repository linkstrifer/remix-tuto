import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { loader } from "~/routes/form";
import Input from "./input";


export default function Plan() {

  const loaderData = useLoaderData<typeof loader>();
  const [period, setPeriod] = useState<'yearly' | 'monthly'>('yearly');

  const [arcade, setArcade] = useState<'arcade' | ''>('');
  const [advanced, setAdvanced] = useState<'advanced' | ''>('');
  const [pro, setPro] = useState<'pro' | ''>('');

  return (
    <article className="flex flex-col justify-evenly col-span-2 gap-7 text-[#0d284f]">
      <h1 className="text-3xl">
        <b>Select your Plan</b>
      </h1>

      <p className="text-[#bcbdc2]">
        You have the option of monthly or yearly billing.
      </p>

      <Form className="flex flex-col gap-4" method="GET">
        <input type="hidden" name="name" value={loaderData?.formData?.name} />

        <input type="hidden" name="email" value={loaderData?.formData?.email} />

        <input type="hidden" name="phone" value={loaderData?.formData?.phone} />

        <div className="flex justify-around">
          <div className={ arcade === 'arcade' ?
            "flex flex-col items-start border-[#0d284f] border-2 rounded-md p-2"
            :
            "flex flex-col items-start" }
          >
            <img src="/icon-arcade.svg" alt="arcadeIcon" />
            <Input
              defaultValue={loaderData?.formData?.plan}
              error={loaderData?.errors?.plan}
              placeholder="Plan"
              label="Arcade"
              type="radio"
              name="plan"
              onChange={event => {
                event.target.checked === true ?
                  (
                    setArcade('arcade'),
                    setAdvanced(''),
                    setPro('')
                  ) : setArcade('')
                console.log({"arcade":arcade, "advanced": advanced, "pro": pro})
              }}
              value={arcade}
            />
            <div className="flex flex-col items-start">
              {
                period === "yearly" ? (
                  <>
                    <small className="text-[#bcbdc2]">$120/yr</small>
                    <span>2 months free</span>
                  </>
                ) : (
                  <small className="text-[#bcbdc2]">$12/mo</small>
                )
              }
            </div>
          </div>
          <div className={ advanced === 'advanced' ?
            "flex flex-col items-start border-[#0d284f] border-2 rounded-md p-2"
            :
            "flex flex-col items-start" }
          >
            <img src="/icon-advanced.svg" alt="advancedIcon" />
            <Input
              defaultValue={loaderData?.formData?.plan}
              error={loaderData?.errors?.plan}
              placeholder="Plan"
              label="Advanced"
              type="radio"
              name="plan"
              onChange={event => {
                event.target.checked === true ?
                  (
                    setArcade(''),
                    setAdvanced('advanced'),
                    setPro('')
                  ) : setAdvanced('')
                console.log({"arcade":arcade, "advanced": advanced, "pro": pro})
              }}
              value={advanced}
            />
            <div className="flex flex-col items-start">
              {
                period === "yearly" ? (
                  <>
                    <small className="text-[#bcbdc2]">$120/yr</small>
                    <span>2 months free</span>
                  </>
                ) : (
                  <small className="text-[#bcbdc2]">$12/mo</small>
                )
              }
            </div>
          </div>
          <div className={ pro === 'pro' ?
            "flex flex-col items-start border-[#0d284f] border-2 rounded-md p-2"
            :
            "flex flex-col items-start" }
          >
            <img src="/icon-pro.svg" alt="proIcon" />
            <Input
              defaultValue={loaderData?.formData?.plan}
              error={loaderData?.errors?.plan}
              placeholder="Plan"
              label="Pro"
              type="radio"
              name="plan"
              onChange={event => {
                event.target.checked === true ?
                  (
                    setArcade(''),
                    setAdvanced(''),
                    setPro('pro')
                  ) : setPro('')
                console.log({"arcade":arcade, "advanced": advanced, "pro": pro})
              }}
              value={pro}
            />
            <div className="flex flex-col items-start">
              {
                period === "yearly" ? (
                  <>
                    <small className="text-[#bcbdc2]">$120/yr</small>
                    <span>2 months free</span>
                  </>
                ) : (
                  <small className="text-[#bcbdc2]">$12/mo</small>
                )
              }
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4 bg-[#f8f9fe] h-10 items-center">
          <span>monthly</span>
          <label
            className="bg-[#0d284f] relative w-11 h-5 rounded-full"
            aria-label="Change plan to monthly or yearly"
          >
            <input
              className="sr-only peer"
              type="checkbox"
              name="addon"
              onChange={(event) => {
                event.target.checked === true ? setPeriod('yearly') : setPeriod('monthly');
              }}
              value={period}
            />
            <span className="w-2/5 h-4/5 bg-white rounded-full absolute left-0.5 top-0.5 peer-checked:left-6 transition-all duration-400"></span>
          </label>
          <span>yearly</span>
        </div>

        <div className="flex justify-between">
          <button className="text-[#bcbdc2]" type="submit">
            Go back
          </button>
          <button
            className="bg-[#174a8b] self-end text-white rounded-md p-2"
            type="submit"
          >
            Next Step
          </button>
        </div>
      </Form>
    </article>
  );
}