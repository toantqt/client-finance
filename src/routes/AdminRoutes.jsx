import { Redirect, Route, Switch } from "react-router-dom";
import adminSlug from "../resources/AdminSlug";
import LoanBriefManager from "../screens/Admin/Loan Brief/screens/LoanBriefManager";
import LoanContractManager from "../screens/Admin/Loan Contract/screens/Loan Contract Manager/LoanContractManager";
import RegisterLoanManager from "../screens/Admin/Register Loan/screens/RegisterLoanManager";
import SendingContractManager from "../screens/Admin/Sending Contract/screens/SendingContractManager";
import UserManager from "../screens/Admin/User/screens/UserManager";

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
        <Route
          exact
          path={adminSlug.sendingContract}
          render={() => <SendingContractManager {...props} />}
        ></Route>

        <Route
          exact
          path={adminSlug.registerLoan}
          render={() => <RegisterLoanManager {...props} />}
        ></Route>
        <Route
          exact
          path={adminSlug.userManager}
          render={() => <UserManager {...props} />}
        ></Route>

        <Route
          exact
          path={adminSlug.loanBrief}
          render={() => <LoanBriefManager {...props} />}
        ></Route>

        <Route
          exact
          path={adminSlug.borrowProduct}
          render={() => <LoanBriefManager {...props} />}
        ></Route>
      </Switch>
    </>
  );
};

export default AdminRoutes;
