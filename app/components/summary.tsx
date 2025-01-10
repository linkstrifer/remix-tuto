import { Form, useLoaderData, useSearchParams } from "@remix-run/react";
import { loader } from "~/routes/form";
import { plans } from "./plan";
import { addons } from "./addons";

export default function Summary() {
  const loaderData = useLoaderData<typeof loader>();
  const [, setSearchParams] = useSearchParams();

  const planSelected = plans.find(
    (plan) => plan.plan === loaderData.formData.plan
  );

  const addonsSelected = addons.filter((addon) =>
    loaderData.formData.addons.includes(addon.addon)
  );

  const periodSelected =
    typeof loaderData?.formData?.period === "string"
      ? loaderData?.formData?.period
      : "yearly";

  const totalAddons =
    addonsSelected.reduce(
      (accumulator, addon) =>
        accumulator + addon.price[periodSelected as keyof typeof addon.price],
      0
    ) +
    (planSelected?.price[periodSelected as keyof typeof planSelected.price] ??
      0);

  return (
    <article className="flex flex-col col-span-2 gap-7 text-[#0d284f]">
      <h1 className="text-3xl">
        <b>Finishing up</b>
      </h1>
      <p className="text-[#bcbdc2]">
        Double-check everything looks OK before confirming.
      </p>
      <Form className="flex flex-col gap-4" method="POST">
        <input type="hidden" name="name" value={loaderData?.formData?.name} />
        <input type="hidden" name="email" value={loaderData?.formData?.email} />
        <input type="hidden" name="phone" value={loaderData?.formData?.phone} />
        <input type="hidden" name="plan" value={loaderData?.formData?.plan} />
        <input
          type="hidden"
          name="period"
          value={loaderData?.formData?.period}
        />

        <div>
          <div className="flex flex-col gap-4 bg-[#f8f9fe]">
            <div className="flex justify-between p-4">
              <span>
                <b className="flex flex-col capitalize">
                  {loaderData?.formData?.plan}
                  {loaderData?.formData?.period === "yearly"
                    ? "(yearly)"
                    : " (monthly)"}
                </b>
                <button
                  className="text-sm"
                  type="button"
                  onClick={() =>
                    setSearchParams((prev) => {
                      prev.set("step", "plan");
                      return prev;
                    })
                  }
                >
                  Change
                </button>
              </span>
              <small>
                <b>
                  {loaderData.formData.period === "yearly"
                    ? `$${planSelected?.price.yearly}/yr`
                    : `$${planSelected?.price.monthly}/mo`}
                </b>
              </small>
            </div>
          </div>
          <div>
            {addonsSelected.map((addon) => (
              <div
                key={addon.addon}
                className="flex justify-between bg-[#f8f9fe] p-4"
              >
                <input
                  key="addon"
                  type="hidden"
                  name="addons"
                  value={addon.addon}
                />

                <span className="text-[#bcbdc2] text-sm">{addon.addon}</span>
                <small>
                  {loaderData.formData.period === "yearly"
                    ? `$${addon?.price.yearly}/yr`
                    : `$${addon?.price.monthly}/mo`}
                </small>
              </div>
            ))}
            <div className="flex justify-between p-4">
              <span className="text-[#bcbdc2] text-sm">
                {`Total (per ${
                  loaderData.formData.period === "yearly" ? "year" : "month"
                })`}
              </span>
              <small>
                <b>{totalAddons}</b>
              </small>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="text-[#bcbdc2] hover:text-[#0d284f]"
            type="button"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("step", "addons");

                return prev;
              })
            }
          >
            Go back
          </button>
          <button
            className="bg-[#174a8b] self-end text-white rounded-md p-2"
            type="submit"
          >
            Confirm
          </button>
        </div>
      </Form>
    </article>
  );
}
