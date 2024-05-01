import Layout from "@/components/layout/layout";
import React from "react";
import SqlEditor from "@/components/sql-editor/sql-editor";

const Page = () => {
  return (
    <>
      <h1 style={{ marginLeft: "1%", marginBottom: 10 }}>SQL Editor</h1>
      <SqlEditor />
    </>
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
