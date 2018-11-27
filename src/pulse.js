import React, { PureComponent } from 'react';
import { Animated, Easing, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';

// https://github.com/facebook/react-native/issues/8968#issuecomment-314322836
// Android currently has a limitation where the parent component will restrict the full radius
// of the pulse.

export class Pulse extends PureComponent {
    static propTypes = {
        dimensions: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            pageX: PropTypes.number.isRequired,
            pageY: PropTypes.number.isRequired,
        }).isRequired,
        onPress: PropTypes.func,
        offset: PropTypes.shape({
            top: PropTypes.number,
            left: PropTypes.number,
        }),
        startSize: PropTypes.number,
        endSize: PropTypes.number,
        borderWidth: PropTypes.number,
        borderColor: PropTypes.string,
        backgroundColor: PropTypes.string,
        duration: PropTypes.number,
        stagger: PropTypes.number,
    };

    static defaultProps = {
        onPress: null,
        offset: {
            top: 0,
            left: 0,
        },
        startSize: 10,
        endSize: 80,
        borderWidth: 3,
        borderColor: 'rgba(249, 161, 27, 0.4)',
        backgroundColor: 'rgba(249, 161, 27, 0.6)',
        duration: 2000,
        stagger: 400,
    };

    constructor(props) {
        super(props);

        this.animations = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
        const { duration, stagger } = this.props;
        const animations = this.animations.map((item) => {
            return Animated.timing(item, {
                toValue: 1,
                duration,
                easing: Easing.in,
            });
        });
        Animated.loop(Animated.stagger(stagger, animations)).start();
    }

    render() {
        const {
            dimensions,
            onPress,
            offset,
            startSize,
            endSize,
            borderWidth,
            borderColor,
            backgroundColor,
        } = this.props;

        const animations = this.animations.map((animation, idx) => {
            return (
                <TouchableWithoutFeedback key={idx} onPress={() => {}}>
                    <View
                        style={[
                            defaultStyles.overlay,
                            {
                                width: dimensions.width,
                                height: dimensions.height,
                                top: dimensions.pageY + offset.top,
                                left: dimensions.pageX + offset.left,
                                backgroundColor: 'transparent',
                                zIndex: 100,
                            },
                        ]}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                onPress(this.props.idx);
                            }}
                            testID="tappableArea"
                        >
                            <View
                                style={[
                                    defaultStyles.overlay,
                                    {
                                        width: endSize,
                                        height: endSize,
                                        top: dimensions.height / 2 - endSize / 2 + offset.top,
                                        left: dimensions.width / 2 - endSize / 2 + offset.left,
                                        zIndex: 101,
                                    },
                                ]}
                                testID="pulseOverlay"
                            >
                                <Animated.View
                                    style={[
                                        {
                                            borderWidth: borderWidth * StyleSheet.hairlineWidth,
                                            borderColor,
                                            backgroundColor,
                                            width: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [startSize, endSize],
                                            }),
                                            height: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [startSize, endSize],
                                            }),
                                            borderRadius: endSize / 2,
                                            opacity: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [1, 0],
                                            }),
                                        },
                                    ]}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            );
        });

        return animations;
    }
}

const defaultStyles = StyleSheet.create({
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
});
