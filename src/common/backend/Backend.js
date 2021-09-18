const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9000";

export class BackendError extends Error {
  constructor(message) {
    super(message);
    this.name = "BackendError";
  }
}

export default class Backend {
  static call(method, params, retry = 5) {
    const requestParams = {
      method: "POST",
      cache: "no-cache",
      redirect: "error",
      body: JSON.stringify(params),
    };

    return new Promise((resolve, reject) => {
      fetch(`${API_URL}/${method}`, requestParams)
        .then((response) =>
          response
            .json()
            .then((data) => {
              if (!response.ok) reject(new BackendError(data.detail));
              resolve(data);
            })
            .catch(reject)
        )
        .catch((e) => {
          if (e instanceof TypeError && retry > 1) {
            // Network error
            setTimeout(() => {
              Backend.call(method, params, retry - 1)
                .then(resolve)
                .catch(reject);
            }, Math.random() * 1000);
          } else {
            reject(e);
          }
        });
    });
  }
}
