import * as React from 'react';
import { Pressable } from 'react-native';

interface ISafeTouchProps {
    onPress: () => void
    onLongPress?: () => void
    onPressIn?: () => void
    onPressOut?: () => void,
    activeOpacity?: number,
    disabled?: boolean,
    style: any
}
// TODO: Class component -> Func component
// This code from https://stackoverflow.com/questions/60567058/react-navigation-prevent-double-push

export class SafeTouch extends React.PureComponent<ISafeTouchProps> {
    public static defaultProps: ISafeTouchProps = {
        onPress: () => { },
        onLongPress: () => { },
        onPressIn: () => { },
        onPressOut: () => { },
        disabled: false,
        style: () => { },
    }

    private isTouchValid: boolean = true

    private touchTimeout: any = null

    public constructor(props: ISafeTouchProps) {
        super(props);
        { // Binding methods
            this.onPressEvent = this.onPressEvent.bind(this);
        }
    }

    public render(): JSX.Element {
        return (
            <Pressable
                onPress={this.onPressEvent}
                onLongPress={this.props.onLongPress}
                onPressIn={this.props.onPressIn}
                onPressOut={this.props.onPressOut}
                activeOpacity={this.props.activeOpacity}
                disabled={this.props.disabled}
                style={this.props.style}
            >
                {
                    this.props.children
                }
            </Pressable>
        );
    }

    public componentWillUnmount() {
        this.clearTimeoutIfExists();
    }

    private onPressEvent(): void {
        requestAnimationFrame(() => {
            if (this.isTouchValid === false) {
                return;
            }
            this.isTouchValid = false;
            this.clearTimeoutIfExists();
            this.touchTimeout = setTimeout(() => {
                this.isTouchValid = true;
            }, 2000);
            if (typeof this.props.onPress === 'function') {
                this.props.onPress();
            }
        });
    }

    private clearTimeoutIfExists(): void {
        if (this.touchTimeout != null) {
            clearTimeout(this.touchTimeout);
            this.touchTimeout = null;
        }
    }
}
