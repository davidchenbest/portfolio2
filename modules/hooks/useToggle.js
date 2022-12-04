import { useState } from 'react'

export default initialState => {
    const [state, setState] = useState(initialState || false);

    return [state, () => setState(!state)];
};