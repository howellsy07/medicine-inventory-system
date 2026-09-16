import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMedicine } from '../api/medicines';

const initialForm = {
  brand_name: '', generic_name: '', category: '', stock: '', quantity: '',
  manufacturer: '', expiry_date: '', description: '',
};

export default function AddMedicine() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.brand_name.trim()) next.brand_name = 'Brand Name is required.';
    if (!form.category.trim()) next.category = 'Category is required.';
    if (form.stock === '') next.stock = 'Stock is required.';
    else if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) next.stock = 'Stock must be a whole number of 0 or more.';
    if (!form.quantity.trim()) next.quantity = 'Quantity is required.';
    return next;
  }

  async function submit(event) {
    event.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }

    setSaving(true);
    setServerError('');
    try {
      await createMedicine({ ...form, stock: Number(form.stock) });
      navigate('/medicines', { replace: true, state: { message: 'Medicine added successfully.' } });
    } catch (requestError) {
      setErrors(requestError.errors);
      setServerError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page-shell narrow-shell">
      <section className="form-card">
        <div className="section-heading">
          <span className="section-number">03</span>
          <div><p className="eyebrow dark">NEW DATABASE RECORD</p><h1>Add Medicine</h1><p>Required fields are marked. Errors appear beside the field that needs attention.</p></div>
        </div>

        <form className="medicine-form two-column" onSubmit={submit} noValidate>
          <Field label="Brand Name" required error={errors.brand_name}>
            <input value={form.brand_name} onChange={(e) => update('brand_name', e.target.value)} placeholder="e.g. Biogesic" />
          </Field>
          <Field label="Generic Name">
            <input value={form.generic_name} onChange={(e) => update('generic_name', e.target.value)} placeholder="e.g. Paracetamol" />
          </Field>
          <Field label="Category" required error={errors.category}>
            <input value={form.category} onChange={(e) => update('category', e.target.value)} placeholder="e.g. Pain Relief" />
          </Field>
          <Field label="Manufacturer">
            <input value={form.manufacturer} onChange={(e) => update('manufacturer', e.target.value)} placeholder="e.g. Unilab" />
          </Field>
          <Field label="Stock" required error={errors.stock}>
            <input min="0" type="number" value={form.stock} onChange={(e) => update('stock', e.target.value)} placeholder="0" />
          </Field>
          <Field label="Quantity" required error={errors.quantity}>
            <input value={form.quantity} onChange={(e) => update('quantity', e.target.value)} placeholder="e.g. 500 mg / 20 tablets" />
          </Field>
          <Field label="Expiry Date">
            <input type="date" value={form.expiry_date} onChange={(e) => update('expiry_date', e.target.value)} />
          </Field>
          <Field label="Description" wide error={errors.description}>
            <textarea rows="4" value={form.description} onChange={(e) => update('description', e.target.value)} placeholder="Add useful notes about this medicine" />
          </Field>

          {serverError && <p className="form-alert wide-field" role="alert">{serverError}</p>}
          <div className="form-actions wide-field">
            <button className="secondary-button" onClick={() => navigate('/medicines')} type="button">Cancel</button>
            <button className="primary-button" disabled={saving} type="submit">{saving ? 'Saving…' : 'Add Medicine'}</button>
          </div>
        </form>
      </section>
    </main>
  );
}

function Field({ children, error, label, required = false, wide = false }) {
  return (
    <label className={wide ? 'wide-field' : ''}>
      <span>{label}{required && <em>Required</em>}</span>
      {children}
      {error && <small className="field-error">{Array.isArray(error) ? error[0] : error}</small>}
    </label>
  );
}

