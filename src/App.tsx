import { ReactNode, FC } from "react";
import QueryProvider from "./providers/QueryProvider";
import CheckUser from "./providers/CheckUser";
import SiteRouter from "./providers/SiteRouter";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-dark-green/theme.css"; //theme

const App: FC = (): ReactNode => {
  return (
    <CheckUser>
      <PrimeReactProvider>
        <QueryProvider>
          <SiteRouter />
        </QueryProvider>
      </PrimeReactProvider>
    </CheckUser>
  );
};

export default App;
