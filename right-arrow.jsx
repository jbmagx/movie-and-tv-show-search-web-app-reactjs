export const RightArrowIcon = ({ height, width, fill }) => (
    <svg height={height} width={width} viewBox="0 0 1024 1024">
        <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill={fill} />
    </svg>
);

RightArrowIcon.defaultProps = {
    height: 16,
    width: 16,
    fill: "#000000"
};