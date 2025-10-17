import React, { useState } from "react";
import PropTypes from "prop-types";

// Simple submit simulation (replace with real API/email integration)
function submitQuote(data) {
  console.log("Quote submitted:", data);
  // Friendly confirmation to user
  alert(`Thank you, ${data.name || 'Customer'}! Your quote has been submitted. We'll contact you at ${data.email || 'your email'} soon.`);
}

export default function YesServicesWebsite() {
  const brand = "#FF007F";
  const [tab, setTab] = useState("cleaning");

  const bubbleStyle = {
    backgroundColor: brand,
    backgroundImage:
      "radial-gradient(circle at 20% 30%, white 10%, transparent 11%), radial-gradient(circle at 80% 20%, white 8%, transparent 9%), radial-gradient(circle at 60% 70%, white 12%, transparent 13%)",
    backgroundSize: "100% 100%",
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans" style={bubbleStyle}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
      />

      <header className="bg-white shadow-sm" role="banner">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-md flex items-center justify-center text-white font-bold text-2xl"
              style={{ background: brand }}
            >
              Yes.
            </div>
            <div>
              <div className="text-lg font-semibold">Yes. SERVICES</div>
              <div className="text-xs text-gray-500">Amateur prices, Professional results</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12" role="main">
        <section className="rounded-2xl shadow p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center bg-white">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">Clean moves, clear prices.</h1>
            <p className="mt-4 max-w-xl text-gray-700">
              Yes. SERVICES offers transparent, upfront pricing for cleaning, moving, storage, and disposal.
              Pick the exact services or items you want and get a firm quote — no hourly surprises.
            </p>
          </div>
          <div className="rounded-md overflow-hidden bg-white h-64 flex items-center justify-center">
            <img
              alt="cleaning and moving team at job site"
              src="https://files.oaiusercontent.com/file_00000000b54461f58478cda75912aca3/A_digital_photograph_in_a_split-screen_format_disp.png"
              className="object-cover h-full w-full opacity-90 rounded-md"
            />
          </div>
        </section>

        <section className="mt-12 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-bold">Get a Quote</h2>

          <div className="flex gap-2 mt-4 border-b pb-2" role="tablist">
            {['cleaning', 'moving', 'disposal'].map((type) => (
              <button
                key={type}
                onClick={() => setTab(type)}
                className={`px-3 py-2 rounded ${tab === type ? 'text-white' : 'text-gray-700'}`}
                style={tab === type ? { background: brand } : {}}
                aria-selected={tab === type}
                aria-controls={`${type}-form`}
              >
                {type === 'cleaning' ? 'Cleaning' : type === 'moving' ? 'Moving & Storage' : 'Disposal Service'}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === 'cleaning' && <CleaningForm brand={brand} />}
            {tab === 'moving' && <MovingForm brand={brand} />}
            {tab === 'disposal' && <DisposalForm brand={brand} />}
          </div>
        </section>
      </main>

      <footer className="mt-12 bg-white border-t" role="contentinfo">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
              style={{ background: brand }}
            >
              Yes.
            </div>
            <div>
              <div className="text-sm font-semibold">Yes. SERVICES</div>
              <div className="text-xs text-gray-500">© {new Date().getFullYear()} Yes. Services</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">yesservices.com • quotes@yesservices.com</div>
        </div>
      </footer>
    </div>
  );
}

function ContactSection({ contact, setContact }) {
  return (
    <div className="mt-4 grid sm:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Full Name"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        className="border p-2 rounded"
        required
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        className="border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="Email Address"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
        className="border p-2 rounded sm:col-span-2"
        required
      />

      <label className="sm:col-span-2 block">
        <span className="font-semibold text-sm">Preferred Service Time</span>
        <select
          value={contact.time}
          onChange={(e) => setContact({ ...contact, time: e.target.value })}
          className="mt-2 w-full border p-2 rounded"
        >
          <option value="Morning">Morning</option>
          <option value="Noon">Noon</option>
          <option value="Afternoon">Afternoon</option>
        </select>
      </label>

      <label className="sm:col-span-2 block">
        <span className="font-semibold text-sm">Preferred Date</span>
        <input
          type="date"
          value={contact.date}
          onChange={(e) => setContact({ ...contact, date: e.target.value })}
          className="mt-2 w-full border p-2 rounded"
        />
      </label>

      <label className="sm:col-span-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={contact.agree}
          onChange={(e) => setContact({ ...contact, agree: e.target.checked })}
          required
        />
        I agree to the terms and conditions
      </label>
    </div>
  );
}

ContactSection.propTypes = {
  contact: PropTypes.object.isRequired,
  setContact: PropTypes.func.isRequired,
};

function CleaningForm({ brand }) {
  const [address, setAddress] = useState("");
  const [size, setSize] = useState("studio");
  const [services, setServices] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", time: "Morning", date: "", agree: false });

  const baseCleaningOptions = { sweeping: 10, windows: 15, sheets: 12, dusting: 12, kitchen: 25, bathroom: 25, deep: 50 };
  const sizeMultiplier = { studio: 1, '1br': 1.3, '2br': 1.6, '3br': 2, house: 2.6 };
  const cleaningOptions = Object.fromEntries(
    Object.entries(baseCleaningOptions).map(([o, p]) => [o, Math.round(p * (sizeMultiplier[size] || 1))])
  );

  const toggleService = (o) => setServices((p) => ({ ...p, [o]: !p[o] }));
  const price = Object.keys(services).reduce((a, k) => (services[k] ? a + cleaningOptions[k] : a), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuote({ type: 'cleaning', address, size, services, price, ...contact });
  };

  return (
    <form id="cleaning-form" className="mt-6" onSubmit={handleSubmit} aria-live="polite">
      <label htmlFor="address" className="font-semibold text-sm">
        Address
      </label>
      <input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-2 w-full border p-2 rounded"
        placeholder="Enter your address"
        required
      />

      <label htmlFor="size" className="font-semibold text-sm mt-4 block">
        Apartment Size
      </label>
      <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className="mt-2 w-full border p-2 rounded">
        <option value="studio">Studio</option>
        <option value="1br">1 Bedroom</option>
        <option value="2br">2 Bedrooms</option>
        <option value="3br">3 Bedrooms</option>
        <option value="house">House</option>
      </select>

      <div className="mt-4 grid sm:grid-cols-2 gap-2">
        {Object.entries(cleaningOptions).map(([o, p]) => (
          <label key={o} className="flex items-center gap-2 border p-2 rounded bg-white">
            <input type="checkbox" checked={!!services[o]} onChange={() => toggleService(o)} />
            <span className="capitalize flex-1">{o}</span>
            <span className="text-xs text-gray-500">${p}</span>
          </label>
        ))}
      </div>

      <ContactSection contact={contact} setContact={setContact} />

      <div className="mt-4 font-semibold text-lg">Estimated Price: ${price || 0}</div>
      <button type="submit" className="mt-4 px-4 py-2 text-white rounded" style={{ background: brand }}>
        Submit Quote
      </button>
    </form>
  );
}

CleaningForm.propTypes = { brand: PropTypes.string.isRequired };

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
    bed: 40,
    table: 30,
    sofa: 35,
    dresser: 20,
    chair: 8,
    box: 4,
    mirror: 6,
    bike: 12,
    tv: 25,
    desk: 20,
    wardrobe: 40,
    rug: 10,
    bookshelf: 18,
  };

  const changeQty = (i, d) => setItems((p) => ({ ...p, [i]: Math.max(0, (p[i] || 0) + d) }));

  const calcPrice = () => {
    let totalVolume = Object.entries(items).reduce((a, [i, q]) => a + (itemOptions[i] || 0) * q, 0);
    let price = totalVolume * 1.5;
    if (packing) price *= 1.25;
    if (storage) price += 50;
    if (moveOutCleaning) price += 60;
    if (disposal) price += 80;
    const sizeAdd = { studio: 0, '1br': 20, '2br': 50, '3br': 90, house: 150 }[size] || 0;
    return Math.round(price + sizeAdd);
  };

  const price = calcPrice();
  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuote({ type: 'moving', pickup, dropoff, size, items, packing, storage, moveOutCleaning, disposal, price, ...contact });
  };

  return (
    <form id="moving-form" className="mt-6" onSubmit={handleSubmit} aria-live="polite">
      <label className="font-semibold text-sm">Pickup Address</label>
      <input
        type="text"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        className="mt-2 w-full border p-2 rounded"
        placeholder="Enter pickup address"
        required
      />

      <label className="font-semibold text-sm mt-4 block">Dropoff Address</label>
      <input
        type="text"
        value={dropoff}
        onChange={(e) => setDropoff(e.target.value)}
        className="mt-2 w-full border p-2 rounded"
        placeholder="Enter dropoff address"
        required
      />

      <label htmlFor="size" className="font-semibold text-sm mt-4 block">
        Apartment Size
      </label>
      <select id="size" value={size} onChange={(e) => setSize(e.target.value)} className="mt-2 w-full border p-2 rounded">
        <option value="studio">Studio</option>
        <option value="1br">1 Bedroom</option>
        <option value="2br">2 Bedrooms</option>
        <option value="3br">3 Bedrooms</option>
        <option value="house">House</option>
      </select>

      <div className="mt-4 grid sm:grid-cols-2 gap-2">
        {Object.entries(itemOptions).map(([i]) => (
          <div key={i} className="flex items-center justify-between border p-2 rounded bg-white">
            <span className="capitalize">{i}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => changeQty(i, -1)} className="px-2 border rounded">-</button>
              <span>{items[i] || 0}</span>
              <button type="button" onClick={() => changeQty(i, 1)} className="px-2 border rounded">+</button>
            </div>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input type="checkbox" checked={packing} onChange={(e) => setPacking(e.target.checked)} />Need packing service
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" checked={storage} onChange={(e) => setStorage(e.target.checked)} />Need storage
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" checked={moveOutCleaning} onChange={(e) => setMoveOutCleaning(e.target.checked)} />Need cleaning (quick move-out cleaning)
      </label>
      <label className="flex items-center gap-2 mt-2">
        <input type="checkbox" checked={disposal} onChange={(e) => setDisposal(e.target.checked)} />Add disposal service
      </label>

      <ContactSection contact={contact} setContact={setContact} />

      <div className="mt-4 font-semibold text-lg">Estimated Price: ${price || 0}</div>
      <button type="submit" className="mt-4 px-4 py-2 text-white rounded" style={{ background: brand }}>
        Submit Quote
      </button>
    </form>
  );
}

MovingForm.propTypes = { brand: PropTypes.string.isRequired };

function DisposalForm({ brand }) {
  const [address, setAddress] = useState("");
  const [items, setItems] = useState({});
  const [contact, setContact] = useState({ name: "", phone: "", email: "", time: "Morning", date: "", agree: false });
  const disposalOptions = { furniture: 40, mattress: 30, electronics: 25, appliances: 35, boxes: 10, trash: 15 };

  const changeQty = (i, d) => setItems((p) => ({ ...p, [i]: Math.max(0, (p[i] || 0) + d) }));
  const price = Object.entries(items).reduce((a, [i, q]) => a + (disposalOptions[i] || 0) * q, 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitQuote({ type: 'disposal', address, items, price, ...contact });
  };

  return (
    <form id="disposal-form" className="mt-6" onSubmit={handleSubmit} aria-live="polite">
      <label htmlFor="address" className="font-semibold text-sm">
        Address
      </label>
      <input
        id="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="mt-2 w-full border p-2 rounded"
        placeholder="Enter address for disposal"
        required
      />

      <div className="mt-4 grid sm:grid-cols-2 gap-2">
        {Object.entries(disposalOptions).map(([i, p]) => (
          <div key={i} className="flex items-center justify-between border p-2 rounded bg-white">
            <span className="capitalize">{i}</span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => changeQty(i, -1)} className="px-2 border rounded">-</button>
              <span>{items[i] || 0}</span>
              <button type="button" onClick={() => changeQty(i, 1)} className="px-2 border rounded">+</button>
            </div>
            <span className="text-xs text-gray-500">${p}</span>
          </div>
        ))}
      </div>

      <ContactSection contact={contact} setContact={setContact} />

      <div className="mt-4 font-semibold text-lg">Estimated Price: ${price || 0}</div>
      <button type="submit" className="mt-4 px-4 py-2 text-white rounded" style={{ background: brand }}>
        Submit Quote
      </button>
    </form>
  );
}

DisposalForm.propTypes = { brand: PropTypes.string.isRequired };
