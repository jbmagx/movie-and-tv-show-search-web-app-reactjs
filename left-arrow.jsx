export const LeftArrowIcon = ({ height, width, fill }) => (
    <svg height={height} width={width} viewBox="0 0 1024 1024">
        <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill={fill} />
    </svg>
);

LeftArrowIcon.defaultProps = {
    height: 16,
    width: 16,
    fill: "#000000"
};