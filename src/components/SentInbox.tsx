import React, { useEffect, useState, useReducer } from "react";
import data from "../MOCK_DATA.json";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import "./Inbox.css";

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

const SentInbox = () => {
  const [state, dispatch] = useReducer(pageReducer, initialState);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);

  const showSentMails = data.emails.filter((mail) => {
    return mail.isDeleted === false && mail.type === "Sent";
  });

  const allPages = Math.ceil(showSentMails.length / 50);

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

  const sentCount = data.emails.filter((mail) => {
    return mail.type === "Sent" && mail.isDeleted === false;
  });

  const lastMailIndex = state.page * 50;
  const firstMailIndex = lastMailIndex - 50;

  const currentMails = showSentMails.slice(firstMailIndex, lastMailIndex);

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
          {sentCount.length}
        </p>
        <FaAngleLeft onClick={prevHandler} />
        <FaAngleRight onClick={nextHandler} />
      </div>
      <div className="sent">
        {currentMails.map((mail) => {
          return (
            <div>
              {mail.isDeleted === false && mail.type === "Sent" ? (
                <div className="sent-mails" role="SentMails">
                  <div className="to">
                    <h4>{mail.to}</h4>
                  </div>

                  <div className="description">
                    <p>{mail.description}</p>
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
  );
};

export default SentInbox;
