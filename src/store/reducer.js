
/**
* hold dall the potential exercise states
*/
export const states = {
  ACTIVE: 'ACTIVE',
  PASSIVE: 'PASSIVE',
  RESTING: 'RESTING',
  IDLE: 'IDLE',
  COMPLETE: 'COMPLETE'
}


export const initialState = {
  activeSessionTime: 3,
  passiveSessionTime: 2,
  restingTime: 10,
  numberOfExercisesPerRound: 1,
  activeCombos: [[1,2], [3,2], [5,2]],
  passiveCombos: [[2,5], [3,6], [5,2]],
  roundIndex: 0,
  currentState: states.IDLE,
  currentExerciseRound: 1
};

export const reducer = (state, action) => {
  switch(action.type) {
    case "ACTIVE_EXERCISE_FINISHED": {
      return {
        ...state,
        currentState: states.PASSIVE
      }
    }
    case "PASSIVE_EXERCISE_FINISHED": { 
      const {currentExerciseRound, numberOfExercisesPerRound} = state;
      let newState;
      let newExersizeNumber = currentExerciseRound;
      if(state.currentExerciseRound === numberOfExercisesPerRound) {
        newState = states.RESTING;
      } else {
        newState = states.ACTIVE;
        newExersizeNumber = currentExerciseRound + 1;
      }
      return {
        ...state,
        currentState: newState,
        currentExerciseRound: newExersizeNumber
      }
    }
    case "RESTING_FINISHED": { 
      const { roundIndex, activeCombos } = state;
      const newIndex = roundIndex + 1;
      let newState;
      if(!activeCombos[newIndex]) {       
        newState = states.COMPLETE;
      } else { 
        newState = states.ACTIVE;
      }
      return {
        ...state,
        currentState: newState,
        roundIndex: newIndex
      }
    }
    case "GET_READY_FINISHED": {
      return {
        ...state,
        currentState: states.ACTIVE
      }
    }
  }
}