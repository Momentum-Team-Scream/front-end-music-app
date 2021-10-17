import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';
import { LogForm } from './LogForm.js';
import '../styles/studentdash.css';

export const LogList = ({ auth, show, setShow }) => {
  const [logs, setLogs] = useState([]);
  const history = useHistory();

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    if (auth) {
      axios
        .get(`https://music-mvp.herokuapp.com/api/practices/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${auth}`,
          },
        })
        .then((res) => setLogs(res.data));
    }
  }, [auth]);

  const handleDelete = (event) => {
    const pk = event.target.id;
    return axios
      .delete(`https://music-mvp.herokuapp.com/api/practices/${pk}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${auth}`,
        },
      })
      .then(() => {
        refreshPage();
      });
  };

  return (
    <>
      <div className="dash-body col-xxl-12 row flex-lg-row-reverse justify-content-center">
        <div className="body-item col-lg-6">
          <LogForm auth={auth} show={show} setShow={setShow} />
        </div>
        <div className="body-item col-lg-6">
          <h3>Past Practice Logs:</h3>
          <div>
            {logs.map((log, idx) => {
              return (
                <div className="card card-list" key={idx}>
                  <div className="card-header header-gray">
                    Practice Log From {log.created_at}
                  </div>
                  <div className="card-body cd-body">
                    <h5 className="card-title">
                      <strong>I practiced: </strong>
                      {log.body}
                    </h5>
                    <strong>For: </strong>
                    {log.time_practiced} minutes
                    <button
                      className="logdel delButton btn btn-destroy"
                      id={log.pk}
                      onClick={(e) => {
                        if (
                          window.confirm(
                            'Are you sure you want to delete this practice log?'
                          )
                        )
                          handleDelete(e);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
