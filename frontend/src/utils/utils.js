import { Api } from "./Api.js";

//API INITIALIZING
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  headers: {
    authorization: "79d0facd-6ee6-4095-a416-6e7e24695299",
    "Content-Type": "application/json",
  },
});

// Exporting the data
export { api };