"use client";

import { Provider as ReduxProvider } from "react-redux";

//
import store from "@/store";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Providers;
