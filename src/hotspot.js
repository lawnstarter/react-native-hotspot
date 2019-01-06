import React, { PureComponent } from 'react';
import { findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';
import { Pulse } from './';

const RCTUIManager = require('NativeModules').UIManager;

export class RNHotspot extends PureComponent {
    static propTypes = {
        componentRefs: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            hotspots: null,
        };

        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        const { componentRefs } = this.props;

        const hotspots = [];

        setTimeout(() => {
            componentRefs.map(({ ref, onPress }) => {
                RCTUIManager.measure(
                    findNodeHandle(ref.current),
                    (x, y, width, height, pageX, pageY) => {
                        hotspots.push({
                            width,
                            height,
                            pageX,
                            pageY,
                            onPress,
                        });
                    }
                );
            });
            setTimeout(() => {
                this.setState({
                    hotspots,
                });
            }, 1);
        });
    }

    onPress(idx) {
        const { hotspots } = this.state;

        hotspots[idx].onPress();
        const newArr = hotspots.concat([]);

        newArr.splice(idx, 1);

        this.setState({
            hotspots: newArr,
        });
    }

    render() {
        const { hotspots } = this.state;
        const { componentRefs, ...otherProps } = this.props;

        if (!hotspots) {
            return null;
        }

        return hotspots.map(({ width, height, pageX, pageY }, idx) => {
            return (
                <Pulse
                    key={idx}
                    idx={idx}
                    dimensions={{ width, height, pageX, pageY }}
                    onPress={this.onPress}
                    {...otherProps}
                />
            );
        });
    }
}
