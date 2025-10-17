import React, { useState } from "react";
import PropTypes from "prop-types";

// Replace submitQuote with a real backend/email integration when ready.
function submitQuote(data) {
  console.log("Quote submitted:", data);
  alert(`Thank you, ${data.name || "Customer"}! Your ${data.type} quote has been submitted. We'll reach out to ${data.email || "your email"} soon.`);
}

export default function YesServicesWebsite() {
  const brand = "#FF007F";
  const [tab, setTab] = useState("moving");

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" />

      <header style={{ background: "#fff", padding: 16, boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: brand, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>Yes.</div>
          <div>
            <div style={{ fontWeight: 700 }}>Yes. SERVICES</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Amateur prices, Professional results</div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "24px auto", padding: "0 16px" }}>
        <section style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 6px 18px rgba(0,0,0,0.04)" }}>
          <h1 style={{ fontSize: 28, margin: 0 }}>Get a Quote</h1>

          <nav style={{ marginTop: 16, display: "flex", gap: 8, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>
            <TabButton active={tab === "moving"} onClick={() => setTab("moving")} brand={brand}>Moving & Storage</TabButton>
            <TabButton active={tab === "disposal"} onClick={() => setTab("disposal")} brand={brand}>Disposal Service</TabButton>
            <TabButton active={tab === "cleaning"} onClick={() => setTab("cleaning")} brand={brand}>Cleaning Service</TabButton>
            <TabButton active={tab === "car"} onClick={() => setTab("car")} brand={brand}>Car Detailing</TabButton>
          </nav>

          <div style={{ marginTop: 20 }}>
            {tab === "moving" && <MovingForm brand={brand} />}
            {tab === "disposal" && <DisposalForm brand={brand} />}
            {tab === "cleaning" && <CleaningForm brand={brand} />}
            {tab === "car" && <CarDetailingForm brand={brand} />}
          </div>
        </section>
      </main>

      <footer style={{ marginTop: 24, borderTop: "1px solid #e6e6e6", background: "#fff", padding: 16 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: brand, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>Y</div>
            <div>
              <div style={{ fontWeight: 700 }}>Yes. SERVICES</div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>© {new Date().getFullYear()} Yes. Services</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#6b7280" }}>yesservices.com • quotes@yesservices.com</div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Helper components & forms ---------- */

function TabButton({ children, active, onClick, brand }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        background: active ? brand : "transparent",
        color: active ? "#fff" : "#374151",
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}

/* Contact section used by forms */
function ContactSection({ contact, setContact }) {
  return (
    <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      <input required placeholder="Full name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} style={inputStyle()} />
      <input required placeholder="Phone number" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} style={inputStyle()} />
      <input required placeholder="Email address" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} style={{ ...inputStyle(), gridColumn: "1 / -1" }} />
      <select value={contact.time} onChange={(e) => setContact({ ...contact, time: e.target.value })} style={inputStyle()}>
        <option>Morning</option>
        <option>Noon</option>
        <option>Afternoon</option>
      </select>
      <input type="date" value={contact.date} onChange={(e) => setContact({ ...contact, date: e.target.value })} style={inputStyle()} />
      <label style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={contact.agree} onChange={(e) => setContact({ ...contact, agree: e.target.checked })} />
        <span style={{ fontSize: 14 }}>I agree to the terms and conditions</span>
      </label>
    </div>
  );
}

/* ---------------- Cleaning Form ---------------- */
function CleaningForm({ brand }) {
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("studio");
  const [services, setServices] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", time: "Morning", date: "", agree: false });

  const baseCleaningOptions = { sweeping: 10, windows: 15, sheets: 12, dusting: 12, kitchen: 25, bathroom: 25, deep: 50 };
  const sizeMultiplier = { studio: 1, "1br": 1.3, "2br": 1.6, "3br": 2, house: 2.6 };
  const cleaningOptions = Object.fromEntries(Object.entries(baseCleaningOptions).map(([k, v]) => [k, Math.round(v * (sizeMultiplier[size] || 1))]));

  const toggle = (k) => setServices((s) => ({ ...s, [k]: !s[k] }));
  const price = Object.keys(services).reduce((acc, k) => (services[k] ? acc + cleaningOptions[k] : acc), 0);

  function handle(e) {
    e.preventDefault();
    submitQuote({ type: "cleaning", address, size, services, price, ...contact });
  }

  return (
    <form onSubmit={handle}>
      <div>
        <label style={{ fontWeight: 600 }}>Address</label>
        <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" style={inputStyle()} />
      </div>

      <div style={{ marginTop: 8 }}>
        <label style={{ fontWeight: 600 }}>Apartment size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle()}>
          <option value="studio">Studio</option>
          <option value="1br">1 Bedroom</option>
          <option value="2br">2 Bedrooms</option>
          <option value="3br">3 Bedrooms</option>
          <option value="house">House</option>
        </select>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {Object.entries(cleaningOptions).map(([k, v]) => (
          <label key={k} style={{ display: "flex", gap: 8, padding: 8, borderRadius: 8, background: "#fff", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="checkbox" checked={!!services[k]} onChange={() => toggle(k)} />
              <div style={{ textTransform: "capitalize" }}>{k}</div>
            </div>
            <div style={{ color: "#6b7280" }}>${v}</div>
          </label>
        ))}
      </div>

      <ContactSection contact={contact} setContact={setContact} />

      <div style={{ marginTop: 12, fontWeight: 700 }}>Estimated Price: ${price}</div>
      <button type="submit" style={{ marginTop: 8, background: brand, color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Submit Quote</button>
    </form>
  );
}

CleaningForm.propTypes = { brand: PropTypes.string.isRequired };

/* ---------------- Moving Form ---------------- */
function MovingForm({ brand }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [size, setSize] = useState("studio");
  const [packing, setPacking] = useState(false);
  const [storage, setStorage] = useState(false);
  const [moveOutCleaning, setMoveOutCleaning] = useState(false);
  const [disposal, setDisposal] = useState(false);
  const [items, setItems] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", time: "Morning", date: "", agree: false });

  const itemOptions = {
    bed: 40, table: 30, sofa: 35, dresser: 20, chair: 8, box: 4, mirror: 6, bike: 12, tv: 25, desk: 20, wardrobe: 40, rug: 10, bookshelf: 18,
    piano: 200, poolTable: 180, refrigerator: 50, washer: 45, dryer: 45, oven: 40, stove: 35, sectional: 60, gymEquipment: 70, officeChair: 20, painting: 10, chandelier: 30, armoire: 80, nightstand: 12, coffeeTable: 15
  };

  const changeQty = (k, d) => setItems((p) => ({ ...p, [k]: Math.max(0, (p[k] || 0) + d) }));

  function calcPrice() {
    let volume = Object.entries(items).reduce((a, [k, v]) => a + (itemOptions[k] || 0) * v, 0);
    let price = volume * 1.5;
    if (packing) price *= 1.25;
    if (storage) price += 50;
    if (moveOutCleaning) price += 60;
    if (disposal) price += 80;
    const sizeAdd = { studio: 0, "1br": 20, "2br": 50, "3br": 90, house: 150 }[size] || 0;
    return Math.round(price + sizeAdd);
  }

  const price = calcPrice();

  function handle(e) {
    e.preventDefault();
    submitQuote({ type: "moving", pickup, dropoff, size, items, packing, storage, moveOutCleaning, disposal, price, ...contact });
  }

  return (
    <form onSubmit={handle}>
      <div>
        <label style={{ fontWeight: 600 }}>Pickup address</label>
        <input required value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Enter pickup address" style={inputStyle()} />
      </div>

      <div style={{ marginTop: 8 }}>
        <label style={{ fontWeight: 600 }}>Dropoff address</label>
        <input required value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder="Enter dropoff address" style={inputStyle()} />
      </div>

      <div style={{ marginTop: 8 }}>
        <label style={{ fontWeight: 600 }}>Apartment size</label>
        <select value={size} onChange={(e) => setSize(e.target.value)} style={inputStyle()}>
          <option value="studio">Studio</option>
          <option value="1br">1 Bedroom</option>
          <option value="2br">2 Bedrooms</option>
          <option value="3br">3 Bedrooms</option>
          <option value="house">House</option>
        </select>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {Object.keys(itemOptions).map((k) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8, borderRadius: 8, background: "#fff" }}>
            <div style={{ textTransform: "capitalize" }}>{k}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button type="button" onClick={() => changeQty(k, -1)} style={smallBtn()}>-</button>
              <div>{items[k] || 0}</div>
              <button type="button" onClick={() => changeQty(k, 1)} style={smallBtn()}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" checked={packing} onChange={(e) => setPacking(e.target.checked)} /> Need packing service</label>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" checked={storage} onChange={(e) => setStorage(e.target.checked)} /> Need storage</label>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" checked={moveOutCleaning} onChange={(e) => setMoveOutCleaning(e.target.checked)} /> Need cleaning (quick move-out)</label>
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" checked={disposal} onChange={(e) => setDisposal(e.target.checked)} /> Add disposal service</label>
      </div>

      <ContactSection contact={contact} setContact={setContact} />

      <div style={{ marginTop: 12, fontWeight: 700 }}>Estimated Price: ${price}</div>
      <button type="submit" style={{ marginTop: 8, background: brand, color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Submit Quote</button>
    </form>
  );
}

MovingForm.propTypes = { brand: PropTypes.string.isRequired };

/* --------------- Disposal Form --------------- */
function DisposalForm({ brand }) {
  const [address, setAddress] = useState("");
  const [items, setItems] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", time: "Morning", date: "", agree: false });
  const disposalOptions = { furniture: 40, mattress: 30, electronics: 25, appliances: 35, boxes: 10, trash: 15 };

  const changeQty = (k, d) => setItems((p) => ({ ...p, [k]: Math.max(0, (p[k] || 0) + d) }));
  const price = Object.entries(items).reduce((a, [k, v]) => a + (disposalOptions[k] || 0) * v, 0);

  function handle(e) {
    e.preventDefault();
    submitQuote({ type: "disposal", address, items, price, ...contact });
  }

  return (
    <form onSubmit={handle}>
      <div>
        <label style={{ fontWeight: 600 }}>Address</label>
        <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address for disposal" style={inputStyle()} />
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {Object.entries(disposalOptions).map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 8, borderRadius: 8, background: "#fff" }}>
            <div style={{ textTransform: "capitalize" }}>{k}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button type="button" onClick={() => changeQty(k, -1)} style={smallBtn()}>-</button>
              <div>{items[k] || 0}</div>
              <button type="button" onClick={() => changeQty(k, 1)} style={smallBtn()}>+</button>
            </div>
            <div style={{ color: "#6b7280" }}>${v}</div>
          </div>
        ))}
      </div>

      <ContactSection contact={contact} setContact={setContact} />

      <div style={{ marginTop: 12, fontWeight: 700 }}>Estimated Price: ${price}</div>
      <button type="submit" style={{ marginTop: 8, background: brand, color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Submit Quote</button>
    </form>
  );
}

DisposalForm.propTypes = { brand: PropTypes.string.isRequired };

/* ----------- Car Detailing Form ----------- */
function CarDetailingForm({ brand }) {
  const [location, setLocation] = useState("");
  const [services, setServices] = useState({ exterior: false, interior: false, engine: false, full: false });
  const [contact, setContact] = useState({ name: "", phone: "", email: "", time: "Morning", date: "", agree: false });

  const opts = { exterior: 40, interior: 60, engine: 50, full: 120 };
  const price = Object.entries(services).reduce((a, [k, v]) => a + (v ? opts[k] : 0), 0);

  function handle(e) {
    e.preventDefault();
    submitQuote({ type: "car detailing", location, services, price, ...contact });
  }

  return (
    <form onSubmit={handle}>
      <div>
        <label style={{ fontWeight: 600 }}>Service location</label>
        <input required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Address or 'On-site'" style={inputStyle()} />
      </div>

      <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.entries(opts).map(([k, v]) => (
          <label key={k} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="checkbox" checked={!!services[k]} onChange={(e) => setServices((s) => ({ ...s, [k]: e.target.checked }))} />
            <span style={{ textTransform: "capitalize" }}>{`${k} ($${v})`}</span>
          </label>
        ))}
      </div>

      <ContactSection contact={contact} setContact={setContact} />

      <div style={{ marginTop: 12, fontWeight: 700 }}>Estimated Price: ${price}</div>
      <button type="submit" style={{ marginTop: 8, background: brand, color: "#fff", padding: "8px 12px", borderRadius: 8 }}>Submit Quote</button>
    </form>
  );
}

CarDetailingForm.propTypes = { brand: PropTypes.string.isRequired };

/* ---------- small helpers ---------- */
const inputStyle = () => ({ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e5e7eb" });
const smallBtn = () => ({ padding: "6px 8px", borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff" });
