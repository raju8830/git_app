require('dotenv').config();
const path = require('path');
import axios from 'axios';
import express from 'express';
let vue_cli_client_url = "http://localhost:8080";

export default (app, http) => {
  app.use(express.json());
  
  app.get('/auth', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=9a376eeee523f5b8f8d6`,
    );
  });
  
  app.get('/oauth-callback', ({ query: { code } }, res) => {
    const body = {
      client_id: "9a376eeee523f5b8f8d6",
      client_secret: "6331be1e119df1376535badff274e65122e27f78",
      code,
    };
    const opts = { headers: { accept: 'application/json' } };
    axios
      .post('https://github.com/login/oauth/access_token', body, opts)

      .then((_res) => _res.data.access_token)
      .then((token) => {
        console.log('My token:', token);
        res.redirect(`${vue_cli_client_url}/?token=${token}`);
      })
      .catch((err) => res.status(500).json({ err: err.message }));
  });
  
  
  

}
