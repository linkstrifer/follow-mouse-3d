const container = document.documentElement;
const boxes = document.querySelectorAll(".box");

document.addEventListener("mousemove", ({ x, y }) => {
  const { height, width } = container.getBoundingClientRect();
  const degUnit = {
    x: width / (2 * 80),
    y: height / (2 * 80)
  };

  window.requestAnimationFrame(() => {
    boxes.forEach((box) => {
      setCoordinates({
        element: box,
        mouse: { x, y },
        degUnit
      });
    });
  });
});

function setLimit(num, min, max) {
  const MIN = min || -80;
  const MAX = max || 80;
  const parsed = parseFloat(num);

  return Math.min(Math.max(parsed, MIN), MAX);
}

function setCoordinates({ element, degUnit, mouse: { x, y } }) {
  const { left, top, height, width } = element.getBoundingClientRect();
  const center = {
    x: left + width / 2,
    y: top + height / 2
  };

  const coordinates = {
    x: setLimit((x - center.x) / degUnit.x),
    y: setLimit((y - center.y) / degUnit.y)
  };

  element.style.setProperty("--y", `${coordinates.x}deg`);
  element.style.setProperty("--x", `${coordinates.y * -1}deg`);
}
