import React from "react";
import { Link } from 'react-router-dom'
import "./SuccessNotification.scss";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";

const mapToProps = (store) => store

function SuccessNotification(store) {
  const { success, title, getResetAll } = store;

  const handleClearNotification = () => {
    getResetAll()
  }

  return (
    <div className="success">
      <div>
        <p>{success}</p>
        <button>
          <Link to='/login' className='btlg' onClick={handleClearNotification}>
            {title}
          </Link>
        </button>
      </div>
    </div>
  );
}

export default connect(mapToProps, actions)(SuccessNotification);
