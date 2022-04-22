import { Redirect, Route, Switch } from "react-router-dom";
import adminSlug from "../resources/AdminSlug";
import BorrowProductManager from "../screens/Admin/Borrow Product/screens/BorrowProductManager";
import EditBorow from "../screens/Admin/Borrow Product/screens/EditBorrow";
import ContactManager from "../screens/Admin/Contact Manager/screens/ContactManager";
import CreateContact from "../screens/Admin/Contact Manager/screens/CreateContact";
import EditContact from "../screens/Admin/Contact Manager/screens/EditContact";
import Deposits from "../screens/Admin/Deposits/screens/Deposits";
import EditDeposits from "../screens/Admin/Deposits/screens/EditDeposits";
import InterestRateManager from "../screens/Admin/Interest Rate/screens/InterestRateManager";
import LoanBriefManager from "../screens/Admin/Loan Brief/screens/LoanBriefManager";
import LoanContractManager from "../screens/Admin/Loan Contract/screens/Loan Contract Manager/LoanContractManager";
import CreateNews from "../screens/Admin/News Manager/screens/CreateNews";
import NewsManager from "../screens/Admin/News Manager/screens/NewsManager";
import CreateNotificationAll from "../screens/Admin/Notification/screens/CreateNotificationAll";
import Notifcation from "../screens/Admin/Notification/screens/Notification";
import RegisterLoanManager from "../screens/Admin/Register Loan/screens/RegisterLoanManager";
import SendingContractManager from "../screens/Admin/Sending Contract/screens/SendingContractManager";
import CreateUser from "../screens/Admin/User/screens/CreateUser";
import ProfileUser from "../screens/Admin/User/screens/ProfileUser";
import UserManager from "../screens/Admin/User/screens/UserManager";
import Voucher from "../screens/Admin/Voucher/screens/Voucher";

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
          path={adminSlug.profileUser}
          render={(props) => (
            <ProfileUser {...props} handleLoading={handleLoading} />
          )}
        ></Route>
        <Route
          exact
          path={adminSlug.createUser}
          render={(props) => (
            <CreateUser {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.loanBrief}
          render={() => <LoanBriefManager {...props} />}
        ></Route>
        <Route
          exact
          path={adminSlug.borrowProduct}
          render={() => <BorrowProductManager {...props} />}
        ></Route>
        <Route
          exact
          path={adminSlug.editBorrow}
          render={(props) => (
            <EditBorow handleLoading={handleLoading} {...props} />
          )}
        ></Route>
        <Route
          exact
          path={adminSlug.addNews}
          render={(props) => (
            <CreateNews handleLoading={handleLoading} {...props} />
          )}
        ></Route>
        <Route
          exact
          path={adminSlug.newsManager}
          render={(props) => (
            <NewsManager handleLoading={handleLoading} {...props} />
          )}
        ></Route>
        <Route
          exact
          path={adminSlug.interestRateManager}
          render={(props) => (
            <InterestRateManager handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.notification}
          render={(props) => (
            <Notifcation handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.createNotificationAll}
          render={(props) => (
            <CreateNotificationAll handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.voucherManager}
          render={(props) => (
            <Voucher handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.depositsManager}
          render={(props) => (
            <Deposits handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.editDeposits}
          render={(props) => (
            <EditDeposits handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.contactManager}
          render={(props) => (
            <ContactManager handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.createContact}
          render={(props) => (
            <CreateContact handleLoading={handleLoading} {...props} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.editContact}
          render={(props) => (
            <EditContact handleLoading={handleLoading} {...props} />
          )}
        ></Route>
      </Switch>
    </>
  );
};

export default AdminRoutes;
