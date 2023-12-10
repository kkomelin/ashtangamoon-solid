import * as d3 from "d3";

const lightColor = "#ffffff";
const darkColor = "#466380";

function calculateParams(radius: number, phase: number) {
  const params = {
    first: {
      x: 0,
      shape: "circle",
      color: lightColor,
    },
    second: {
      x: 0,
      shape: "circle",
      color: darkColor,
    },
  };

  if (phase >= 0 && phase < 0.245) {
    params.second.x = -(radius * 2 * phase) * 1.5;
  } else if (phase >= 0.245 && phase < 0.255) {
    params.second.shape = "rect";
    params.second.x = -radius;
  } else if (phase >= 0.255 && phase <= 0.5) {
    params.first.color = darkColor;
    params.second.color = lightColor;
    params.second.x = radius * 2 * (1 - phase) - radius;
  } else if (phase > 0.5 && phase < 0.745) {
    params.first.color = darkColor;
    params.second.color = lightColor;
    params.second.x = -radius * 2 * phase + radius;
  } else if (phase >= 0.745 && phase < 0.755) {
    params.first.color = darkColor;
    params.second.color = lightColor;
    params.second.shape = "rect";
    params.second.x = -radius;
  } else if (phase >= 0.755 && phase <= 1) {
    params.first.color = lightColor;
    params.second.color = darkColor;
    params.second.x = radius * 2 * (1 - phase);
  }

  return params;
}

function renderRoot(
  ref: SVGSVGElement,
  width: number,
  height: number,
  radius: number
) {
  const root = d3.select(ref);

  const mask = root
    .append("defs")
    .append("clipPath")
    .attr("clipPathUnits", "userSpaceOnUse")
    .attr("id", "hole");

  mask
    .append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", radius)
    .attr("shape-rendering", "geometricPrecision");

  return root
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "root-view")
    .attr("clip-path", "url(#hole)");
}

function renderMoon(
  root: any,
  id: number,
  x: number,
  y: number,
  radius: number,
  shape: string,
  color: string
) {
  if (shape === "rect") {
    return root
      .append("rect")
      .attr("id", "moon" + id)
      .attr("x", x - radius)
      .attr("y", y - radius)
      .attr("width", radius * 2)
      .attr("height", radius * 2)
      .style("fill", color)
      .attr("shape-rendering", "geometricPrecision");
  }

  root
    .append("circle")
    .attr("id", "moon" + id)
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", radius)
    .style("fill", color)
    .attr("shape-rendering", "geometricPrecision");
}

function visualizeMoonPhase(ref: SVGSVGElement, phase: number) {
  const width = 300;
  const height = 100;
  const radius = 50;
  const initX = width / 2;
  const initY = height / 2;

  const params = calculateParams(radius, phase);

  const root = renderRoot(ref, width, height, radius);

  renderMoon(
    root,
    1,
    initX + params.first.x,
    initY,
    radius,
    params.first.shape,
    params.first.color
  );
  renderMoon(
    root,
    2,
    initX + params.second.x,
    initY,
    radius,
    params.second.shape,
    params.second.color
  );
}

export default visualizeMoonPhase;
