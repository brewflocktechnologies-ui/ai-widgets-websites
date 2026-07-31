/* ==========================================================================
   FORMS LIVE PREVIEW COMPONENT
   Renders the interactive phone preview for Pre-Chat, Post-Chat, and Ticket Forms
   ========================================================================== */

(function() {
  window.FormsPreview = {
    renderPreChatPreview(containerId = 'forms-live-preview-target') {
      const target = document.getElementById(containerId);
      if (!target) return;

      target.innerHTML = `
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Pre-chat form preview
          </div>
          <form class="phone-preview-body" onsubmit="event.preventDefault(); alert('Form submitted successfully!');">
            <div class="phone-field-group">
              <label class="phone-field-label">Name <span class="required-star">*</span></label>
              <input type="text" class="phone-field-input active-focus" placeholder="Your name" value="Your name" required>
            </div>
            
            <div class="phone-field-group">
              <label class="phone-field-label">Email <span class="required-star">*</span></label>
              <input type="email" class="phone-field-input" placeholder="Your email" required>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Phone</label>
              <div class="phone-country-input-group">
                <div class="phone-country-select-btn">
                  <span>🇺🇸</span>
                  <span>+1</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <input type="tel" placeholder="Enter phone number">
              </div>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Department</label>
              <div style="position: relative;">
                <select class="phone-field-select">
                  <option value="" selected>Select a department</option>
                  <option value="sales">Sales & Business</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing & Invoices</option>
                </select>
                <div style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #64748b;">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>

            <button type="submit" class="phone-submit-btn">Submit</button>

            <div class="phone-footer-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Powered by <strong>REVE Chat</strong></span>
            </div>
          </form>
        </div>
      `;
    },

    renderPostChatPreview(containerId = 'forms-live-preview-target') {
      const target = document.getElementById(containerId);
      if (!target) return;

      target.innerHTML = `
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Post-chat form preview
          </div>
          <form class="phone-preview-body" onsubmit="event.preventDefault(); alert('Feedback submitted!');">
            <div style="text-align: center; margin-bottom: 4px;">
              <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">How was your experience?</h4>
              <p style="font-size: 12px; color: #64748b;">Rate our customer support team</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 8px; font-size: 24px; cursor: pointer; margin: 8px 0;">
              <span title="Poor">😠</span>
              <span title="Neutral">😐</span>
              <span title="Good">😊</span>
              <span title="Great">😄</span>
              <span title="Excellent!" style="transform: scale(1.2);">😍</span>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Comments / Feedback</label>
              <textarea class="phone-field-input" rows="3" placeholder="Tell us what we did well or how we can improve..."></textarea>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Email (Optional)</label>
              <input type="email" class="phone-field-input" placeholder="Your email for follow-up">
            </div>

            <button type="submit" class="phone-submit-btn">Submit Feedback</button>

            <div class="phone-footer-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Powered by <strong>REVE Chat</strong></span>
            </div>
          </form>
        </div>
      `;
    },

    renderTicketPreview(containerId = 'forms-live-preview-target', heading = '', subheading = '') {
      const target = document.getElementById(containerId);
      if (!target) return;

      target.innerHTML = `
        <div class="phone-preview-card-container">
          <div class="phone-preview-header">
            Ticket form preview
          </div>
          <form class="phone-preview-body" onsubmit="event.preventDefault(); alert('Ticket submitted!');">
            <div style="margin-bottom: 6px;">
              <h4 style="font-size: 15px; font-weight: 700; color: #0f172a;" id="preview-ticket-heading">${heading || 'Submit a Support Ticket'}</h4>
              <p style="font-size: 12px; color: #64748b; margin-top: 2px;" id="preview-ticket-subheading">${subheading || 'We will get back to you within 24 hours.'}</p>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Subject <span class="required-star">*</span></label>
              <input type="text" class="phone-field-input" placeholder="Brief summary of issue" required>
            </div>

            <div class="phone-field-group">
              <label class="phone-field-label">Description <span class="required-star">*</span></label>
              <textarea class="phone-field-input" rows="3" placeholder="Provide details about your inquiry" required></textarea>
            </div>

            <button type="submit" class="phone-submit-btn">Submit Ticket</button>

            <div class="phone-footer-brand">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <span>Powered by <strong>REVE Chat</strong></span>
            </div>
          </form>
        </div>
      `;
    }
  };
})();
