import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Context not defined");

  // Draw line steps
  // ctx.beginPath(); // reset context state
  // ctx.moveTo(30, 60); // x, y
  // ctx.lineTo(90, 100); // x, y
  // ctx.strokeStyle = "yellow";
  // ctx.lineWidth = 10;
  // ctx.stroke();

  // ctx.beginPath(); // reset context state
  // ctx.moveTo(30, 50); // x, y
  // ctx.lineTo(80, 100); // x, y
  // ctx.lineTo(130, 30); // x, y
  // ctx.lineTo(180, 30); // x, y
  // ctx.lineTo(230, 90); // x, y
  // ctx.strokeStyle = "yellow";
  // ctx.lineWidth = 4;
  // // ctx.lineCap = "round";
  // ctx.stroke();

  // Line joins
  // ctx.beginPath();
  // ctx.lineWidth = 10;
  // ctx.moveTo(30, 30);
  // ctx.lineTo(130, 30);
  // ctx.lineTo(130, 90);
  // ctx.lineTo(230, 90);
  // ctx.lineTo(230, 30);
  // ctx.lineJoin = "round";
  // ctx.stroke();

  // add shadow

  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "red";
  ctx.moveTo(30, 30);
  ctx.lineTo(130, 30);
  ctx.shadowColor = "red";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 10;
  ctx.stroke();
});
