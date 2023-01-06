import React from "react";
import "./Inbox.css";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { CiRead } from "react-icons/ci";
import data from "../MOCK_DATA.json";
import { useEffect } from "react";
import { useState, useReducer } from "react";

type State = { page: number }
type Action = { 
  type: 'PAGE' | 'INC' | 'DEC' 
} | {
  type: 'TOTAL',
  payload: number
}
 
const initialState = {
  page : 1
}

function pageReducer(state: State, action: Action) { 
  switch (action.type) {
    case 'PAGE':
      return {
        page: 1
      };
    case 'INC':
      return {
        page: state.page + 1
      };
    case 'DEC':
      return {
        page: state.page - 1
      };
    case 'TOTAL':
      return {
        page: action.payload
      };
}
}

const Inbox = () => {
  const [state, dispatch] = useReducer(pageReducer, initialState);
  const [emails, setEmails] = useState([]);
  
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const showInboxMails = data.emails.filter((mail) => {
    return mail.isDeleted === false && mail.type === "Inbox";
  });

  const allPages = Math.ceil(showInboxMails.length / 50);

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

  function deleteEmail(
    id: number,
    to: string,
    from: string,
    isMailedRead: boolean,
    isDeleted: boolean,
    subject: string,
    type: string,
    description: string
  ) {
    isDeleted = !isDeleted;
    let item = {
      id,
      to,
      from,
      description,
      isMailedRead,
      isDeleted,
      subject,
      type,
    };
    fetch(`http://localhost:3000/emails/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        fetchEmails();
      });
    });
  }

  function markAsReadEmail(
    id: number,
    to: string,
    from: string,
    isMailedRead: boolean,
    isDeleted: boolean,
    subject: string,
    type: string,
    description: string
  ) {
    isMailedRead = !isMailedRead;
    let item = {
      id,
      to,
      from,
      description,
      isMailedRead,
      isDeleted,
      subject,
      type,
    };
    fetch(`http://localhost:3000/emails/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((response) => {
        console.warn(response);
        fetchEmails();
      });
    });
  }

  const inboxCount = data.emails.filter((mail) => {
    return mail.type === "Inbox" && mail.isDeleted === false;
  });

  const lastMailIndex = state.page * 50;
  const firstMailIndex = lastMailIndex - 50;

  const currentMails = showInboxMails.slice(firstMailIndex, lastMailIndex);

  const prevHandler = () => {
    if (state.page > 1) {
      dispatch({ type: 'DEC' });
    } else {
      dispatch({type: 'PAGE'})
    }
  };

  const nextHandler = () => {
    if (state.page < allPages) {
      dispatch({ type: 'INC' });
      setPrev(false);
    } else {
      dispatch({ type: 'TOTAL', payload: allPages });
    }
  };

  return (
    <div className="container">
      <div className="pagination">
        <p>
          {firstMailIndex + 1} - {firstMailIndex + currentMails.length} of{" "}
          {inboxCount.length}
        </p>
        <FaAngleLeft onClick={prevHandler} />
        <FaAngleRight onClick={nextHandler} />
      </div>

      <div>
        <div className="inbox">
          {currentMails.map((mail) => {
            return (
              <div>
                {mail.isDeleted === false && mail.type === "Inbox" ? (
                  <div
                    className={`unread-mail ${
                      mail.isMailedRead && `mail-read`
                    }`}
                    role="inboxItem"
                  >
                    <div className="from">
                      <h4>{mail.from}</h4>
                    </div>

                    <div className="description">
                      <p>{mail.description}</p>
                    </div>

                    <div className="icons">
                      <BsTrash
                        onClick={() =>
                          deleteEmail(
                            mail.id,
                            mail.to,
                            mail.from,
                            mail.isMailedRead,
                            mail.isDeleted,
                            mail.subject!,
                            mail.type,
                            mail.description
                          )
                        }
                      />
                      <CiRead
                        onClick={() =>
                          markAsReadEmail(
                            mail.id,
                            mail.to,
                            mail.from,
                            mail.isMailedRead,
                            mail.isDeleted,
                            mail.subject!,
                            mail.type,
                            mail.description
                          )
                        }
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
