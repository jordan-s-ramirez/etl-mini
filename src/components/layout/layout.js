import React from "react";
import Navbar from "./sub-components/navbar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/styles/mui_theme";
import layoutStyle from "./layout.module.css";

const debounceTime = 700

export default function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const [drawerChangeTime, setDrawerChangeTime] = React.useState(0)
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
                  if (Date.now() - drawerChangeTime > debounceTime) {
                    setDrawerOpen((e) => !e);
                    setDrawerChangeTime(Date.now())
                  }
                }}
                onMouseLeave={() => {
                  if (Date.now() - drawerChangeTime > debounceTime) {
                    setDrawerOpen((e) => !e);
                    setDrawerChangeTime(Date.now())
                  }
                }}
              >
                <Navbar drawerOpen={drawerOpen} theme={theme} />
              </div>
            </aside>
            {console.log()}
            <main className={layoutStyle.customLayoutMain} style={{ backgroundColor: theme.palette.custom.contentBackgroundColor }}>{children}</main>
          </div>
          {/* <div className={layoutStyle.customLayoutFooter}></div> */}
        </div>
      </ThemeProvider>
    </>
  );
}
