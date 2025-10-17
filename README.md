/* Minimal reset and fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

:root {
  --brand: #FF007F;
  --muted: #6b7280;
}

* { box-sizing: border-box; }
html, body, #root { height: 100%; margin: 0; }
body {
  font-family: 'Poppins', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: #ffffff;
  color: #111827;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button { cursor: pointer; border: 0; background: transparent; }
input, select, textarea { font-family: inherit; }
