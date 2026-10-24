import { useEffect, useState } from "react";
import { api } from "../api";
import { useLocation } from "react-router-dom";

const departments = [
  "General Physician",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Orthopedics",
  "Neurology",
  "ENT",
];

const allSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

const initialForm = {
  patientName: "",
  email: "",
  phone: "",
  department: "",
  date: "",
  timeSlot: "",
  reason: "",
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

export default function Book() {
  const location = useLocation();
  const [form, setForm] = useState({
    ...initialForm,
    department: location.state?.department || "",
  });
  // const [form, setForm] = useState(initialForm);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" || name === "date" ? { timeSlot: "" } : {}),
    }));
  };

  // Load booked slots when department and date change
  useEffect(() => {
    if (!form.department || !form.date) {
      setBookedSlots([]);
      return;
    }
    api(
      `/appointments/slots?department=${encodeURIComponent(form.department)}&date=${form.date}`,
    )
      .then((data) => setBookedSlots(data.bookedSlots))
      .catch(() => setBookedSlots([]));
  }, [form.department, form.date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!form.timeSlot) {
      setStatus({ type: "error", message: "Please select a time slot." });
      return;
    }

    setLoading(true);
    try {
      await api("/appointments", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setStatus({
        type: "success",
        message: "Appointment booked successfully! We will confirm it shortly.",
      });
      setForm(initialForm);
      setBookedSlots([]);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Book an Appointment
      </h1>
      <p className="mt-2 text-sm text-slate-600 sm:text-base">
        Fill in your details and choose a convenient time.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-slate-100 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name *
            </label>
            <input
              name="patientName"
              value={form.patientName}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone *
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="9876543210"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Department *
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Date *
            </label>
            <input
              name="date"
              type="date"
              min={today}
              value={form.date}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Time Slot *
          </label>
          {!form.department || !form.date ? (
            <p className="text-sm text-slate-500">
              Select a department and date to see available slots.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {allSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = form.timeSlot === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    disabled={isBooked}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, timeSlot: slot }))
                    }
                    className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                      isBooked
                        ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through"
                        : isSelected
                          ? "border-teal-600 bg-teal-600 text-white"
                          : "border-slate-300 text-slate-700 hover:border-teal-500 hover:bg-teal-50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Reason for visit
          </label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            rows="3"
            maxLength="500"
            className={inputClass}
            placeholder="Briefly describe your concern (optional)"
          />
        </div>

        {status.message && (
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              status.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-60 sm:w-auto"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </section>
  );
}
