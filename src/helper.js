import React from 'react';

export function RNHotspotHelper(actions) {
    return actions.map((action) => {
        return {
            ref: React.createRef(),
            onPress: action,
        };
    });
}
