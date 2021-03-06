import {EMAIL, PASSWORD, API_KEY} from '../../constants/firebase'

export const LOGIN = "LOGIN";

const getToken = async () => {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: EMAIL,
            password: PASSWORD,
            returnSecureToken: true
          })
        }
      );
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        console.log('auth error', errorId)
        let message = "Something went wrong!";
        if (errorId === "EMAIL_NOT_FOUND") {
          message = "This email could not be found";
        } else if (errorId === "INVALID_PASSWORD") {
          message = "Wrong password";
        } else if (errorId === "QUOTA_EXCEEDED : Exceeded quota for verifying passwords.") {
          message = "Exceeded quota for verifying passwords.";
        }
        throw new Error(message);
      }
      const resData = await response.json();
      return resData.idToken
  };

  export const login = () => {
      return async dispatch => {
          try {
            const token = await getToken();
            dispatch({type: LOGIN, token: token})
          } catch (err) {
            throw err
          }
      }
  }