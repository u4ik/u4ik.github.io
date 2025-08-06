
import "./Banner.css";
const Banner = ({ tiles, speed = 5000 }) => {
    return (
        <div className="inner">
            <div className="scroll-wrapper">
                <section style={{ "--speed": `${speed}ms` }}>
                    {tiles.map(({ id, tileText }) => (
                        <div className="image" key={id}>
                            <h1>{tileText}</h1>
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {tiles.map(({ id, tileText }) => (
                        <div className="image" key={id}>
                            <h1>{tileText}</h1>
                        </div>
                    ))}
                </section>
                <section style={{ "--speed": `${speed}ms` }}>
                    {tiles.map(({ id, tileText }) => (
                        <div className="image" key={id}>
                            <h1>{tileText}</h1>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default Banner ;
