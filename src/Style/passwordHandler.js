const toShowIconUrl = 'https://img.icons8.com/?size=512&id=38869&format=png';
const toHideIconUrl = 'https://img.icons8.com/?size=512&id=r9g0CfaDv5fz&format=png';

const passwordIconStyle = (isHovered) => {
    return (
        {
            height: '2rem',
            width: '2rem',
            position: 'absolute',
            top: '34px',
            right: '10px',
            transition: 'transform 0.4s',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            cursor: isHovered ? 'pointer' : 'auto'
        }
    )
}

const showPassIconHandler = (e, toShowPassword, setToShowPassword) => {
    e.preventDefault();
    toShowPassword ? setToShowPassword(false) : setToShowPassword(true);
}

module.exports = {
    toShowIconUrl,
    toHideIconUrl,
    passwordIconStyle,
    showPassIconHandler
}