import type { ComponentProps, CSSProperties } from "react";

type Direction = "top" | "right" | "bottom" | "left";

type MultiBorderProps = ComponentProps<"div"> & {
  colors?: string[];
  directions?: Direction[];
  width?: number;
};

const SIDE_MAP: Record<Direction, string> = {
  top: "Top",
  right: "Right",
  bottom: "Bottom",
  left: "Left",
};

const SHADOW_TEMPLATE: Record<Direction, (o: number, c: string) => string> = {
  top: (o, c) => `inset 0 ${o}px 0 0 ${c}`,
  right: (o, c) => `inset -${o}px 0 0 0 ${c}`,
  bottom: (o, c) => `inset 0 -${o}px 0 0 ${c}`,
  left: (o, c) => `inset ${o}px 0 0 0 ${c}`,
};

function generateBorderStyles(
  colors: string[],
  directions: Direction[],
  width: number
): CSSProperties {
  if (colors.length === 0) {
    return {};
  }

  const [outerColor, ...innerColors] = colors;
  const result: Record<string, string | number> = {};

  for (const dir of directions) {
    const side = SIDE_MAP[dir];
    result[`border${side}Width`] = width;
    result[`border${side}Color`] = outerColor;
    result[`border${side}Style`] = "solid";
  }

  const shadows = innerColors.flatMap((color, i) => {
    const offset = width * (i + 1);
    return directions.map((dir) => SHADOW_TEMPLATE[dir](offset, color));
  });

  if (shadows.length > 0) {
    result.boxShadow = shadows.join(", ");
  }

  return result;
}

export function MultiBorder({
  children,
  className,
  colors = ["var(--border)"],
  directions = ["top", "right", "bottom", "left"],
  width = 1,
  style,
  ...props
}: MultiBorderProps) {
  const borderStyles = generateBorderStyles(colors, directions, width);

  return (
    <div className={className} style={{ ...borderStyles, ...style }} {...props}>
      {children}
    </div>
  );
}
