
import "./Banner.css";
interface Tile {
  id: string | number;
  tileText: string;
}
interface BannerProps {
  tiles: Tile[];
  speed?: number;
}
const Banner = ({ tiles, speed = 5000 }: BannerProps) => {
    return (
        <div className="inner">
            <div className="scroll-wrapper">
                <section style={{ ["--speed" as any]: `${speed}ms` }}>
                    {tiles.map(({ id, tileText }: Tile) => (
                        <div className="image" key={id}>
                            <h1>{tileText}</h1>
                        </div>
                    ))}
                </section>
                <section style={{ ["--speed" as any]: `${speed}ms` }}>
                    {tiles.map(({ id, tileText }: Tile) => (
                        <div className="image" key={id}>
                            <h1>{tileText}</h1>
                        </div>
                    ))}
                </section>
                <section style={{ ["--speed" as any]: `${speed}ms` }}>
                    {tiles.map(({ id, tileText }: Tile) => (
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
