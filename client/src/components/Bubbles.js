import React, { useState, useEffect } from "react";
import { Pack, Grid } from "@potion/layout";
import { Svg, Circle, LineRadial } from "@potion/element";

const Bubbles = ({ colors }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

  return (
    <div className="bubble-wrap">
      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                    // <LineRadial
                    //   key={key}
                    //   radius={50}
                    //   angle={({ angle }) => angle}
                    //   fill={colors[i].code.hex}
                    //   stroke='black'
                    //   points={[
                    //     { angle: 0 },
                    //     { angle: Math.PI * 0.25 },
                    //     { angle: Math.PI * 0.5 },
                    //     { angle: Math.PI * 0.75 },
                    //     { angle: Math.PI },
                    //     { angle: Math.PI * 1.25 },
                    //     { angle: Math.PI * 1.5 },
                    //     { angle: Math.PI * 1.75 },
                    //     { angle: Math.PI * 2 },
                    //   ]}
                    //   strokeWidth={4}
                    // />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
