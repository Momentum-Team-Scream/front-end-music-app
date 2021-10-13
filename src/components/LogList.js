import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';
import { LogForm } from './LogForm.js';

export const LogList = ({ auth }) => {
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
      <LogForm auth={auth} />
      <h3>Past Practice Logs</h3>
      <div>
        {logs.map((log, idx) => {
          return (
            <div>
              <h2>{log.created_at}</h2>
              <p>
                <strong>What I practiced: </strong>
                {log.body} <strong>How Long I practiced: </strong>
                {log.time_practiced}
                <button
                  className="btn btn-secondary"
                  id={log.pk}
                  onClick={(e) => {
                    window.confirm(
                      'Are you sure you want to delete this practice log?'
                    );
                    handleDelete(e);
                  }}
                >
                  Delete
                </button>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
