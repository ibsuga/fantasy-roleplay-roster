import { useSpring, animated } from 'react-spring';
import './PopMenu.css';


const PopMenuAnimation = (props: {
    children: any,
    direction?: string,
}) => {

    const animations: any = {
        'top': {
            to: { y: 0, scale: 1, rotateZ: 0, rotateX: 0 },
            from: { y: 20, scale: 1, rotateZ: 0, rotateX: 0 },
            config: { mass: 15, friction: 220, tension: 4000 }
        },
        'default': {
            to: { y: 0, scale: 1, rotateZ: 0, rotateX: 0 },
            from: { y: -20, scale: 1, rotateZ: 0, rotateX: 0 },
            config: { mass: 15, friction: 220, tension: 4000 }
        }
    };

    const animation = useSpring(props.direction ? animations[props.direction] : animations['default']);
    const animation_opacity = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
    });
    return (
        <animated.div className={`popmenu`} style={{ ...animation, ...animation_opacity }} >
            {props.children}
        </animated.div>
    );
};

export default PopMenuAnimation;