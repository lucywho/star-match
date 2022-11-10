import { utils } from "../utils"

const StarDisplay = (props) => (
    <>
        {utils.range(1, props.stars).map((starId) => (
            <div
                key={starId}
                className="star"
                style={{ color: "goldenrod" }}
            ></div>
        ))}
    </>
)

export default StarDisplay
