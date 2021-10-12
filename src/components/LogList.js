import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';
import { LogForm } from './LogForm.js';

export const LogList = ({ auth }) => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <LogForm />
      <h3>Past Practice Logs</h3>
      <Accordion defaultActiveKey="0">
        {logs.map((log, idx) => {
          return (
            <Accordion.Item eventKey={idx}>
              <Accordion.Header>{log.created_at}</Accordion.Header>
              <Accordion.Body>
                <strong>What I practiced: </strong>
                {log.body} <strong>How Long I practiced: </strong>
                {log.time_practiced}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </>
  );
};
