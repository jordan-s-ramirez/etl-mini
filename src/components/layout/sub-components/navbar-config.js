import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiFlowArrowBold } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export var navbarConfig = {
  config: [
    {
      type: "MenuItem",
      description: "Github Documentation",
      url: "https://github.com/jordan-s-ramirez/etl-mini",
      title: "Documentation",
      icon: <FaGithub />,
    },
    {
      type: "MenuItem",
      description: "Workflow integration",
      url: "/workflow",
      title: "Workflow",
      icon: <PiFlowArrowBold />,
    },
    {
      type: "MenuItem",
      description: "Perform small scale ETL in the browser",
      url: "/sql-editor",
      title: "Sql Editor",
      icon: <FaCode />,
    },
    {
      type: "MenuItem",
      description: "Generic Help Page",
      url: "/help",
      title: "Help",
      icon: <IoMdHelpCircleOutline />,
    },
  ],
};
