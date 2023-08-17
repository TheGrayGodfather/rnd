import { useEffect, useState } from "react";

const coordinate = { sx: 0, sy: 0, ex: 0, ey: 0 };
const style = {
  width: "500px",
  height: "500px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
};

const SVGOne = () => {
  const [click, setClick] = useState(0);
  const [coordinates, setCoordinates] = useState(coordinate);
  const [walls, setWalls] = useState([]);

  useEffect(() => {
    if (click >= 2) {
      setWalls((prev) => [...prev, coordinates]);
    }
  }, [click]);

  const handleSVGClick = (event) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - svgRect.left;
    const offsetY = event.clientY - svgRect.top;

    if (click === 0) {
      setCoordinates((prev) => ({ ...prev, sx: offsetX, sy: offsetY }));
      setClick((prev) => prev + 1);
    } else if (click === 1) {
      setCoordinates((prev) => ({ ...prev, ex: offsetX, ey: offsetY }));
      setClick((prev) => prev + 1);
    } else {
      const lastWall = walls[walls.length - 1];
      setCoordinates({
        sx: lastWall.ex,
        sy: lastWall.ey,
        ex: offsetX,
        ey: offsetY,
      });
      setClick((prev) => prev + 1);
    }
  };

  return (
    <div style={style}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleSVGClick}
        style={{ position: "relative" }}
      >
        {walls.length
          ? walls.map(({ sx, sy, ex, ey }, i) => (
              <line
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="white"
                strokeWidth="2"
                key={i}
              />
            ))
          : null}
      </svg>
    </div>
  );
};

export default SVGOne;
