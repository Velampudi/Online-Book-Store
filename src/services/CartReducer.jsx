function reducer(state, action) {
    console.log(action);

    switch(action.type) {
        case 'REMOVE': {
            const filteredFlowers = state.filter(flower => flower.id !== action.id);

            return filteredFlowers;
        } 
        case 'INCREMENT': {

            const modifiedFlowers = state.map(flower => {
                if (flower.id === action.id) {
                    return { ...flower, quantity: flower.quantity + 1 };
                } else {
                    return flower;
                }
            });
            return modifiedFlowers;
        }
        case 'DECREMENT': {
            const modifiedFlowers = state.map(flower => {
                if (flower.id === action.id) {
                    return { ...flower, quantity: flower.quantity - 1 };
                } else {
                    return flower;
                }
            });
            return modifiedFlowers;
        }
        case 'ADD': {
            return action.data;
        }
    }

    return state;
}

export default reducer;