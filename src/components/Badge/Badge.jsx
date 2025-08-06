import { FaNpm, FaGithub, FaLinkedin } from 'react-icons/fa';


const Badge = ({ clickable = true, color, label, size = 'small', link = '', icon = '0', width = '8em', margin = '0', padding = '0', background = '' }) => {



    const renderIcon = () => {
        if (icon === 'github') {
            return <FaGithub size={size} color='white' />;
        } else if (icon === 'npm') {
            return <FaNpm color='red' size={size} />;
        } else if (icon === 'linkedin') {
            return <FaLinkedin color='lightblue' size={size} />;
        }
    };

    return (
        <div style={{ cursor: 'pointer', width: width, margin: margin }} >
            <a href={clickable ? link : undefined} className="" target={"_blank"} style={{ cursor: 'pointer', width: '100%', margin: '0', padding: padding }}  >
                <p style={{
                    margin: '0',
                    display: 'flex',
                    justifyContent: label === 'GitHub' || label === 'LinkedIn' ? '' : 'center',
                    gap: '1em',
                    alignItems: 'center'
                }}>
                    {icon != 0 ?
                        renderIcon()
                        : null
                    }
                    {label}
                </p>
            </a>

        </div>
    )
}

export default Badge