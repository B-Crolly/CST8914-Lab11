# README.md

## Accessible Accordion Component



---

### 1. What is the keyboard interaction missing?

**Missing Keyboard Interaction for Enter and Spacebar Keys**

- **Issue**: The accordion trigger buttons do not respond to the **Enter** and **Spacebar** keys when focused. According to accessibility standards, users should be able to activate buttons using these keys.

- **Solution**: Add event handling for the **Enter** and **Spacebar** keys in the `keydown` event listener. Pressing these keys will toggle the associated accordion panel.

**Implementation Details**:

In the JavaScript file (`accordion.js`), update the `keydown` event listener:

```javascript
// Keydown event listener to manage keyboard interactions
trigger.addEventListener('keydown', (event) => {
  const key = event.key;
  let newTrigger;

  switch (key) {
    case 'ArrowDown':
    case 'Down':
      event.preventDefault();
      newTrigger = getNextTrigger(trigger);
      newTrigger.focus();
      break;

    case 'ArrowUp':
    case 'Up':
      event.preventDefault();
      newTrigger = getPreviousTrigger(trigger);
      newTrigger.focus();
      break;

    case 'Home':
      event.preventDefault();
      accordionTriggers[0].focus();
      break;

    case 'End':
      event.preventDefault();
      accordionTriggers[accordionTriggers.length - 1].focus();
      break;

    case 'Enter':
    case ' ':
      event.preventDefault();
      // Simulate a click on the button to toggle the panel
      trigger.click();
      break;

    default:
      break;
  }
});
```

---

#### 2. What is the ARIA missing?

**a. Incorrect Use of the `hidden` Attribute**

- **Issue**: Using the `hidden` attribute can prevent some screen readers from detecting content changes when panels are expanded or collapsed.

- **Solution**: Replace the `hidden` attribute with `aria-hidden="true"` when panels are collapsed and `aria-hidden="false"` when expanded. This ensures that screen readers are aware of content visibility changes.

**b. Missing Handling of `aria-expanded` Attribute**

- **Issue**: The `aria-expanded` attribute on trigger buttons may not accurately reflect the current state of the accordion panels.

- **Solution**: Ensure that the `aria-expanded` attribute is updated to `true` when the panel is expanded and `false` when collapsed.

**Implementation Details**:

Update the HTML file (`index.html`):

```html
<!-- Accordion Trigger -->
<h3>
  <button id="accordion1id" class="accordion-trigger" aria-expanded="false" aria-controls="panel1id">
    Accordion Header 1
  </button>
</h3>

<!-- Accordion Panel -->
<div id="panel1id" class="accordion-content" role="region" aria-labelledby="accordion1id" aria-hidden="true">
  <!-- Panel content -->
</div>
```

Update the JavaScript file (`accordion.js`):

```javascript
// Click event listener to toggle the associated accordion panel
trigger.addEventListener('click', (event) => {
  // Get the current value of 'aria-expanded' attribute
  const expanded = trigger.getAttribute('aria-expanded') === 'true';

  // Toggle the 'aria-expanded' attribute value
  trigger.setAttribute('aria-expanded', !expanded);

  // Get the ID of the associated accordion panel from 'aria-controls' attribute
  const panelId = trigger.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);

  // Toggle the 'aria-hidden' attribute on the panel
  if (expanded) {
    panel.setAttribute('aria-hidden', 'true');
  } else {
    panel.setAttribute('aria-hidden', 'false');
  }
});
```

Update the CSS file (`accordion.css`):

```css
/* Show panel when aria-hidden is false */
.accordion-content[aria-hidden="false"] {
  display: block;
}

/* Hide panel when aria-hidden is true */
.accordion-content[aria-hidden="true"] {
  display: none;
}
```

---

### Summary of Changes

- **Keyboard Interaction**: Added support for **Enter** and **Spacebar** keys to toggle accordion panels.

- **ARIA Enhancements**:
  - Replaced the `hidden` attribute with `aria-hidden` on panels.
  - Ensured `aria-expanded` is correctly updated on triggers.

