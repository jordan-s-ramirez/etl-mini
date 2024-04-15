import Layout from "@/components/layout/layout";
import React from "react";
import SqlEditor from "@/components/sql-editor/sql-editor";

const Page = () => {
  return (
    <>
      <h3 style={{ textAlign: "center" }}>SQL Editor</h3>
      <SqlEditor />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
