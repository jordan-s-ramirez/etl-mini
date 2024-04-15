import React from "react";
import Navbar from "./sub-components/navbar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/mui_theme";
import layoutStyle from "./layout.module.css";

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={layoutStyle.customLayoutApp}>
          {/* <div className={layoutStyle.customLayoutHeader}> </div> */}
          <div className={layoutStyle.customLayoutContainer}>
            <aside>
              <div
                className={layoutStyle.customLayoutSidebar}
                onMouseEnter={() => {
                  setDrawerOpen((e) => !e);
                }}
                onMouseLeave={() => {
                  setDrawerOpen((e) => !e);
                }}
              >
                <Navbar drawerOpen={drawerOpen} theme={theme} />
              </div>
            </aside>
            <main className={layoutStyle.customLayoutMain}>{children}</main>
          </div>
          {/* <div className={layoutStyle.customLayoutFooter}></div> */}
        </div>
      </ThemeProvider>
    </>
  );
}
