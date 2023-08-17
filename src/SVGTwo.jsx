import React, { useEffect, useState } from "react";

const emptyCoordinate = { sx: 0, sy: 0, ex: 0, ey: 0 };
const style = {
  width: "500px",
  height: "500px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
};

const SVGTwo = () => {
  const [click, setClick] = useState(0);
  const [coordinates, setCoordinates] = useState(emptyCoordinate);
  const [firstClick, setFirstClick] = useState({});
  const [walls, setWalls] = useState([]);
  const [shadowWall, setShadowWall] = useState(emptyCoordinate);

  // Reset state when leaving SVG area
  const handleMouseLeave = () => {
    setClick(0);
    setFirstClick({});
    setShadowWall(emptyCoordinate);
  };

  // Update shadow wall on mouse move
  const handleMouseMove = (event) => {
    if (click === 1) {
      setShadowWall({
        sx: firstClick.sx,
        sy: firstClick.sy,
        ex: event.nativeEvent.offsetX,
        ey: event.nativeEvent.offsetY,
      });
    } else if (click >= 1) {
      const lastWall = walls[walls.length - 1];
      setShadowWall({
        sx: lastWall.ex,
        sy: lastWall.ey,
        ex: event.nativeEvent.offsetX,
        ey: event.nativeEvent.offsetY,
      });
    }
  };

  // Update walls on click
  useEffect(() => {
    if (click >= 2) {
      setWalls((prev) => [...prev, coordinates]);
    }
  }, [click, coordinates]);

  // Update click and coordinates on SVG click
  const handleSVGClick = (event) => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - svgRect.left;
    const offsetY = event.clientY - svgRect.top;

    if (click === 0) {
      setCoordinates({ sx: offsetX, sy: offsetY, ex: 0, ey: 0 });
      setFirstClick({ sx: offsetX, sy: offsetY });
      setClick(1);
    } else if (click === 1) {
      setCoordinates((prev) => ({ ...prev, ex: offsetX, ey: offsetY }));
      setClick(2);
    } else {
      const lastWall = walls[walls.length - 1];
      setCoordinates({
        sx: lastWall.ex,
        sy: lastWall.ey,
        ex: offsetX,
        ey: offsetY,
      });
      setClick(click + 1);
    }
  };

  return (
    <div style={style}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleSVGClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        {walls.map(({ sx, sy, ex, ey }, i) => (
          <line
            x1={sx}
            y1={sy}
            x2={ex}
            y2={ey}
            stroke="white"
            strokeWidth="2"
            key={i}
          />
        ))}

        {shadowWall.sx && (
          <line
            x1={shadowWall.sx}
            y1={shadowWall.sy}
            x2={shadowWall.ex}
            y2={shadowWall.ey}
            stroke="gray"
            strokeWidth="1.5"
          />
        )}
      </svg>
    </div>
  );
};

export default SVGTwo;
