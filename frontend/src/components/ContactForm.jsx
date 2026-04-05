import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("maqllolg"); 

  if (state.succeeded) {
    return (
      <div className="contact-success-message">
        <h3 className="success-title">Təşəkkür Edirik!</h3>
        <p>Mesajınız uğurla göndərildi. Sizinlə tezliklə əlaqə saxlayacağıq.</p>
        <button 
          className="btn btn-red" 
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px' }}
        >
          Yeni Mesaj
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form-inner">
      <div className="contact-form-row">
        <div className="form-group">
          <label htmlFor="name">Adınız</label>
          <input
            id="name"
            type="text" 
            name="name"
            placeholder="Adınız"
            required
          />
          <ValidationError 
            prefix="Ad" 
            field="name"
            errors={state.errors}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email" 
            name="email"
            placeholder="Email"
            required
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject">Mövzu</label>
        <input
          id="subject"
          type="text" 
          name="subject"
          placeholder="Necə kömək edə bilərik?"
          required
        />
        <ValidationError 
          prefix="Mövzu" 
          field="subject"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Mesajınız</label>
        <textarea
          id="message"
          name="message"
          placeholder="Mesajınızı buraya yazın..." 
          rows="6"
          required
        ></textarea>
        <ValidationError 
          prefix="Mesaj" 
          field="message"
          errors={state.errors}
        />
      </div>
      <button 
        className="btn btn-red submit-btn" 
        type="submit" 
        disabled={state.submitting}
      >
        {state.submitting ? 'Göndərilir...' : 'Mesajı Göndər'}
      </button>

      {state.errors && (
        <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>
          Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.
        </p>
      )}
    </form>
  );
};

export default ContactForm;