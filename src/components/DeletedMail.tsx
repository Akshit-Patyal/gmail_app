import React from "react";
import { useEffect, useState, useReducer } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import data from "../MOCK_DATA.json";
import "./Inbox.css";

type State = { page: number };
type Action =
  | {
      type: "PAGE" | "INC" | "DEC";
    }
  | {
      type: "TOTAL";
      payload: number;
    };

const initialState = {
  page: 1,
};

function pageReducer(state: State, action: Action) {
  switch (action.type) {
    case "PAGE":
      return {
        page: 1,
      };
    case "INC":
      return {
        page: state.page + 1,
      };
    case "DEC":
      return {
        page: state.page - 1,
      };
    case "TOTAL":
      return {
        page: action.payload,
      };
  }
}

const DeletedMail = () => {
  const [emails, setEmails] = useState([]);
  const [state, dispatch] = useReducer(pageReducer, initialState);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const showTrashMails = data.emails.filter((mail) => {
    return mail.isDeleted === true;
  });

  const allPages = Math.ceil(showTrashMails.length / 50);

  const disableButton = (currentPage: number) => {
    if (currentPage === 1) {
      setPrev(true);
      setNext(false);
    } else if (currentPage === allPages) {
      setNext(true);
    } else {
      setNext(false);
      setPrev(false);
    }
  };

  useEffect(() => {
    disableButton(state.page);
  }, [state.page]);

  const trashCount = data.emails.filter((mail) => {
    return mail.isDeleted === true;
  });

  const lastMailIndex = state.page * 50;
  const firstMailIndex = lastMailIndex - 50;

  const currentMails = showTrashMails.slice(firstMailIndex, lastMailIndex);

  const prevHandler = () => {
    if (state.page > 1) {
      dispatch({ type: "DEC" });
    } else {
      dispatch({ type: "PAGE" });
    }
  };

  const nextHandler = () => {
    if (state.page < allPages) {
      dispatch({ type: "INC" });
      setPrev(false);
    } else {
      dispatch({ type: "TOTAL", payload: allPages });
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  function fetchEmails() {
    fetch("http://localhost:3000/emails").then((result) => {
      result.json().then((response) => {
        setEmails(response);
      });
    });
  }

  return (
    <div className="container">
      <div className="pagination">
        <p>
          {firstMailIndex + 1} - {firstMailIndex + currentMails.length} of{" "}
          {trashCount.length}
        </p>
        <FaAngleLeft onClick={prevHandler} />
        <FaAngleRight onClick={nextHandler} />
      </div>
      <div className="trash">
        {currentMails.map((mail) => {
          return (
            <>
              {mail.isDeleted === true ? (
                <div
                  className={`trash-mails ${mail.isMailedRead && `mail-read`}`}
                  role="DeletedMails"
                >
                  <div className="from">
                    <h4>{mail.from}</h4>
                  </div>

                  <div className="description">
                    <p>{mail.description}</p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default DeletedMail;
