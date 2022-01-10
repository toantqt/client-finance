import { Redirect, Route, Switch } from "react-router-dom";
import adminSlug from "../resources/AdminSlug";
import LoanContractManager from "../screens/Admin/Loan Contract/screens/Loan Contract Manager/LoanContractManager";

const AdminRoutes = (props) => {
  const handleLoading = props.handleLoading;
  return (
    <>
      <Switch>
        <Route
          exact
          path={adminSlug.loanContract}
          render={() => <LoanContractManager {...props} />}
        ></Route>
      </Switch>
    </>
  );
};

export default AdminRoutes;
