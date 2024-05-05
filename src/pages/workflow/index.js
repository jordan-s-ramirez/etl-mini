import Layout from "@/components/layout/layout";
import StoreProvider from "@/store/storeProvider";
import { WorkflowMain } from "./mainPage";

const Page = () => {
  return (
    <StoreProvider>
      <WorkflowMain/>
    </StoreProvider>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
