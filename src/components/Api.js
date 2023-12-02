class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: "ebfbe580-59e8-4623-9d1e-5edf14608279",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // other methods for working with the API

  loadInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      body: JSON.stringify({
        name: "Jacques Cousteau",
        about: "Sailor, researcher",
        avatar:
          "https://practicum-content.s3.us-west-1.amazonaws.com/frontend-developer/moved_avatar.jpg",
        _id: "e20537ed11237f86bbb20ccb",
        cohort: "group-42",
      }),
      headers: {
        authorization: "ebfbe580-59e8-4623-9d1e-5edf14608279",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }
}