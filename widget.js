// ═══════════════════════════════════════════════════════════
// iTabs Widget Engine v2.0
// Config-driven interactive quote estimator
// Zero dependencies. Reads a JSON config, renders everything.
//
// Usage:
//   <div id="itabs-widget"></div>
//   <script src="widget.js" data-config="configs/fencing-perth.json"></script>
//
// Or programmatically:
//   iTabs.init({ container: '#itabs-widget', config: 'configs/fencing-perth.json' });
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ── Find our script tag to read data-config ──────────
  const scriptTag = document.currentScript;

  // ── Public API ───────────────────────────────────────
  window.iTabs = {
    init: function (opts) {
      const container = typeof opts.container === 'string'
        ? document.querySelector(opts.container)
        : opts.container;
      if (!container) {
        console.error('iTabs: Container not found:', opts.container);
        return;
      }
      if (typeof opts.config === 'string') {
        loadConfig(opts.config, container);
      } else if (typeof opts.config === 'object') {
        bootWidget(opts.config, container);
      }
    }
  };

  // ── Auto-init from script tag ────────────────────────
  if (scriptTag && scriptTag.getAttribute('data-config')) {
    document.addEventListener('DOMContentLoaded', function () {
      var container = document.getElementById('itabs-widget');
      if (!container) {
        container = document.createElement('div');
        container.id = 'itabs-widget';
        scriptTag.parentNode.insertBefore(container, scriptTag);
      }
      loadConfig(scriptTag.getAttribute('data-config'), container);
    });
  }

  // ── Load JSON config ─────────────────────────────────
  function loadConfig(url, container) {
    container.innerHTML = '<div class="itabs-widget"><div class="itabs-loading">Loading estimator…</div></div>';
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load config: ' + r.status);
        return r.json();
      })
      .then(function (config) { bootWidget(config, container); })
      .catch(function (err) {
        console.error('iTabs:', err);
        container.innerHTML = '<div class="itabs-widget"><div class="itabs-error">Could not load the estimator. Please refresh and try again.</div></div>';
      });
  }

  // ── Boot the Widget ──────────────────────────────────
  function bootWidget(config, container) {
    var C = config;
    var totalSteps = C.steps.length + 1; // +1 for contact step
    var currentStep = 0;
    var answers = {};     // stepId -> { optionId, label, value, pricing }
    var contactData = {};

    // Apply branding CSS variables
    applyBranding(C, container);

    // Render
    render();

    // ── Apply Config Colors ────────────────────────────
    function applyBranding(cfg, el) {
      if (cfg.business && cfg.business.colors) {
        var c = cfg.business.colors;
        var root = el.style || document.documentElement.style;
        if (c.primary) el.style.setProperty('--itabs-primary', c.primary);
        if (c.secondary) el.style.setProperty('--itabs-secondary', c.secondary);
        if (c.accent) el.style.setProperty('--itabs-accent', c.accent);
      }
    }

    // ── Main Render ────────────────────────────────────
    function render() {
      var html = '<div class="itabs-widget">';

      // Header
      html += renderHeader();

      if (currentStep < C.steps.length) {
        // Regular step
        html += renderProgress();
        if (C.settings.showPricing) html += renderRunningTotal();
        html += renderStep(C.steps[currentStep]);
        html += renderNav(C.steps[currentStep]);
      } else if (currentStep === C.steps.length) {
        // Contact step
        html += renderProgress();
        if (C.settings.showPricing) html += renderRunningTotal();
        html += renderContact();
      } else {
        // Summary
        html += renderSummary();
      }

      html += '</div>';
      container.innerHTML = html;
      bindEvents();
    }

    // ── Header ─────────────────────────────────────────
    function renderHeader() {
      var h = '';
      h += '<div class="itabs-header">';
      if (C.business && C.business.name) {
        h += '<div class="itabs-business-name">' + esc(C.business.name) + '</div>';
      }
      if (C.settings && C.settings.summaryTitle) {
        h += '<h1>' + esc(C.settings.summaryTitle) + '</h1>';
      }
      if (C.settings && C.settings.pricingDisclaimer && currentStep <= C.steps.length) {
        // Show a subtitle hint
      }
      h += '</div>';
      return h;
    }

    // ── Progress ───────────────────────────────────────
    function renderProgress() {
      var pct = ((currentStep) / totalSteps) * 100;
      var label = 'Step ' + (currentStep + 1) + ' of ' + totalSteps;
      var h = '<div class="itabs-progress">';
      h += '<div class="itabs-progress-bar"><div class="itabs-progress-fill" style="width:' + pct + '%"></div></div>';
      h += '<span class="itabs-progress-text">' + label + '</span>';
      h += '</div>';
      return h;
    }

    // ── Running Total ──────────────────────────────────
    function renderRunningTotal() {
      var total = calculateTotal();
      var sym = (C.settings && C.settings.currencySymbol) || '$';
      var h = '<div class="itabs-running-total">';
      h += '<span class="itabs-running-total-label">Estimated total</span>';
      h += '<span class="itabs-running-total-amount">' + sym + formatNum(total) + '</span>';
      h += '</div>';
      return h;
    }

    // ── Step Renderer ──────────────────────────────────
    function renderStep(step) {
      var h = '<div class="itabs-step">';
      h += '<div class="itabs-step-title">' + esc(step.title);
      if (step.required) h += '<span class="itabs-step-required">*</span>';
      h += '</div>';
      if (step.helpText) {
        h += '<div class="itabs-step-help">' + esc(step.helpText) + '</div>';
      }

      switch (step.type) {
        case 'single_select': h += renderSingleSelect(step); break;
        case 'multi_select':  h += renderMultiSelect(step); break;
        case 'number_input':  h += renderNumberInput(step); break;
        case 'range_slider':  h += renderRangeSlider(step); break;
        case 'text_input':    h += renderTextInput(step); break;
        default:
          h += '<div class="itabs-error">Unknown step type: ' + esc(step.type) + '</div>';
      }

      h += '</div>';
      return h;
    }

    // ── Single Select ──────────────────────────────────
    function renderSingleSelect(step) {
      var cur = answers[step.id];
      var h = '<div class="itabs-options">';
      step.options.forEach(function (opt) {
        var sel = cur && cur.optionId === opt.id;
        h += '<div class="itabs-option-card' + (sel ? ' selected' : '') + '" data-step="' + step.id + '" data-option="' + opt.id + '">';
        h += '<div class="itabs-option-indicator"></div>';
        h += '<div class="itabs-option-content">';
        h += '<div class="itabs-option-label">' + esc(opt.label) + '</div>';
        if (opt.description) h += '<div class="itabs-option-desc">' + esc(opt.description) + '</div>';
        h += '</div>';
        if (opt.image) {
          h += '<img class="itabs-option-image" src="' + esc(opt.image) + '" alt="' + esc(opt.label) + '">';
        }
        if (C.settings.showPricing && opt.pricing) {
          h += '<div class="itabs-option-price">' + formatPricingLabel(opt.pricing) + '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
      return h;
    }

    // ── Multi Select ───────────────────────────────────
    function renderMultiSelect(step) {
      var cur = answers[step.id];
      var selected = (cur && cur.selectedIds) || [];
      var h = '<div class="itabs-options">';
      step.options.forEach(function (opt) {
        var sel = selected.indexOf(opt.id) >= 0;
        h += '<div class="itabs-option-card' + (sel ? ' selected' : '') + '" data-multi data-step="' + step.id + '" data-option="' + opt.id + '">';
        h += '<div class="itabs-option-indicator"></div>';
        h += '<div class="itabs-option-content">';
        h += '<div class="itabs-option-label">' + esc(opt.label) + '</div>';
        if (opt.description) h += '<div class="itabs-option-desc">' + esc(opt.description) + '</div>';
        h += '</div>';
        if (C.settings.showPricing && opt.pricing) {
          h += '<div class="itabs-option-price">' + formatPricingLabel(opt.pricing) + '</div>';
        }
        h += '</div>';
      });
      h += '</div>';
      return h;
    }

    // ── Number Input ───────────────────────────────────
    function renderNumberInput(step) {
      var val = (answers[step.id] && answers[step.id].value) || step.default || step.min || 1;
      var h = '<div class="itabs-number-input">';
      h += '<button class="itabs-number-btn" data-action="decrement" data-step="' + step.id + '">−</button>';
      h += '<div class="itabs-number-value"><input type="number" id="num-' + step.id + '" value="' + val + '" min="' + (step.min || 0) + '" max="' + (step.max || 9999) + '" data-step="' + step.id + '"></div>';
      h += '<button class="itabs-number-btn" data-action="increment" data-step="' + step.id + '">+</button>';
      h += '</div>';
      if (step.unit) {
        h += '<div class="itabs-number-unit">' + esc(step.unit) + '</div>';
      }
      // Store default value
      if (!answers[step.id]) {
        answers[step.id] = { value: val, label: val + (step.unit ? ' ' + step.unit : '') };
      }
      return h;
    }

    // ── Range Slider ───────────────────────────────────
    function renderRangeSlider(step) {
      var val = (answers[step.id] && answers[step.id].value) || step.default || step.min || 0;
      var h = '<div class="itabs-range-wrap">';
      h += '<div class="itabs-range-display"><span id="range-val-' + step.id + '">' + val + '</span>';
      if (step.unit) h += ' <span class="unit">' + esc(step.unit) + '</span>';
      h += '</div>';
      h += '<input type="range" class="itabs-range-input" id="range-' + step.id + '" min="' + (step.min || 0) + '" max="' + (step.max || 100) + '" step="' + (step.step || 1) + '" value="' + val + '" data-step="' + step.id + '">';
      h += '<div class="itabs-range-labels"><span>' + (step.min || 0) + '</span><span>' + (step.max || 100) + '</span></div>';
      h += '</div>';
      if (!answers[step.id]) {
        answers[step.id] = { value: val, label: val + (step.unit ? ' ' + step.unit : '') };
      }
      return h;
    }

    // ── Text Input ─────────────────────────────────────
    function renderTextInput(step) {
      var val = (answers[step.id] && answers[step.id].value) || '';
      var h = '<textarea class="itabs-textarea" id="text-' + step.id + '" data-step="' + step.id + '" placeholder="' + esc(step.placeholder || '') + '">' + esc(val) + '</textarea>';
      return h;
    }

    // ── Contact Form ───────────────────────────────────
    function renderContact() {
      var fields = C.contact.fields;
      var h = '<div class="itabs-step">';
      h += '<div class="itabs-step-title">' + esc(C.contact.title || 'Your Details') + '</div>';
      h += '<div class="itabs-step-help">We just need a few details so the tradie can get back to you with an accurate quote.</div>';
      h += '<div class="itabs-contact-form">';
      fields.forEach(function (f) {
        h += '<div class="itabs-form-field">';
        h += '<label class="itabs-form-label" for="contact-' + f.id + '">' + esc(f.label);
        if (f.required) h += ' <span class="required">*</span>';
        h += '</label>';
        var val = contactData[f.id] || '';
        h += '<input class="itabs-form-input" type="' + (f.type || 'text') + '" id="contact-' + f.id + '" data-field="' + f.id + '" value="' + esc(val) + '" placeholder="' + esc(f.placeholder || '') + '">';
        h += '<div class="itabs-form-error" id="error-' + f.id + '"></div>';
        h += '</div>';
      });
      h += '</div></div>';

      // Nav
      h += '<div class="itabs-nav">';
      h += '<button class="itabs-btn itabs-btn-back" data-action="back">← Back</button>';
      h += '<button class="itabs-btn itabs-btn-next" data-action="submit-contact">See Your Estimate</button>';
      h += '</div>';
      return h;
    }

    // ── Navigation ─────────────────────────────────────
    function renderNav(step) {
      var h = '<div class="itabs-nav">';
      if (currentStep > 0) {
        h += '<button class="itabs-btn itabs-btn-back" data-action="back">← Back</button>';
      }
      var nextLabel = (currentStep === C.steps.length - 1) ? 'Your Details →' : 'Next →';
      var disabled = step.required && !isStepAnswered(step) ? ' disabled' : '';
      h += '<button class="itabs-btn itabs-btn-next" data-action="next"' + disabled + '>' + nextLabel + '</button>';
      h += '</div>';
      if (!step.required && !isStepAnswered(step)) {
        h += '<div style="text-align:center"><button class="itabs-btn-skip" data-action="skip">Skip this step</button></div>';
      }
      return h;
    }

    // ── Summary ────────────────────────────────────────
    function renderSummary() {
      var sym = (C.settings && C.settings.currencySymbol) || '$';
      var h = '<div class="itabs-summary">';

      h += '<div class="itabs-summary-title">' + esc(C.summary.title || 'Your Quote Summary') + '</div>';
      if (C.summary.description) {
        var desc = C.summary.description.replace('{{business.name}}', C.business ? C.business.name : 'the tradie');
        h += '<div class="itabs-summary-desc">' + esc(desc) + '</div>';
      }

      // Selections section
      h += '<div class="itabs-summary-section">';
      h += '<div class="itabs-summary-section-title">Your Selections</div>';
      C.steps.forEach(function (step, i) {
        var a = answers[step.id];
        if (!a) return;
        var label = getAnswerDisplay(step, a);
        if (!label) return;
        h += '<div class="itabs-summary-row">';
        h += '<span class="itabs-summary-row-label">' + esc(step.title) + ' <span class="itabs-summary-edit" data-goto="' + i + '">edit</span></span>';
        h += '<span class="itabs-summary-row-value">' + esc(label) + '</span>';
        h += '</div>';
      });
      h += '</div>';

      // Estimate
      if (C.settings.showPricing && C.summary.includeEstimate) {
        var total = calculateTotal();
        var breakdown = getBreakdown();
        if (breakdown.length > 0) {
          h += '<div class="itabs-summary-section">';
          h += '<div class="itabs-summary-section-title">Price Breakdown</div>';
          breakdown.forEach(function (item) {
            h += '<div class="itabs-summary-row">';
            h += '<span class="itabs-summary-row-label">' + esc(item.label) + '</span>';
            h += '<span class="itabs-summary-row-value">' + sym + formatNum(item.amount) + '</span>';
            h += '</div>';
          });
          h += '</div>';
        }
        h += '<div class="itabs-summary-total">';
        h += '<span class="itabs-summary-total-label">Estimated Total</span>';
        h += '<span class="itabs-summary-total-amount">' + sym + formatNum(total) + '</span>';
        h += '</div>';
        if (C.settings.pricingDisclaimer) {
          h += '<div class="itabs-summary-disclaimer">' + esc(C.settings.pricingDisclaimer) + '</div>';
        }
      }

      // Contact details
      h += '<div class="itabs-summary-section">';
      h += '<div class="itabs-summary-section-title">Your Details</div>';
      C.contact.fields.forEach(function (f) {
        if (!contactData[f.id]) return;
        h += '<div class="itabs-summary-row">';
        h += '<span class="itabs-summary-row-label">' + esc(f.label) + '</span>';
        h += '<span class="itabs-summary-row-value">' + esc(contactData[f.id]) + '</span>';
        h += '</div>';
      });
      h += '</div>';

      // Actions
      h += '<div class="itabs-summary-actions">';
      h += '<button class="itabs-btn-copy" data-action="copy">' + esc(C.summary.ctaText || 'Copy Quote Summary') + '</button>';
      h += '<button class="itabs-btn-restart" data-action="restart">Start Over</button>';
      h += '</div>';

      h += '</div>';
      return h;
    }

    // ── Event Binding ──────────────────────────────────
    function bindEvents() {
      var el = container;

      // Option cards
      el.querySelectorAll('.itabs-option-card').forEach(function (card) {
        card.addEventListener('click', function () {
          var stepId = this.getAttribute('data-step');
          var optId = this.getAttribute('data-option');
          var isMulti = this.hasAttribute('data-multi');
          handleOptionClick(stepId, optId, isMulti);
        });
      });

      // Number input buttons
      el.querySelectorAll('.itabs-number-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var stepId = this.getAttribute('data-step');
          var action = this.getAttribute('data-action');
          handleNumberBtn(stepId, action);
        });
      });

      // Number input direct entry
      el.querySelectorAll('.itabs-number-value input').forEach(function (inp) {
        inp.addEventListener('change', function () {
          var stepId = this.getAttribute('data-step');
          handleNumberChange(stepId, this.value);
        });
      });

      // Range sliders
      el.querySelectorAll('.itabs-range-input').forEach(function (slider) {
        slider.addEventListener('input', function () {
          var stepId = this.getAttribute('data-step');
          handleRangeChange(stepId, this.value);
        });
      });

      // Textareas
      el.querySelectorAll('.itabs-textarea').forEach(function (ta) {
        ta.addEventListener('input', function () {
          var stepId = this.getAttribute('data-step');
          handleTextChange(stepId, this.value);
        });
      });

      // Contact inputs
      el.querySelectorAll('.itabs-form-input').forEach(function (inp) {
        inp.addEventListener('input', function () {
          contactData[this.getAttribute('data-field')] = this.value;
        });
      });

      // Nav buttons
      el.querySelectorAll('[data-action="next"]').forEach(function (btn) {
        btn.addEventListener('click', function () { goNext(); });
      });
      el.querySelectorAll('[data-action="back"]').forEach(function (btn) {
        btn.addEventListener('click', function () { goBack(); });
      });
      el.querySelectorAll('[data-action="skip"]').forEach(function (btn) {
        btn.addEventListener('click', function () { goNext(true); });
      });
      el.querySelectorAll('[data-action="submit-contact"]').forEach(function (btn) {
        btn.addEventListener('click', function () { submitContact(); });
      });
      el.querySelectorAll('[data-action="copy"]').forEach(function (btn) {
        btn.addEventListener('click', function () { copySummary(this); });
      });
      el.querySelectorAll('[data-action="restart"]').forEach(function (btn) {
        btn.addEventListener('click', function () { restart(); });
      });
      el.querySelectorAll('[data-goto]').forEach(function (link) {
        link.addEventListener('click', function () {
          currentStep = parseInt(this.getAttribute('data-goto'));
          render();
        });
      });
    }

    // ── Handlers ───────────────────────────────────────
    function handleOptionClick(stepId, optId, isMulti) {
      var step = C.steps.find(function (s) { return s.id === stepId; });
      var opt = step.options.find(function (o) { return o.id === optId; });

      if (isMulti) {
        if (!answers[stepId]) answers[stepId] = { selectedIds: [], labels: [], options: [] };
        var idx = answers[stepId].selectedIds.indexOf(optId);
        if (idx >= 0) {
          answers[stepId].selectedIds.splice(idx, 1);
          answers[stepId].labels.splice(idx, 1);
          answers[stepId].options.splice(idx, 1);
        } else {
          answers[stepId].selectedIds.push(optId);
          answers[stepId].labels.push(opt.label);
          answers[stepId].options.push(opt);
        }
      } else {
        answers[stepId] = { optionId: optId, label: opt.label, option: opt };
      }
      render();
    }

    function handleNumberBtn(stepId, action) {
      var step = C.steps.find(function (s) { return s.id === stepId; });
      var cur = (answers[stepId] && answers[stepId].value) || step.default || step.min || 1;
      var stepSize = step.step || 1;
      var newVal = action === 'increment' ? cur + stepSize : cur - stepSize;
      newVal = Math.max(step.min || 0, Math.min(step.max || 9999, newVal));
      answers[stepId] = { value: newVal, label: newVal + (step.unit ? ' ' + step.unit : '') };
      render();
    }

    function handleNumberChange(stepId, val) {
      var step = C.steps.find(function (s) { return s.id === stepId; });
      var num = parseFloat(val) || step.min || 1;
      num = Math.max(step.min || 0, Math.min(step.max || 9999, num));
      answers[stepId] = { value: num, label: num + (step.unit ? ' ' + step.unit : '') };
      render();
    }

    function handleRangeChange(stepId, val) {
      var step = C.steps.find(function (s) { return s.id === stepId; });
      var num = parseFloat(val);
      answers[stepId] = { value: num, label: num + (step.unit ? ' ' + step.unit : '') };
      var display = container.querySelector('#range-val-' + stepId);
      if (display) display.textContent = num;
    }

    function handleTextChange(stepId, val) {
      answers[stepId] = { value: val, label: val };
    }

    // ── Navigation ─────────────────────────────────────
    function goNext(skip) {
      if (!skip && currentStep < C.steps.length) {
        var step = C.steps[currentStep];
        if (step.required && !isStepAnswered(step)) return;
      }
      currentStep++;
      render();
      scrollToWidget();
    }

    function goBack() {
      if (currentStep > 0) {
        currentStep--;
        render();
        scrollToWidget();
      }
    }

    function submitContact() {
      // Validate required fields
      var valid = true;
      C.contact.fields.forEach(function (f) {
        var errEl = container.querySelector('#error-' + f.id);
        var inputEl = container.querySelector('#contact-' + f.id);
        contactData[f.id] = inputEl ? inputEl.value.trim() : '';
        if (f.required && !contactData[f.id]) {
          valid = false;
          if (errEl) errEl.textContent = f.label + ' is required';
          if (inputEl) inputEl.classList.add('error');
        } else {
          if (errEl) errEl.textContent = '';
          if (inputEl) inputEl.classList.remove('error');
        }
      });
      if (!valid) return;
      currentStep = C.steps.length + 1; // go to summary
      render();
      scrollToWidget();
    }

    function restart() {
      currentStep = 0;
      answers = {};
      contactData = {};
      render();
      scrollToWidget();
    }

    function scrollToWidget() {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // ── Validation ─────────────────────────────────────
    function isStepAnswered(step) {
      var a = answers[step.id];
      if (!a) return false;
      switch (step.type) {
        case 'single_select': return !!a.optionId;
        case 'multi_select':  return a.selectedIds && a.selectedIds.length > 0;
        case 'number_input':  return a.value !== undefined;
        case 'range_slider':  return a.value !== undefined;
        case 'text_input':    return a.value && a.value.trim().length > 0;
        default: return false;
      }
    }

    // ── Pricing Engine ─────────────────────────────────
    // Pricing order: find per_unit base prices, multiply by multiplier step,
    // then add fixed amounts. Simple additive model.
    function calculateTotal() {
      var total = 0;
      var multiplierValue = getMultiplierValue();

      C.steps.forEach(function (step) {
        var a = answers[step.id];
        if (!a) return;

        if (step.type === 'single_select' && a.option && a.option.pricing) {
          total += resolvePricing(a.option.pricing, multiplierValue);
        }
        if (step.type === 'multi_select' && a.options) {
          a.options.forEach(function (opt) {
            if (opt.pricing) total += resolvePricing(opt.pricing, multiplierValue);
          });
        }
        // number_input and range_slider can have step-level pricing
        if ((step.type === 'number_input' || step.type === 'range_slider') && step.pricing) {
          if (step.pricing.type === 'fixed') {
            total += step.pricing.amount || 0;
          }
          // multiplier type means this step IS the multiplier — don't add it
        }
      });

      return Math.round(total);
    }

    function getMultiplierValue() {
      var val = 1;
      C.steps.forEach(function (step) {
        if (step.pricing && step.pricing.type === 'multiplier') {
          var a = answers[step.id];
          if (a && a.value !== undefined) val = a.value;
        }
      });
      return val;
    }

    function resolvePricing(pricing, multiplierValue) {
      if (!pricing) return 0;
      switch (pricing.type) {
        case 'fixed':    return pricing.amount || 0;
        case 'per_unit': return (pricing.amount || 0) * multiplierValue;
        default:         return 0;
      }
    }

    function getBreakdown() {
      var items = [];
      var multiplierValue = getMultiplierValue();
      var multiplierUnit = '';

      // Find multiplier step label
      C.steps.forEach(function (step) {
        if (step.pricing && step.pricing.type === 'multiplier') {
          multiplierUnit = step.unit || '';
        }
      });

      C.steps.forEach(function (step) {
        var a = answers[step.id];
        if (!a) return;

        if (step.type === 'single_select' && a.option && a.option.pricing) {
          var p = a.option.pricing;
          var amt = resolvePricing(p, multiplierValue);
          if (amt > 0) {
            var lbl = a.label;
            if (p.type === 'per_unit') {
              lbl += ' (' + formatNum(p.amount) + '/' + (p.unit || 'unit') + ' × ' + multiplierValue + ')';
            }
            items.push({ label: lbl, amount: amt });
          }
        }

        if (step.type === 'multi_select' && a.options) {
          a.options.forEach(function (opt) {
            if (opt.pricing) {
              var amt = resolvePricing(opt.pricing, multiplierValue);
              if (amt > 0) items.push({ label: opt.label, amount: amt });
            }
          });
        }
      });

      return items;
    }

    // ── Display Helpers ────────────────────────────────
    function getAnswerDisplay(step, a) {
      switch (step.type) {
        case 'single_select': return a.label;
        case 'multi_select':  return a.labels ? a.labels.join(', ') : '';
        case 'number_input':  return a.label;
        case 'range_slider':  return a.label;
        case 'text_input':    return a.value;
        default: return '';
      }
    }

    function formatPricingLabel(p) {
      var sym = (C.settings && C.settings.currencySymbol) || '$';
      if (p.type === 'fixed') {
        if (p.amount === 0) return '';
        return '+' + sym + formatNum(p.amount);
      }
      if (p.type === 'per_unit') {
        return sym + formatNum(p.amount) + '/' + (p.unit || 'unit');
      }
      return '';
    }

    // ── Copy Summary to Clipboard ──────────────────────
    function copySummary(btn) {
      var sym = (C.settings && C.settings.currencySymbol) || '$';
      var text = '';
      text += (C.summary.title || 'Quote Request Summary') + '\n';
      text += '━'.repeat(40) + '\n\n';

      C.steps.forEach(function (step) {
        var a = answers[step.id];
        if (!a) return;
        var display = getAnswerDisplay(step, a);
        if (!display) return;
        text += step.title + ': ' + display + '\n';
      });

      if (C.settings.showPricing) {
        text += '\n' + '━'.repeat(40) + '\n';
        text += 'Estimated Total: ' + sym + formatNum(calculateTotal()) + '\n';
        if (C.settings.pricingDisclaimer) {
          text += C.settings.pricingDisclaimer + '\n';
        }
      }

      text += '\n' + '━'.repeat(40) + '\n';
      text += 'Customer Details\n';
      C.contact.fields.forEach(function (f) {
        if (contactData[f.id]) text += f.label + ': ' + contactData[f.id] + '\n';
      });

      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = C.summary.ctaText || 'Copy Quote Summary';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        // Fallback
        var ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
      });
    }

    // ── Utilities ──────────────────────────────────────
    function esc(str) {
      if (!str) return '';
      var div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function formatNum(n) {
      return n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
  }

})();
