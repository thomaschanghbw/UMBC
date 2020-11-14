import Lottie from 'react-lottie';
import animationData from 'public/loading.json';

export default function Loading(props) {
    let animationConfig = {
        loop: true,
        autoplay: true,
        animationData: animationData // the path to the animation json
    };
    return (
        <>
        <div>
            <Lottie options={animationConfig} isClickToPauseDisabled={true} />
        </div>
        </>
    )
}

