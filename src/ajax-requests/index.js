export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api';

//* ACTIVITIES

export const allActivities = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const newActivity = async (activity) => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        activity
      )
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const updateActivity = async (activityId, token, activity) => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${activityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          activity
        )
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

    export const publicRoutineData = async (activityId) => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

  //* ROUTINE ACTIVITIES

export const updateRoutineActivity = async (routineActivityId, token, routineActivity) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          routineActivity
        )
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

  export const deleteRoutineActivity = async (routineActivityId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

 //* ROUTINES

// GET /routines
export const allRoutines = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      // method: "GET",
      headers: {
      'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    return result;
    } catch (err) {
    console.error(err);
    }
  }
   
  // POST /routines
  export const createRoutine = async (routine, token) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          routine
        )
      });

      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  // PATCH /routines/:routineId
  export const updateRoutine = async (routineId, token, routine) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(
          routine
        )
      });
      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  // DELETE /routines/:routineId
  export const deleteRoutine = async (routineId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await response.json();
      console.log(result);
      return result;

    } catch (err) {
      console.error(err);
    }
  }

  // POST /routines/:routineId/activities
  export const attachActivity = async (routineId, activity) => {
    try {
      const response = await fetch (`${BASE_URL}/routines/${routineId}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          activity
        )
      });

      const result = await response.json();
      console.log(result);
      return result;
      
    } catch (err) {
      console.error(err);
    }
  }
  
//* USERS

export const registerUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        user,
      )
    });
    console.log(user);  //! CONSOLE LOG

    const result = await response.json();
    console.log(result);  //! CONSOLE LOG


    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registeredUser = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        user
      )
    });
    const result = await response.json();

    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const myData = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };

  export const myRoutineData = async (username, token) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      return result
    } catch (err) {
      console.error(err);
    }
  };
