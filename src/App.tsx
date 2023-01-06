import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import Header from "./components/Header";
import SentInbox from "./components/SentInbox";
import SideNavList from "./components/SideNavList";
import DeletedMail from "./components/DeletedMail";
import data from "./MOCK_DATA.json";
import Inbox from "./components/Inbox";

function App() {
  const inboxNavCount = data.emails.filter((mail) => {
    return (
      mail.isMailedRead === false &&
      mail.type === "Inbox" &&
      mail.isDeleted === false
    );
  });

  const sentNavCount = data.emails.filter((mail) => {
    return mail.type === "Sent" && mail.isDeleted === false;
  });

  const trashNavCount = data.emails.filter((mail) => {
    return mail.isDeleted === true;
  });

  return (
    <div className="App">
      <Header />

      <div className="app-content">
        <SideNavList
          inboxNavCount={inboxNavCount.length}
          sentNavCount={sentNavCount.length}
          trashNavCount={trashNavCount.length}
        />

        <Switch>
          <Route exact path="/">
            <Inbox />
          </Route>

          <Route exact path="/sent">
            <SentInbox />
          </Route>

          <Route path="/trash" exact>
            <DeletedMail />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
