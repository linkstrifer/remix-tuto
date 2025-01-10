import Steps from "~/components/steps";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { ReactNode } from "react";
import Plan from "~/components/plan";
import UserInfo from "~/components/userInfo";
import Addons from "~/components/addons";
import {
  calculateCurrentStep,
  CurrentStep,
} from "~/utils/calculateCurrentStep/calculateCurrentStep";
import { validateUserInfo } from "~/utils/validateUserInfo/validateUserInfo";
import Summary from "~/components/summary";

export async function loader({ request }: LoaderFunctionArgs) {
  const search = new URLSearchParams(request.url.split("?")[1]);
  console.log("loader");
  return validateUserInfo({
    ...Object.fromEntries(search.entries()),
    addons: search.getAll("addons"),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);
  return {
    numero: 5,
  };
}

function Thanks() {
  return <h1>Thanks componente works!</h1>;
}

const formSteps: {
  [key in CurrentStep]: ReactNode;
} = {
  userInfo: <UserInfo />,
  plan: <Plan />,
  addons: <Addons />,
  summary: <Summary />,
  thanks: <Thanks />,
} as const;

export default function MultiForm() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();

  console.log(actionData);

  const currentStepFromURL = searchParams.get("step") as CurrentStep | null;

  const currentStep = calculateCurrentStep(
    loaderData.validData,
    currentStepFromURL
  );

  const finalStep = false;

  return (
    <main className="bg-[#eef5ff] grid min-h-screen">
      <section className="bg-[#ffffff] flex flex-col md:grid grid-cols-3 md:m-auto md:w-fit gap-4 p-4 rounded-3xl">
        <Steps currentStep={finalStep ? "summary" : currentStep} />

        {formSteps[finalStep ? "thanks" : currentStep]}
      </section>
    </main>
  );
}
